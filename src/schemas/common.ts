import { z } from "zod";
export const nameSchema = z.object({
  name: z.string().trim().min(1, "This is required"),
});
export type NameForm = z.infer<typeof nameSchema>;
