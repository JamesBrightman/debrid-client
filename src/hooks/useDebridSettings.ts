"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSettings } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { SettingsResponse } from "@/types/response/settingsResponse";

export const useDebridSettings = (): UseQueryResult<SettingsResponse, Error> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "settings"],
    enabled: hasKey,
    queryFn: () => getSettings(apiKey),
  });
};
