"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signIn } from "@/app/(admin)/admin/actions";
import { field, primaryBtn } from "@/components/admin/AdminChrome";

function LoginForm() {
  const [state, action, pending] = useActionState(signIn, { error: null });
  const next = useSearchParams().get("next") ?? "/admin";

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-white/12 bg-white/[0.05] p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-normal">Isha admin</h1>
        <p className="text-sm text-ink/60">Sign in to manage enquiries, galleries and the journal.</p>
      </div>

      <input type="hidden" name="next" value={next} />

      <label className="flex flex-col gap-1.5 text-[13px] text-ink/60">
        Password
        <input name="password" type="password" required autoFocus className={field} />
      </label>

      {state?.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}

      <button type="submit" disabled={pending} className={`${primaryBtn} disabled:opacity-60`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-[13px] leading-relaxed text-ink/45">
        Demo password is <code className="rounded bg-black/30 px-1">demo</code> unless ADMIN_PASSWORD is set.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ground px-4 py-16">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
