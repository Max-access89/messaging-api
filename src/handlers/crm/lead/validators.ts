import { z } from "zod";

// export const HandleCreateLeadSchema = z.object({
//   doctype: z.literal("Lead").default("Lead"),
//   status: z.enum(["Lead", "Open", "Replied"]),
//   type: z.enum(["Client", "Consultant", "Channel Partner"]),
//   request_type: z.enum([
//     "Product Enquiry",
//     "Request for Information",
//     "Suggestions",
//     "Other",
//   ]),
//   no_of_employees: z.enum([
//     "1-10",
//     "11-50",
//     "51-200",
//     "201-500",
//     "501-1000",
//     "1000+",
//   ]),
//   country: z.string().min(1),
//   qualification_status: z.string().min(1),
//   job_title: z.string().min(1),
//   salutation: z.string().min(1),
//   gender: z.string().min(1),
//   first_name: z.string().min(1),
//   middle_name: z.string().min(1),
//   email_id: z.string().min(1),
//   mobile_no: z.string().min(1),
//   company_name: z.string().min(1),
//   lead_name: z.string().min(1),
//   annual_revenue: z.number(),
//   territory: z.string().min(1),
//   industry: z.string().min(1),
//   city: z.string().min(1),
//   state: z.string().min(1),
// });

export const HandleCreateLeadSchema = z.object({
  doctype: z.literal("Lead").default("Lead"),
  job_title: z.string().optional(),
  salutation: z.enum(["Dr", "Madam", "Mr", "Mrs.", "Ms", "Prof"]).optional(),
  gender: z.string().min(1),
  first_name: z.string().min(1),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  type: z.enum(["Client", "Consultant", "Channel Partner"]).optional(),
  request_type: z
    .enum([
      "Product Enquiry",
      "Request for Information",
      "Suggestions",
      "Other",
    ])
    .optional(),
  email_id: z.string().optional(),
  mobile_no: z.string().optional(),
  organization_name: z.string().optional(),
  annual_revenue: z.number().optional(),
  territory: z
    .enum(["All Territories", "Ghana", "Rest of the world"])
    .optional(),
  no_of_employees: z
    .enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .optional(),
  industry: z.string().optional(),
  market_segment: z
    .enum(["Lower Income", "Middle Income", "Upper Income"])
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const HandleListLeadSchema = z.object({
  doctype: z.literal("Lead").default("Lead"),
  fields: z.array(z.any()).default(["*"]),
  filters: z.string().optional(),
  order_by: z.string().optional(),
  start: z.string().optional().default("0"),
  page_length: z.string().optional().default("50"),
  view: z.enum(["List"]).default("List"),
});

export const HandleUpdateLeadSchema = HandleCreateLeadSchema.extend({
  doctype: z.literal("Lead").default("Lead"),
}).partial();

export const HandleDeleteLeadSchema = z.object({
  id: z.string(),
});

export const HandleGetLeadSchema = z.object({
  id: z.string(),
});
