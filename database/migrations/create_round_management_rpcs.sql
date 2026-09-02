-- Create RPC functions for authoritative round management
-- These functions ensure idempotent, time-gated round transitions

-- Calculate round duration from conversation stages
-- 3 conversation stages × 6 minutes + 1 reflection × 2 minutes = 20 minutes
CREATE OR REPLACE FUNCTION get_round_duration()
RETURNS interval
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT interval '20 minutes';
$$;

-- Start a round (idempotent)
CREATE OR REPLACE FUNCTION public.start_event_round(
  p_event_id uuid,
  p_round_number integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_participant boolean;
  v_round_duration interval;
  v_event record;
BEGIN
  -- Authorization: Verify caller is participant
  SELECT EXISTS (
    SELECT 1 
    FROM event_participants 
    WHERE event_id = p_event_id 
      AND participant_id = auth.uid()
  ) INTO v_is_participant;

  IF NOT v_is_participant THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  v_round_duration := get_round_duration();

  -- Idempotent: only start if not already started with this round
  UPDATE events
  SET 
    current_round = p_round_number,
    round_started_at = now(),
    round_ends_at = now() + v_round_duration,
    stage = 'activity'
  WHERE id = p_event_id
    AND (current_round IS NULL OR current_round = p_round_number)
  RETURNING 
    current_round,
    round_started_at,
    round_ends_at
  INTO v_event;

  IF NOT FOUND THEN
    -- Already started with different round, return current state
    SELECT 
      current_round,
      round_started_at,
      round_ends_at
    INTO v_event
    FROM events
    WHERE id = p_event_id;
  END IF;

  RETURN json_build_object(
    'round_started_at', v_event.round_started_at,
    'round_ends_at', v_event.round_ends_at
  );
END;
$$;

-- Advance to next round (idempotent, time-gated)
CREATE OR REPLACE FUNCTION public.advance_event_round(
  p_event_id uuid,
  p_expected_current_round integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_participant boolean;
  v_round_duration interval;
  v_updated_event record;
BEGIN
  -- Authorization: Verify caller is participant
  SELECT EXISTS (
    SELECT 1 
    FROM event_participants 
    WHERE event_id = p_event_id 
      AND participant_id = auth.uid()
  ) INTO v_is_participant;

  IF NOT v_is_participant THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  v_round_duration := get_round_duration();

  -- Idempotent update: only advances if round matches AND time elapsed
  UPDATE events
  SET 
    current_round = p_expected_current_round + 1,
    round_started_at = now(),
    round_ends_at = now() + v_round_duration
  WHERE id = p_event_id
    AND current_round = p_expected_current_round
    AND (round_ends_at IS NULL OR round_ends_at <= now())
  RETURNING 
    current_round,
    round_started_at,
    round_ends_at
  INTO v_updated_event;

  -- Return current state (whether updated or not)
  IF NOT FOUND THEN
    SELECT 
      current_round,
      round_started_at,
      round_ends_at
    INTO v_updated_event
    FROM events
    WHERE id = p_event_id;
  END IF;

  RETURN json_build_object(
    'success', true,
    'current_round', v_updated_event.current_round,
    'round_started_at', v_updated_event.round_started_at,
    'round_ends_at', v_updated_event.round_ends_at
  );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_round_duration() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.start_event_round(uuid, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.advance_event_round(uuid, integer) TO anon, authenticated;

-- Add comments
COMMENT ON FUNCTION public.start_event_round IS 'Idempotent round start. Sets authoritative timestamps and transitions event to activity stage.';
COMMENT ON FUNCTION public.advance_event_round IS 'Idempotent, time-gated round advancement. Only participants can advance. Prevents duplicate transitions.';
