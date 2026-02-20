"use server";

import { KeyInput } from "./KeyInput";
import { DebridServerTime } from "./debrid-response/DebridServerTime";

export const Header: React.FC = async () => {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-6 px-4 py-3 sm:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Debrid Client UI
          </h1>
          <p className="text-sm text-[color:var(--muted)]">
            Interact with the Real-Debrid API.
          </p>
          <DebridServerTime />
        </div>
        <div className="w-full max-w-md">
          <KeyInput />
        </div>
      </div>
    </header>
  );
};


