import { z } from "zod";

export const HandleCreateCustomerSchema = z.object({
  doctype: z.literal("Customer").default("Customer"),
  customer_type: z.enum(["Company", "Individual"]),
  customer_group: z.enum([
    "Commercial",
    "Government",
    "Individual",
    "Non-Profit",
  ]),
  customer_name: z.string().min(1),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  mobile_number: z.string().optional(),
  email_id: z.string().optional(),
  territory: z
    .enum(["All Territories", "Ghana", "Rest of the world"])
    .optional(),
});

export const HandleListCustomerSchema = z.object({
  doctype: z.literal("Customer").default("Customer"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("2"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetCustomerSchema = z.object({
  doctype: z.literal("Customer").default("Customer"),
  id: z.string().min(1),
});

export const HandleUpdateCustomerSchema = HandleCreateCustomerSchema.extend({
  id: z.string().min(1),
});

export const HandleDeleteCustomerSchema = z.object({
  id: z.string().min(1),
});
