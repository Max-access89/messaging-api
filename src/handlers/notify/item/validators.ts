import { sub } from "date-fns";
import { z } from "zod";

export const CreateNotificationItemSchema = z.object({
  message: z.string().min(1),
  recipients: z.array(z.string()),
  type: z.enum(['sms', 'email']),
  subject: z.string().optional(),
});


