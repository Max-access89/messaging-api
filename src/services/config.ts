import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { variables } from '../utils/env';


config();

// prisma
export const prisma = new PrismaClient();



// twilio
export const service_sid = variables.TWILIO_SERVICE_SID;
const account_sid = variables.TWILIO_ACCOUNT_SID;
const auth_token = variables.TWILIO_AUTH_TOKEN;
export const sendGridAPIkey = variables.SENDGRID_API_KEY;

export const senderEmail = variables.SENDER_EMAIL;

// TWILIO
export const twilioClient = twilio(account_sid, auth_token);
sgMail.setApiKey(sendGridAPIkey);