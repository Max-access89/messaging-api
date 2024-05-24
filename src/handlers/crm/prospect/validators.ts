import { z } from "zod";
import { phoneNumberRegex } from "../../../utils/helpers";

export const HandleCreateProspectSchema = z.object({
  doctype: z.literal("Prospect").default("Prospect"),
  company_name: z.string(),
  owner: z.string().optional(),
  assigned_sales_person: z.string(),
  market_segment: z.enum(["Lower Income", "Middle Income", "Upper Income"]),
  no_of_employees: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ]),
  annual_revenue: z.number(),
  industry: z.string(),
  territory: z.enum(["All Territories", "Ghana", "Rest of the world"]),
  contact_person: z.string().min(1),
  contact_mobile: z
    .string()
    .regex(phoneNumberRegex, "Invalid phone number with country code")
    .min(1),
  contact_email: z.string().email().optional(),
  whatsapp: z
    .string()
    .regex(phoneNumberRegex, "Invalid phone number with country code")
    .optional(),
  website: z.string().optional(),
});

export const HandleListProspectSchema = z.object({
  doctype: z.literal("Prospect").default("Prospect"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("0"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetProspectSchema = z.object({
  doctype: z.literal("Prospect").default("Prospect"),
  id: z.string().min(1),
});

export const HandleUpdateProspectSchema =
  HandleCreateProspectSchema.partial().extend({
    name: z.string().min(1),
  });

export const HandleDeleteProspectSchema = z.object({
  doctype: z.literal("Prospect").default("Prospect"),
  id: z.string().min(1),
});
