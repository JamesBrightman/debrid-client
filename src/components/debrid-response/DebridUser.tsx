"use client";

import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import { useDebridUser } from "@/hooks/useDebridUser";

export const DebridUser: React.FC = () => {
  const { hasKey } = useDebridApiKey();
  const { data, isLoading, error } = useDebridUser();

  if (!hasKey) {
    return (
      <section className="w-full rounded-xl border border-dashed border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          User
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Add a token to load user info.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
        <h2 className="text-base font-semibold text-slate-900">
          User
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Loading user...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full rounded-xl border border-coral-200 bg-coral-50 p-4 shadow-card-coral">
        <h2 className="text-base font-semibold text-coral-800">User</h2>
        <p className="mt-2 text-sm text-coral-800">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 shadow-card">
      <h2 className="text-base font-semibold text-slate-900">
        User
      </h2>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-3 text-xs text-zinc-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
};



