import { z } from "zod";

export const SetPlanSchema = z.object({
  plan: z.number().positive(),
});

export const GetPlanSchema = z.object({
  // No parameters needed for retrieving the plan value
});
