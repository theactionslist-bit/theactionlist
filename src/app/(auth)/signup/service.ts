import { createClient } from "@/lib/supabase/client";

export async function checkEmailExists(email: string) {
  const supabase = createClient();
  return supabase.rpc("email_exists", { p_email: email });
}

export async function sendSignupOtp(email: string) {
  const supabase = createClient();
  return supabase.rpc("send_signup_otp", { user_email: email });
}
