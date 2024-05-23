import { z } from "zod";

export const HandleCreateItemSchema = z.object({
  doctype: z.literal("Item").default("Item"),
  item_name: z.string().min(1),
  base_rate: z.string().min(1),
  qty: z.string().min(1),
  base_amount: z.string().min(1),
});

export const HandleListItemSchema = z.object({
  doctype: z.literal("Item").default("Item"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("0"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
});

export const HandleUpdateItemSchema = HandleCreateItemSchema.partial().extend({
  doctype: z.literal("Item").default("Item"),
  name: z.string(),
});

export const HandleDeleteItemSchema = z.object({
  id: z.string(),
});

export const HandleGetItemSchema = z.object({
  id: z.string(),
});
