import { z } from "zod";

export const HandleCreateSalesPersonSchema = z.object({
  doctype: z.literal("Sales Person").default("Sales Person"),
  sales_person_name: z.string().min(1),
  parent_sales_person: z.string().optional(),
  commission_rate: z.number().positive().optional(),
  is_group: z.boolean().optional(),
  enabled: z.boolean().optional(),
  employee: z.string().optional(),
  department: z.string().optional(),
  targets: z.array(z.string()),
  owner: z.string().min(1),
});

export const HandleListSalesPersonSchema = z.object({
  doctype: z.literal("Sales Person").default("Sales Person"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("0"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetSalesPersonSchema = z.object({
  doctype: z.literal("Sales Person").default("Sales Person"),
  name: z.string().min(1),
});

export const HandleUpdateSalesPersonSchema =
  HandleCreateSalesPersonSchema.extend({
    id: z.string().min(1),
  });

export const HandleDeleteSalesPersonSchema = z.object({
  id: z.string().min(1),
});
