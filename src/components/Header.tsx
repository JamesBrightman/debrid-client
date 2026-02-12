"use client";

import { useDebridUser } from "@/hooks/useDebridUser";

type UserSummary = {
  username?: string;
  points?: number | string;
};

export const Header: React.FC = () => {
  const { data } = useDebridUser();
  const user = data as UserSummary | undefined;
  const hasUser =
    typeof user?.username === "string" && user.username.length > 0;

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Debrid Client
          </h1>
          <p className="text-sm text-[color:var(--muted)]">
            Store your token locally and fetch data from the Real-Debrid API.
          </p>
        </div>
        {hasUser ? (
          <div className="rounded-xl border border-[color:var(--border)] bg-white px-3 py-2 text-right text-sm">
            <p className="font-medium text-[color:var(--foreground)]">{user.username}</p>
            <p className="mt-1 text-[color:var(--muted)]">
              Points: <span className="pill-coral rounded-full px-2 py-0.5">{user.points ?? "-"}</span>
            </p>
          </div>
        ) : null}
      </div>
    </header>
  );
};
