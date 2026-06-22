import { createClient } from "@/lib/supabase/client";

export async function checkEmailExists(email: string) {
  const supabase = createClient();
  return supabase.rpc("email_exists", { p_email: email });
}

export async function sendSignupOtp(email: string, name: string) {
  const supabase = createClient();
  return supabase.rpc("send_signup_otp", { user_email: email, user_name: name });
}
