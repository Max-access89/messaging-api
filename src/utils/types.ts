import { number, string } from "zod";

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
  tenure: "Quarterly" | "Annual" | "Biannual";
  forecast_from: "Opportunity";
}

export interface ForecastByLeaderItem {
  sales_person: string;
  assigned_plan: number;
  // assigned_opportunity: string;
  // forecast_amount?: number;
}

// enum Tenure {
//   Quarterly,
//   Annual,
//   Biannual,
// }

export interface walletType {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  wallet_value?: number;
  wallet_currency?: string;
  last_transaction_amount?: number;
}
