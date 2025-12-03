// server/_core/context.ts
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import * as db from "../db";          // adjust path if needed
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

async function getUserFromLocalJwt(
  req: CreateExpressContextOptions["req"]
): Promise<User | null> {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.warn("[Auth] JWT_SECRET is not set; cannot verify local session");
    return null;
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    const p = payload as any;

    const email = typeof p.email === "string" ? p.email : null;
    if (!email) {
      console.warn("[Auth] Local JWT missing email", payload);
      return null;
    }

    // pull the real user row from DB – keeps type correct
    const user = await db.getUserByEmail(email);
    if (!user) {
      console.warn("[Auth] Local JWT email not found in DB:", email);
      return null;
    }

    return user;
  } catch (err) {
    console.warn("[Auth] Failed to verify local JWT session:", err);
    return null;
  }
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  const { req, res } = opts;
  let user: User | null = null;

  // 1️⃣ Try our own JWT-based local login first
  if (process.env.ALLOW_LOCAL_LOGIN === "true") {
    user = await getUserFromLocalJwt(req);
  }

  // 2️⃣ If no user from JWT, fall back to the Manus SDK (OAuth)
  if (!user) {
    try {
      user = await sdk.authenticateRequest(req);
    } catch (error) {
      // Authentication is optional for public procedures.
      user = null;
    }
  }

  return { req, res, user };
}
