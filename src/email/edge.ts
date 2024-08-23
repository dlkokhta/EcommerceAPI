import gmailTransport from "./index.js";
import dotenv from "dotenv";
import { verifyHtml } from "./templates/verify.js";
import { recoveryHtml } from "./templates/recovery.js";
import { OTPHtml } from "./templates/OTP.js";
import { purchaseConfirmationHtml } from "./templates/purchased.js";

dotenv.config();

const send = (to: any, subject: any, html: any) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };
  return gmailTransport.sendMail(options);
};

export const sensitiveHeaders = async (
  to: string,
  name: string,
  password: string
) => {
  const html = verifyHtml(name, password);
  return send(to, "Verify", html);
};

export const recoveryHeader = async (to: any, email: any, link: any) => {
  const html = recoveryHtml(email, link);
  return send(to, "Recovery", html);
};

export const otpHeader = async (to: any, email: any, link: any) => {
  const html = OTPHtml(email, link);
  return send(to, "OTP", html);
};

export const purchaseConfirmationHeader = async (to: any, link: any) => {
  const html = purchaseConfirmationHtml(link);
  return send(to, "Purchase", html);
};
