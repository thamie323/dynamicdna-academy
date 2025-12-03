// server/upload.ts
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { UPLOADS_ROOT } from "./paths.js"; // 👈 new

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

export const uploadMiddleware = upload.single("file");

export async function handleUpload(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔥 This is exactly the same folder that Express serves
    const uploadsDir = UPLOADS_ROOT;
    await fs.mkdir(uploadsDir, { recursive: true });

    const timestamp = Date.now();
    const ext = path.extname(req.file.originalname) || ".png";
    const filename = `${timestamp}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.writeFile(filePath, req.file.buffer);

    // URL stored in DB / used by frontend
    const url = `/uploads/${filename}`;

    return res.json({
      success: true,
      url,
      key: url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}
