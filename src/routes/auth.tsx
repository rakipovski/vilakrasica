import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVillaAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in & Sign up — Villa Krasica" },
    { name: "description", content: "Sign in or create your Villa Krasica account." },
    { property: "og:title", content: "Your account — Villa Krasica" },
    { property: "og:description", content: "Sign in or create your Villa Krasica account." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useVillaAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { if (!loading && user) void navigate({ to: "/", replace: true }); }, [loading, user, navigate]);
  function changeMode(next: typeof mode) { setMode(next); setError(""); setMessage(""); setPassword(""); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        if (!data.session) setMessage("Check your email to confirm your account before signing in.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage("If an account exists for this email, you will receive a password reset link.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        await navigate({ to: "/", replace: true });
      }
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to continue. Please try again."); }
    finally { setBusy(false); }
  }
  async function social(provider: "google" | "lovable") {
    setBusy(true); setError("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) throw result.error;
    } catch (error) { setError(error instanceof Error ? error.message : "Sign-in failed. Please try again."); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-linen font-body text-ink">
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12">
      <Link to="/" className="font-display text-3xl">Villa Krasica</Link>
      <Button asChild variant="link"><Link to="/"><ArrowLeft />Back home</Link></Button>
    </header>
    <section className="mx-auto w-full max-w-md px-6 pb-20 pt-12">
      <h1 className="mb-8 font-display text-5xl">{mode === "forgot" ? "Reset password" : mode === "signup" ? "Create account" : "Welcome back"}</h1>
      {mode !== "forgot" && <div className="mb-8 grid grid-cols-2 border-b border-border" role="tablist" aria-label="Account access">
        <Button role="tab" aria-selected={mode === "signin"} variant={mode === "signin" ? "secondary" : "ghost"} disabled={busy} onClick={() => changeMode("signin")}>Sign in</Button>
        <Button role="tab" aria-selected={mode === "signup"} variant={mode === "signup" ? "secondary" : "ghost"} disabled={busy} onClick={() => changeMode("signup")}>Sign up</Button>
      </div>}
      <form onSubmit={submit} className="space-y-5">
        <div><label htmlFor="email" className="mb-2 block text-sm">Email</label><Input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} disabled={busy} className="h-11" /></div>
        {mode !== "forgot" && <div><label htmlFor="password" className="mb-2 block text-sm">Password</label><div className="relative"><Input id="password" type={visible ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={mode === "signup" ? 8 : undefined} value={password} onChange={e => setPassword(e.target.value)} disabled={busy} className="h-11 pr-12" /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" aria-label={visible ? "Hide password" : "Show password"} title={visible ? "Hide password" : "Show password"} onClick={() => setVisible(!visible)}>{visible ? <EyeOff /> : <Eye />}</Button></div>{mode === "signup" && <p className="mt-2 text-xs text-ink/70">At least 8 characters.</p>}</div>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        {message && <p role="status" className="text-sm text-ink">{message}</p>}
        <Button type="submit" disabled={busy || loading} className="h-11 w-full">{busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}</Button>
      </form>
      <Button variant="link" className="mt-3 px-0" disabled={busy} onClick={() => changeMode(mode === "forgot" ? "signin" : "forgot")}>{mode === "forgot" ? "Back to sign in" : "Forgot password?"}</Button>
      {mode !== "forgot" && <div className="mt-8 space-y-3 border-t border-border pt-6"><Button variant="outline" className="h-11 w-full" disabled={busy || loading} onClick={() => social("google")}>Continue with Google</Button><Button variant="outline" className="h-11 w-full" disabled={busy || loading} onClick={() => social("lovable")}>Continue with Lovable</Button></div>}
    </section>
  </main>;
}