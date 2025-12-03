import { Request, Response } from "express";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { SignJWT } from "jose";
import * as db from "./db";

/**
 * Local Development Login Handler
 * 
 * This endpoint allows logging in with just an email address for local development.
 * It should only be enabled in development mode.
 * 
 * Security Note: This bypasses OAuth and should NEVER be used in production.
 */
export async function handleLocalLogin(req: Request, res: Response) {
  const allowLocalLogin =
    process.env.NODE_ENV === "development" ||
    process.env.ALLOW_LOCAL_LOGIN === "true";

  if (!allowLocalLogin) {
    return res.status(403).json({
      error: "Local login is not enabled. Set ALLOW_LOCAL_LOGIN=true to enable.",
    });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user by email
    const user = await db.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        error:
          "User not found. Please check your email or create a user in the database first.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error: "Access denied. Only admin users can log in.",
      });
    }

    // ✅ Always have a non-empty openId for the session
    const openId = user.openId || `local:${user.email}`;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const secret = new TextEncoder().encode(jwtSecret);

    const sessionToken = await new SignJWT({
      openId,                         // ✅ use our fallback value
      name: user.name || "",
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(
        Math.floor(Date.now() / 1000) + Math.floor(ONE_YEAR_MS / 1000)
      )
      .sign(secret);

    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, sessionToken, {
      ...cookieOptions,
      maxAge: ONE_YEAR_MS,
    });

    // ✅ keep DB in sync with the same openId
    await db.upsertUser({
      openId,
      name: user.name,
      email: user.email,
      loginMethod: user.loginMethod,
      lastSignedIn: new Date(),
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Local login error:", error);
    return res.status(500).json({
      error: "Internal server error during login",
    });
  }
}

