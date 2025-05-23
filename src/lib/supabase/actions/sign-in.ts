"use server";

import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/utils/encodeRedirect";
import { redirect } from "next/navigation";

export default async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/organiser");
};