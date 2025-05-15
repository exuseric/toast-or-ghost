"use server"

import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/utils/encodeRedirect";

export default async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/organiser/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/organiser/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/organiser/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/organiser/reset-password", "Password updated");
};
