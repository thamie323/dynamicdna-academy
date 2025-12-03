import { TRPCError } from "@trpc/server";
import { ENV } from "./env";
import nodemailer from "nodemailer";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

// 🔁 Reusable SMTP transporter
const transporter = nodemailer.createTransport({
  host: ENV.smtpHost,
  port: Number(ENV.smtpPort) || 587,
  secure: Number(ENV.smtpPort) === 465, // TLS only for 465
  auth: {
    user: ENV.smtpUser,
    pass: ENV.smtpPass,
  },
});

// Optional: log SMTP status on boot
transporter
  .verify()
  .then(() => {
    console.log("[SMTP] Connection OK");
  })
  .catch((err) => {
    console.error("[SMTP] Connection failed:", err);
  });

// ✅ Owner notification (already used)
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  if (!ENV.ownerEmail) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Owner email is not configured.",
    });
  }

  try {
    const info = await transporter.sendMail({
      from: ENV.smtpFrom || ENV.smtpUser || ENV.ownerEmail,
      to: ENV.ownerEmail,
      subject: title,
      text: content,
      html: `<p>${content.replace(/\n/g, "<br/>")}</p>`,
    });

    console.log("[Notification] Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Notification] Failed to send email:", error);
    return false;
  }
}

// ✉️ NEW: helper for emailing applicants directly
export async function sendApplicantEmail(
  to: string,
  subject: string,
  content: string
): Promise<boolean> {
  if (!to) {
    console.warn("[Notification] sendApplicantEmail called without 'to' address");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: ENV.smtpFrom || ENV.smtpUser || ENV.ownerEmail || undefined,
      to,
      subject,
      text: content,
      html: `<p>${content.replace(/\n/g, "<br/>")}</p>`,
    });

    console.log("[Notification] Applicant email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Notification] Failed to send applicant email:", error);
    return false;
  }
}
