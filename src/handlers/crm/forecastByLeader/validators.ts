import { z } from "zod";

export const createForecastByLeaderSchema = z.object({
  name: z.string().min(1),
  plan: z.number().positive(),
  forecast: z.number().positive(),
});
