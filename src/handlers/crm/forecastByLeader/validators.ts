import { z } from "zod";

export const createForecastByLeaderSchema = z.object({
  sales_person: z.string().min(1),
  assigned_plan: z.number().positive(),
  assigned_opportunity: z.string().min(1),
});
