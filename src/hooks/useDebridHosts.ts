"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getHosts } from "@/service/debrid/debridClient";
import type { HostsResponse } from "@/types/response/hostsResponse";

export const useDebridHosts = (): UseQueryResult<HostsResponse, Error> => {
  return useQuery({
    queryKey: ["debrid", "hosts"],
    queryFn: getHosts,
  });
};
