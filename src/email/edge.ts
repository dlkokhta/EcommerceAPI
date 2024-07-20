import gmailTransport from "./index.js";
import dotenv from "dotenv";
import { verifyHtml } from "../email/templates/";
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

export const sensitiveHeaders = async (to: any, name: any, link: any) => {
  const html = verifyHtml(name, link);
  return send(to, "Verify", html);
};

export const recoveryHeader = async (to: any, name: any, link: any) => {
  const html = recoveryHtml(name, link);
  return send(to, "Verify", html);
};
