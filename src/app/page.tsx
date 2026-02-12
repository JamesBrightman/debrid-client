import { KeyInput } from "@/components/KeyInput";
import { DebridSettings } from "@/components/DebridSettings";
import { DebridUser } from "@/components/DebridUser";
import { UserSummary } from "@/components/UserSummary";

export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <main className="mx-auto w-full max-w-3xl space-y-6">
        <section className="card-shell p-6 sm:p-8">
          <KeyInput />
        </section>

        <UserSummary />

        <section className="card-shell space-y-6 p-6 sm:p-8">
          <DebridUser />
          <DebridSettings />
        </section>
      </main>
    </div>
  );
}
