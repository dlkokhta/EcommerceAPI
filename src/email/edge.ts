import gmailTransport from "./index.js";
import dotenv from "dotenv";
import { verifyHtml } from "./templates/verify.js";
import { recoveryHtml } from "./templates/recovery.js";

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
  link: string
) => {
  const html = verifyHtml(name, link);
  return send(to, "Verify", html);
};

export const recoveryHeader = async (to: any, email: any, link: any) => {
  const html = recoveryHtml(email, link);
  return send(to, "Verify", html);
};
