import { signUpAction } from "@/lib/supabase/actions";
import { FormMessage, type Message } from "@/components/form/form-message";
import SubmitButton from "@/components/button/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="page-wrapper flex flex-col gap-4 items-start justify-center h-full min-h-screen">
        <FormMessage message={{ message: "You are already signed in" }} />
        <Button asChild>
          <Link href="/organiser">Go to your dashboard</Link>
        </Button>
      </div>
    )
  }
  if ("message" in searchParams) {
    return (
      <div className="page-wrapper flex flex-col gap-4 items-start justify-center h-full min-h-screen">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="page-wrapper flex justify-center items-center h-full min-h-screen">
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
