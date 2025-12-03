// server/_core/context.ts
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { COOKIE_NAME } from "@shared/const";
import { jwtVerify } from "jose";
import * as db from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

async function getUserFromLocalJwt(
  opts: CreateExpressContextOptions
): Promise<User | null> {
  const cookieHeader = opts.req.headers.cookie ?? "";
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("[Auth] JWT_SECRET is not set – cannot verify local JWT");
    return null;
  }

  // crude cookie parse (works fine for our single cookie)
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map(c => c.trim())
      .filter(Boolean)
      .map(c => {
        const [k, ...rest] = c.split("=");
        return [decodeURIComponent(k), rest.join("=")];
      })
  );

  const token = cookies[COOKIE_NAME];
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);

    const email = payload.email as string | undefined;
    if (!email) {
      console.warn("[Auth] Local JWT missing email");
      return null;
    }

    // get full User row from DB (type-safe)
    const user = await db.getUserByEmail(email);
    if (!user) {
      console.warn("[Auth] Local JWT email not found in DB:", email);
      return null;
    }

    return user;
  } catch (err) {
    console.error("[Auth] Failed to verify local JWT cookie:", err);
    return null;
  }
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  const allowLocalLogin =
    process.env.NODE_ENV === "development" ||
    process.env.ALLOW_LOCAL_LOGIN === "true";

  if (allowLocalLogin) {
    // 🔑 When ALLOW_LOCAL_LOGIN is on, prefer our own JWT cookie
    user = await getUserFromLocalJwt(opts);
  } else {
    // normal cloud / OAuth path
    try {
      user = await sdk.authenticateRequest(opts.req);
    } catch {
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
