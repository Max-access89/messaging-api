export interface OpportunityItem {
  opportunity_amount: number;
  // Add other fields as needed
}

export interface PlanItem {
  plan_value: number;
  plan_currency: string;
  tenure: "Quarterly" | "Annual" | "Biannual";
}

export interface ForecastItem {
  forecast_value: number;
  forecast_currency: string;
  tenure: "Quarterly" | "Annual" | "Biannual";
}

// enum Tenure {
//   Quarterly,
//   Annual,
//   Biannual,
// }
