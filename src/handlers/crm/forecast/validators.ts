import { z } from "zod";

export const setForecastSchema = z.object({
  forecast_from: z.enum(["Opportunity"]),
  tenure: z.enum(["Quarterly", "Annual", "Biannual"]),
});

export const GetForecastSchema = z.object({
  // No parameters needed for retrieving the plan value
});
