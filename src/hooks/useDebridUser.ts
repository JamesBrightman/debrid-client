"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/service/debrid/debridClient";

export const useDebridUser = () => {
  return useQuery({
    queryKey: ["debrid-user"],
    queryFn: getUser,
    retry: 1
  });
};