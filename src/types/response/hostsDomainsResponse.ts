import { z } from "zod";

export const hostsDomainsResponseSchema = z.array(z.string());

export type HostsDomainsResponse = z.infer<typeof hostsDomainsResponseSchema>;
