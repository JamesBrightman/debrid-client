import { KeyInput } from "./KeyInput";
import { DebridServerTime } from "./debrid-response/DebridServerTime";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-sky-300 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-6 px-4 py-3 sm:px-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Debrid Client UI
          </h1>
          <p className="text-sm text-slate-600">
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
