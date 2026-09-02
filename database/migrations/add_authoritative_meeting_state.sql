-- Add authoritative meeting round state to events table
-- This enables server-authoritative timer and disconnect recovery

alter table public.events
  add column if not exists current_round integer,
  add column if not exists round_started_at timestamptz,
  add column if not exists round_ends_at timestamptz;

-- Set default for existing events
update public.events
set current_round = 1
where current_round is null;

comment on column public.events.current_round is 'Current partner rotation/round number (1-based)';
comment on column public.events.round_started_at is 'Absolute timestamp when current round began';
comment on column public.events.round_ends_at is 'Absolute timestamp when current round ends - authoritative clock source';
