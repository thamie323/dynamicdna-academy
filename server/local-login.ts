import { Request, Response } from "express";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
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
  // Only allow in development mode
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ 
      error: "Local login is only available in development mode" 
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
        error: "User not found. Please check your email or create a user in the database first." 
      });
    }

    // Check if user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({ 
        error: "Access denied. Only admin users can log in." 
      });
    }

    // Create session token
    const sessionToken = await sdk.createSessionToken(user.openId, {
      name: user.name || "",
      expiresInMs: ONE_YEAR_MS,
    });

    // Set session cookie
    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    // Update user's last signed in timestamp
    await db.upsertUser({
      openId: user.openId,
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
      error: "Internal server error during login" 
    });
  }
}