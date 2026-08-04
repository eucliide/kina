import { supabase } from "@/lib/supabase";

export async function ensureAnonymousUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return session.user;
  }

  const {
    data,
    error,
  } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }

  return data.user;
}
