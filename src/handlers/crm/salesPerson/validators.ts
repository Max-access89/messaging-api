import { z } from "zod";

export const HandleCreateSalesPersonSchema = z.object({
  doctype: z.literal("Sales Person").default("Sales Person"),
  sales_person_name: z.string().min(1),
  parent_sales_person: z.string().optional(),
  commission_rate: z.number().positive().optional(),
  is_group: z.boolean().optional(),
  enabled: z.number().optional(),
  employee: z.string().optional(),
  department: z.string().optional(),
  targets: z.array(z.string()).optional(),
  owner: z.string().min(1).optional(),
});

// "User","role_profile_name","=","Sales Person"

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
  HandleCreateSalesPersonSchema.partial()
    .nonstrict()
    .extend({
      name: z.string().min(1),
      email: z.string().email().optional(),
    });

// export const HandleUpdateSalesPersonSchema =
//   HandleCreateSalesPersonSchema.partial().extend({
//     name: z.string().min(1),
//   });

export const HandleDeleteSalesPersonSchema = z.object({
  id: z.string().min(1),
});

// export interface HandleListSalesPersonSchema {
//   name:                                    string;
//   creation:                                Date;
//   modified:                                Date;
//   modified_by:                             string;
//   owner:                                   string;
//   docstatus:                               number;
//   idx:                                     number;
//   enabled:                                 number;
//   email:                                   string;
//   first_name:                              string;
//   middle_name:                             null;
//   last_name:                               null | string;
//   full_name:                               string;
//   username:                                string;
//   send_welcome_email:                      number;
//   unsubscribed:                            number;
//   user_image:                              null;
//   role_profile_name:                       null | string;
//   gender:                                  null | string;
//   birth_date:                              null;
//   interest:                                null;
//   banner_image:                            null;
//   phone:                                   null;
//   location:                                null;
//   bio:                                     null;
//   mute_sounds:                             number;
//   mobile_no:                               null;
//   new_password:                            string;
//   logout_all_sessions:                     number;
//   reset_password_key:                      null | string;
//   last_reset_password_key_generated_on:    Date | null;
//   last_password_reset_date:                null;
//   redirect_url:                            null;
//   document_follow_notify:                  number;
//   follow_created_documents:                number;
//   follow_commented_documents:              number;
//   follow_liked_documents:                  number;
//   follow_assigned_documents:               number;
//   follow_shared_documents:                 number;
//   email_signature:                         null;
//   thread_notify:                           number;
//   send_me_a_copy:                          number;
//   allowed_in_mentions:                     number;
//   module_profile:                          null | string;
//   home_settings:                           null;
//   simultaneous_sessions:                   number;
//   restrict_ip:                             null;
//   login_after:                             number;
//   last_active:                             Date | null;
//   login_before:                            number;
//   bypass_restrict_ip_check_if_2fa_enabled: number;
//   last_login:                              Date | null;
//   last_known_versions:                     null | string;
//   api_key:                                 null | string;
//   api_secret:                              null | string;
//   _user_tags:                              null;
//   _comments:                               null;
//   _assign:                                 null;
//   _liked_by:                               null;
//   onboarding_status:                       string;
// }
