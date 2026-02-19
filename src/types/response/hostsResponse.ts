import { z } from "zod";

export const hostItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export const hostsResponseSchema = z.record(z.string(), hostItemSchema);

export type HostItem = z.infer<typeof hostItemSchema>;
export type HostsResponse = z.infer<typeof hostsResponseSchema>;
