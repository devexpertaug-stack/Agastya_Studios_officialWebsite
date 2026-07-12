import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SITE } from "@/constants/testIds/site";
import { AgastyaLogo } from "@/components/site/Nav";
import { formatApiErrorDetail } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Welcome back.");
      nav("/admin");
    } catch (err) {
      toast.error(formatApiErrorDetail(err?.response?.data?.detail) || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06110b] text-[var(--bone-100)] flex items-center justify-center px-5 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[var(--moss-400)]/8 blur-[160px]" />
      </div>

      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[var(--bone-100)]/70 hover:text-[var(--dawn-500)] transition-colors">
        <ArrowLeft size={16} /> Back to studio
      </Link>

      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <AgastyaLogo />
          <span className="text-2xl font-serif-italic">Agastya</span>
          <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--mist)] mt-1">Studios</span>
        </div>

        <form
          data-testid={SITE.loginForm}
          onSubmit={submit}
          className="rounded-2xl border border-[rgba(168,192,144,0.18)] bg-[rgba(255,255,255,0.02)] p-8 md:p-10 flex flex-col gap-5"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-2">Admin</p>
            <h1 className="text-4xl font-serif-italic tracking-[-0.02em]">Welcome back.</h1>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Email</span>
            <input
              data-testid={SITE.loginEmail}
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]">Password</span>
            <input
              data-testid={SITE.loginPassword}
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            data-testid={SITE.loginSubmit}
            type="submit"
            disabled={busy}
            className="btn-forest mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            Sign in
          </button>

          <p className="text-xs text-[var(--bone-100)]/50 mt-2 text-center">
            Studio staff only. Reach us at devexpertaug@gmail.com.
          </p>
        </form>
      </div>
    </div>
  );
}
