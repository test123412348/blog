import { REGEXP_ONLY_DIGITS } from "input-otp";
import { z } from "zod";

export const authSchema = z.object({
  pin: z
    .string()
    .regex(new RegExp(REGEXP_ONLY_DIGITS))
    .trim()
    .min(6, "Must enter the field")
    .max(6, "Must enter the field"),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
