import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { CreateNotificationItemSchema } from "./validators";
import {  twilioClient } from "../../../services/config";
import sgMail from '@sendgrid/mail';
import { variables } from "../../../utils/env";


export async function HandleCreateNotificationItem(
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> {
    try {
      const { message, recipients, type, subject } = CreateNotificationItemSchema.parse(await request.json());
  
      const sendResults = [];
  
      if (type === 'sms') {
        for (const recipient of recipients) {
          const result = await twilioClient.messages.create({
            body: message,
            from: variables.TWILIO_PHONE_NUMBER, 
            to: recipient,
          });
          sendResults.push({
            recipient,
            type,
            result,
          });
        }
      } else if (type === 'email') {
        for (const recipient of recipients) {
          const msg = {
            to: recipient,
            from: variables.SENDER_EMAIL, 
            subject: subject,
            text: message,
          };
          const [result] = await sgMail.send(msg);
          sendResults.push({
            recipient,
            type,
            result,
          });
        }
      }
  
      // Return a successful response with the results
      return {
        status: 200,
        jsonBody: {
          responseInfo: responseInfo["success"],
          data: sendResults,
        },
      };
    } catch (error) {
      return errorHandler(error);
    }
  }