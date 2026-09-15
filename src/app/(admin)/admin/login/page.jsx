"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/app/(admin)/admin/actions";
import { field, primaryBtn } from "@/components/admin/AdminChrome";

function LoginForm() {
  const [state, action, pending] = useActionState(signIn, { error: null });
  const next = useSearchParams().get("next") ?? "/admin";

  return (
    <form action={action} className="flex w-full max-w-[380px] flex-col gap-6 rounded-3xl border border-white/12 bg-white/[0.045] p-8 shadow-[0_30px_80px_rgba(3,8,20,0.55)]">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/80 to-indigo-400/70 text-[15px] font-semibold text-ground">
          IP
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-normal">Isha studio admin</h1>
          <p className="text-sm leading-relaxed text-ink/55">
            Enquiries, galleries, the journal and your prices.
          </p>
        </div>
      </div>

      <input type="hidden" name="next" value={next} />

      <label className="flex flex-col gap-1.5 text-[13px] text-ink/55">
        Password
        <input name="password" type="password" required autoFocus autoComplete="current-password" className={field} />
      </label>

      {state?.error ? (
        <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3.5 py-2.5 text-sm text-rose-200">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className={`${primaryBtn} w-full disabled:opacity-60`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-[13px] leading-relaxed text-ink/35">
        Demo password is <code className="rounded bg-black/30 px-1">demo</code> unless ADMIN_PASSWORD is set.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ground px-4 py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[rgba(92,132,255,0.35)] blur-[130px]" />
        <div className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[rgba(226,114,196,0.28)] blur-[130px]" />
      </div>
      <div className="relative">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
