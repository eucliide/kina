import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Tracks partner presence using Supabase Realtime Presence.
 * 
 * Returns whether the partner is currently online and connected
 * to the meeting.
 */
export function usePartnerPresence(
  eventId: string,
  partnerId: string,
  currentUserId: string
): { isPartnerOnline: boolean } {
  const [isPartnerOnline, setIsPartnerOnline] = useState(true);

  useEffect(() => {
    const channelName = `meeting-presence:${eventId}`;
    
    const channel = supabase.channel(channelName, {
      config: {
        presence: {
          key: currentUserId,
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const partnerPresent = Object.keys(state).some((key) => 
          key === partnerId || state[key]?.some((p: { user_id?: string }) => p.user_id === partnerId)
        );
        setIsPartnerOnline(partnerPresent);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        const partnerJoined = key === partnerId || 
          newPresences.some((p: { user_id?: string }) => p.user_id === partnerId);
        if (partnerJoined) {
          setIsPartnerOnline(true);
        }
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        const partnerLeft = key === partnerId ||
          leftPresences.some((p: { user_id?: string }) => p.user_id === partnerId);
        if (partnerLeft) {
          setIsPartnerOnline(false);
        }
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: currentUserId,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, partnerId, currentUserId]);

  return { isPartnerOnline };
}
