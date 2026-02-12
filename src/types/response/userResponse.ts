import { z } from "zod";

export const userTypeSchema = z.enum(["premium", "free"]);
export const UserType = userTypeSchema.enum;

export const userResponseSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string(),
  points: z.number().int(),
  locale: z.string(),
  avatar: z.url(),
  type: userTypeSchema,
  premium: z.number().int(),
  expiration: z.iso.datetime({ offset: true }),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserTypeValue = z.infer<typeof userTypeSchema>;
