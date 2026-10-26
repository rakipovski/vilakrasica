import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVillaAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Reset password — Villa Krasica" }, { name: "description", content: "Set a new password for your Villa Krasica account." },
    { property: "og:title", content: "Reset password — Villa Krasica" }, { property: "og:description", content: "Set a new password for your Villa Krasica account." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ResetPasswordPage,
});
function ResetPasswordPage() {
  const { user, recovery } = useVillaAuth();
  const [hashRecovery, setHashRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => { setHashRecovery(new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery"); }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to reset your password."); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-linen px-6 py-8 font-body text-ink"><Link to="/" className="font-display text-3xl">Villa Krasica</Link><section className="mx-auto max-w-md pt-16"><h1 className="mb-8 font-display text-5xl">New password</h1>
    {done ? <div><p role="status">Your password has been updated.</p><Button asChild className="mt-6"><Link to="/">Back home</Link></Button></div>
      : user && (recovery || hashRecovery) ? <form className="space-y-5" onSubmit={submit}><div><label htmlFor="new-password" className="mb-2 block text-sm">New password</label><Input id="new-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} disabled={busy} /></div><div><label htmlFor="confirm-password" className="mb-2 block text-sm">Confirm password</label><Input id="confirm-password" type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={e => setConfirm(e.target.value)} disabled={busy} /></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={busy} type="submit" className="w-full">{busy ? "Updating…" : "Update password"}</Button></form>
      : <div><p>Open the password reset link from your email to continue.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/auth">Request a new link</Link></Button></div>}
  </section></main>;
}