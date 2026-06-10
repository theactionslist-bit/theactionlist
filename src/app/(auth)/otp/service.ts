import { createClient } from "@/lib/supabase/client";

export async function verifySignupOtp(email: string, otp: string) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("verify_signup_otp", {
    user_email: email,
    user_otp: otp,
  });

  if (!error && data?.access_token && data?.refresh_token) {
    await supabase.auth.setSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
  }

  return { data, error };
}

export async function resendSignupOtp(email: string) {
  const supabase = createClient();
  return supabase.rpc("send_signup_otp", { user_email: email });
}
