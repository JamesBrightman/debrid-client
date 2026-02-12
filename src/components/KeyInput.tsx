"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import eyeClosedIcon from "@/assets/icons/eye-closed.svg";
import eyeOpenIcon from "@/assets/icons/eye-open.svg";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";

export const KeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useDebridApiKey();
  const [localKeyVal, setLocalKeyVal] = useState(apiKey);
  const [isVisible, setIsVisible] = useState(false);
  const hasChanged = localKeyVal.trim() !== apiKey;

  useEffect(() => {
    setLocalKeyVal(apiKey);
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiKey(localKeyVal);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <label
        htmlFor="debrid-key"
        className="block text-sm font-semibold text-[color:var(--foreground)]"
      >
        Real-Debrid API token
      </label>
      <div className="flex gap-2">
        <input
          id="debrid-key"
          name="debrid_api_token"
          type={isVisible ? "text" : "password"}
          autoComplete={isVisible ? "off" : "new-password"}
          className="w-full rounded-xl border border-(--border) bg-(--surface-soft) px-3 py-2.5 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent-coral)] focus:ring-2 focus:ring-[color:var(--accent-coral)]/25"
          value={localKeyVal}
          onChange={(e) => setLocalKeyVal(e.target.value)}
          placeholder="Enter API token"
        />
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className="flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 transition hover:bg-[color:var(--accent-coral-soft)]"
          aria-label={isVisible ? "Hide API token" : "Show API token"}
        >
          <span className="relative block w-5 h-5">
            <Image
              src={eyeClosedIcon}
              alt="eye closed icon"
              width={20}
              height={20}
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                isVisible ? "scale-40 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <Image
              src={eyeOpenIcon}
              alt="eye open icon"
              width={20}
              height={20}
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-200 ${
                isVisible ? "scale-100 opacity-100" : "scale-40 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>
      <button
        type="submit"
        disabled={!hasChanged}
        className="cta-gradient rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save token
      </button>
    </form>
  );
};
