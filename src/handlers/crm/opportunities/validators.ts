import { z } from "zod";

export const HandleCreateOpportunitySchema = z.object({
  doctype: z.literal("Opportunity").default("Opportunity"),
  status: z.enum([
    "Opportunity",
    "Open",
    "Quotation",
    "Replied",
    "Converted",
    "Lost",
    "Closed",
  ]),
  opportunity_type: z.enum(["Sales", "Maintenance", "Support"]),
  opportunity_from: z.enum(["Customer", "Lead", "Prospect"]),
  party_name: z.string().min(1),
  // customer_name: z.string().min(1),
  sales_stage: z.enum([
    "Prospecting",
    "Qualifying",
    "Bid in Development",
    "Bid in Submission",
    "Close",
  ]),
  source: z.enum([
    "Advertisement",
    "Campaign",
    "Cold Calling",
    "Customer's Vendor",
    "Exhibition",
    "Existing Customer",
    "Mass Mailing",
    "Reference",
    "Supplier Reference",
    "Walk in",
  ]),
  expected_closing: z.string().min(1),
  probability: z.number(),
  // owner: z.string().min(1),
  no_of_employees: z
    .enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .optional(),
  country: z.string().min(1),
  annual_revenue: z.number().optional(),
  assigned_sales_person: z.string().min(1),
  industry: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  territory: z
    .enum(["All Territories", "Ghana", "Rest of the world"])
    .optional(),
  website: z.string().optional(),
  market_segment: z
    .enum(["Lower Income", "Middle Income", "Upper Income"])
    .optional(),
  currency: z.string().min(1),
  opportunity_amount: z.number(),
});

export const HandleListOpportunitySchema = z.object({
  doctype: z.literal("Opportunity").default("Opportunity"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("0"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetOpportunitySchema = z.object({
  doctype: z.literal("Opportunity").default("Opportunity"),
  id: z.string().min(1),
});

export const HandleUpdateOpportunitySchema =
  HandleCreateOpportunitySchema.partial()
    .nonstrict()
    .extend({
      name: z.string().min(1),
    });

// export const HandleUpdateOpportunitySchema = z.object({
//   name: z.string().min(1),
// });

export const HandleDeleteOpportunitySchema = z.object({
  id: z.string().min(1),
});
