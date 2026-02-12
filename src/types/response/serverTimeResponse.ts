import { z } from "zod";

// Format: Y-m-dTH:i:sO (example: 2026-02-12T14:30:05+0000)
const serverTimePattern =
  /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d[+-]\d{4}$/;

export const serverTimeResponseSchema = z
  .string()
  .regex(serverTimePattern, "Invalid server time format");

export type ServerTimeResponse = z.infer<typeof serverTimeResponseSchema>;
