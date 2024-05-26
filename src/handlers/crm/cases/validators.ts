import { z } from "zod";

export const HandleCreateIssueSchema = z.object({
  doctype: z.literal("Issue").default("Issue"),
  status: z.enum(["Issue", "Open", "Replied", "On Hold", "Resolved", "Closed"]),
  issue_type: z.enum(["Sales", "Maintenance", "Support"]).optional(),
  description: z.string().min(1),
  subject: z.string().min(1),
  raised_by: z.string().min(1),
});

export const HandleListIssueSchema = z.object({
  doctype: z.literal("Issue").default("Issue"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("0"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
  group_by: z.string().optional(),
});

export const HandleGetIssueSchema = z.object({
  doctype: z.literal("Issue").default("Issue"),
  name: z.string().min(1),
});

export const HandleUpdateIssueSchema = HandleCreateIssueSchema.partial().extend(
  {
    name: z.string().min(1),
  }
);

export const HandleDeleteIssueSchema = z.object({
  name: z.string().min(1),
});
