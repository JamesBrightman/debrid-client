"use client";

import { useDebridUser } from "@/hooks/useDebridUser";
import { UserAccountStatus } from "@/components/UserAccountStatus";

type DebridUserSummary = {
  username?: string;
  email?: string;
  points?: number;
  type?: string;
  avatar?: string;
};

export const UserSummary: React.FC = () => {
  const { data } = useDebridUser();
  const user = data as DebridUserSummary | undefined;

  if (!user) {
    return null;
  }

  const username = user.username?.trim();
  const isPremium = user.type?.toLowerCase() === "premium";
  const hasAvatar = typeof user.avatar === "string" && user.avatar.length > 0;

  return (
    <section className="card-shell relative overflow-hidden p-6 sm:p-8">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[color:var(--accent-coral-soft)] blur-xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
            Welcome{username ? `, ${username}` : ""}
          </h2>
          <div className="space-y-1 text-sm text-[color:var(--muted)]">
            <p>Email: {user.email ?? "-"}</p>
            <p>Points: {user.points ?? "-"}</p>
          </div>
          <UserAccountStatus isPremium />
        </div>

        <div className="h-14 w-14 shrink-0 rounded-full border-2 border-white bg-[color:var(--surface-soft)] shadow-sm">
          {hasAvatar ? (
            <div
              className="h-full w-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${user.avatar})` }}
              role="img"
              aria-label={`${username ?? "User"} avatar`}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};
