import { z } from "zod";

export const SetPlanSchema = z.object({
  plan_value: z.number().positive(),
  plan_currency: z.string().min(1),
  tenure: z.enum(["Quarterly", "Annual", "Biannual"]),
});

export const GetPlanSchema = z.object({
  // No parameters needed for retrieving the plan value
});
