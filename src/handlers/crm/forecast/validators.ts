import { z } from "zod";

export const setForecastSchema = z.object({
  forecast_value: z.number().positive(),
  forecast_currency: z.string().min(1),
  tenure: z.enum(["Quarterly", "Annual", "Biannual"]),
});

export const GetForecastSchema = z.object({
  // No parameters needed for retrieving the plan value
});
