"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUser } from "@/service/debrid/debridClient";
import { useDebridApiKey } from "@/hooks/useDebridApiKey";
import type { UserResponse } from "@/types/response/userResponse";

export const useDebridUser = (): UseQueryResult<UserResponse, Error> => {
  const { apiKey, hasKey } = useDebridApiKey();

  return useQuery({
    queryKey: ["debrid", "user"],
    enabled: hasKey,
    queryFn: () => getUser(apiKey),
  });
};
