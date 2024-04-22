import { z } from "zod";

export const HandleCreateCampaignSchema = z.object({
  doctype: z.literal("Campaign").default("Campaign"),
  campaign_name: z.string().min(1),
});

export const HandleListCampaignSchema = z.object({
  doctype: z.literal("Campaign").default("Campaign"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("2"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetCampaignSchema = z.object({
  doctype: z.literal("Campaign").default("Campaign"),
  id: z.string().min(1),
});

export const HandleUpdateCampaignSchema = HandleCreateCampaignSchema.extend({
  id: z.string().min(1),
});

export const HandleDeleteCampaignSchema = z.object({
  id: z.string().min(1),
});
