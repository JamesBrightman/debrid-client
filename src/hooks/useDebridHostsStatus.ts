"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getHostsStatus } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { HostsStatusResponse } from "@/types/response/hostsStatusResponse";

export const useDebridHostsStatus = (): UseQueryResult<
  HostsStatusResponse,
  Error
> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "hosts", "status"],
    enabled: hasKey,
    queryFn: () => getHostsStatus(apiKey),
  });
};
