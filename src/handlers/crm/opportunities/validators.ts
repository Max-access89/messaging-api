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
  customer_name: z.string().min(1),
  sales_stage: z.enum([
    "Identifying Decision Makers",
    "Needs Analysis",
    "Negotiation/Review",
    "Perception Analysis",
    "Proposal/Price Quote",
    "Prospecting",
    "Qualification",
    "Value Proposition",
  ]),
  source: z.enum([
    "Adverstisment",
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
  // expected_closing: z.date(),
  probability: z.number(),
  owner: z.string().min(1),
  no_of_employees: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ]),
  country: z.string().min(1),
  annual_revenue: z.number(),
  industry: z.string().min(1),
  city: z.string(),
  state: z.string(),
  territory: z.enum(["All Territories", "Ghana", "Rest of the world"]),
  website: z.string(),
  market_segment: z.enum(["Lower Income", "Middle Income", "Upper Income"]),
  currency: z.string().min(1),
  opportunity_amount: z.number(),
});

export const HandleListOpportunitySchema = z.object({
  doctype: z.literal("Opportunity").default("Opportunity"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("2"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetOpportunitySchema = z.object({
  doctype: z.literal("Opportunity").default("Opportunity"),
  id: z.string().min(1),
});

export const HandleUpdateOpportunitySchema =
  HandleCreateOpportunitySchema.extend({
    id: z.string().min(1),
  });

export const HandleDeleteOpportunitySchema = z.object({
  id: z.string().min(1),
});
