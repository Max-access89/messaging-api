import { config } from "dotenv";

config();

export const variables = {

  // AUTH0
  AUTH0_DOMAIN: String(process.env.AUTH0_DOMAIN),
  AUTH0_SPA_CLIENT_ID: String(process.env.AUTH0_SPA_CLIENT_ID),
  AUTH0_SPA_CLIENT_SECRET: String(process.env.AUTH0_SPA_CLIENT_SECRET),
  AUTH0_SPA_AUDIENCE: String(process.env.AUTH0_SPA_AUDIENCE),
  AUTH0_API_CLIENT_ID: String(process.env.AUTH0_API_CLIENT_ID),
  AUTH0_API_ID: String(process.env.AUTH0_API_ID),
  AUTH0_API_CLIENT_SECRET: String(process.env.AUTH0_API_CLIENT_SECRET),
  AUTH0_API_AUDIENCE: String(process.env.AUTH0_API_AUDIENCE),
  AUTH0_CONNECTION: String(process.env.AUTH0_CONNECTION),
  AUTH0_CONNECTION_ID: String(process.env.AUTH0_CONNECTION_ID),

  THIRD_PARTY_SERVICES: String(process.env.THIRD_PARTY_SERVICES),
  ENVIRONMENT: String(process.env.ENVIRONMENT),


  //TWILIO
  TWILIO_PHONE_NUMBER: String(process.env.TWILIO_PHONE_NUMBER),
  TWILIO_SERVICE_SID: String(process.env.TWILIO_SERVICE_SID),
  TWILIO_ACCOUNT_SID: String(process.env.TWILIO_ACCOUNT_SID),
  TWILIO_AUTH_TOKEN: String(process.env.TWILIO_AUTH_TOKEN),
  SENDGRID_API_KEY: String(process.env.SENDGRID_API_KEY),
  SENDER_EMAIL: String(process.env.SENDER_EMAIL),
  
};
