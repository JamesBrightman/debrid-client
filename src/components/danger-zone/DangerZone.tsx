import { DebridDisableAccessToken } from "@/components/debrid-response/DebridDisableAccessToken";
import { DebridResetAvatar } from "@/components/debrid-response/DebridResetAvatar";

export const DangerZone: React.FC = () => {
  return (
    <section className="flex flex-col gap-2 rounded-2xl border-2 border-coral-700/45 bg-gradient-to-br from-coral-100 via-coral-200/80 to-coral-300/75 p-5 shadow-lg shadow-coral-700/20 ring-1 ring-coral-500/35">
      <h2 className="text-xl font-semibold text-coral-900">Danger Zone</h2>
      <div className="mt-4">
        <DebridDisableAccessToken />
      </div>
      <div className="mt-4">
        <DebridResetAvatar />
      </div>
    </section>
  );
};
