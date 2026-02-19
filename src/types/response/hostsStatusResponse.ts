import { z } from "zod";

const statusKnownSchema = z.enum(["up", "down", "unsupported"]);
const supportedSchema = z
  .coerce.number()
  .int()
  .catch(0)
  .transform((value) => (value === 1 ? 1 : 0));

const competitorStatusSchema = z.object({
  status: z.union([statusKnownSchema, z.string()]),
  check_time: z.string(),
});

export const hostStatusItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  supported: supportedSchema,
  status: z.union([statusKnownSchema, z.string()]),
  check_time: z.string(),
  competitors_status: z.record(z.string(), competitorStatusSchema).catch({}),
});

export const hostsStatusResponseSchema = z.record(
  z.string(),
  hostStatusItemSchema,
);

export type HostStatusItem = z.infer<typeof hostStatusItemSchema>;
export type HostsStatusResponse = z.infer<typeof hostsStatusResponseSchema>;
