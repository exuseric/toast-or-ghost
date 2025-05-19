import { signInAction } from "@/lib/supabase/actions";
import { FormMessage, type Message } from "@/components/form/form-message";
import SubmitButton from "@/components/button/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="page-wrapper flex flex-col gap-4 items-start justify-center h-full min-h-screen">
        <FormMessage message={{message: "You are already signed in"}} />
        <Button asChild>
          <Link href="/organiser">Go to your dashboard</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="page-wrapper flex flex-col items-center justify-center h-full min-h-screen">
      <form className="flex flex-col w-max h-max">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
