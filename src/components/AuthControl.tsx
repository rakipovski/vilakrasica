import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVillaAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export function AuthControl() {
  const { user, loading } = useVillaAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setBusy(true); setError("");
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) { setError(signOutError.message); setBusy(false); return; }
    await navigate({ to: "/auth", replace: true });
    setBusy(false);
  }
  return <span className="inline-flex flex-wrap items-center gap-2">
    {user ? <Button variant="link" className="h-9 px-0 text-inherit" onClick={signOut} disabled={busy} title={user.email}><LogOut />{busy ? "Signing out…" : "Sign out"}</Button>
      : <Button asChild variant="link" className="h-9 px-0 text-inherit" disabled={loading}><Link to="/auth"><UserRound />Sign in</Link></Button>}
    {error && <span role="alert" className="text-xs">{error}</span>}
  </span>;
}