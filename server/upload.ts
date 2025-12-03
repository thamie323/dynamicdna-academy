// server/upload.ts
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";   // 👈 add this

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Accept images only
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

    // ---- where to save the file ----
    // server/   -> project root -> client/public/uploads
    const uploadsDir = path.resolve(__dirname, "..", "client", "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(req.file.originalname) || ".png";
    const filename = `${timestamp}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    // Write file to disk
    await fs.writeFile(filePath, req.file.buffer);

    // This is what goes into DB and what the frontend will use
    const url = `/uploads/${filename}`;

    return res.json({
      success: true,
      url,        // 👈 ImageUpload will store this in imageUrl
      key: url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
