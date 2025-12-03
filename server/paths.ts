// server/paths.ts
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// When compiled, __dirname will be .../dist
// We'll keep client assets in dist/public (your existing pattern)
export const STATIC_ROOT =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")         // dist/public
    : path.resolve(__dirname, "..", "dist", "public");

// Put uploads *inside* the static root so Express can serve them
export const UPLOADS_ROOT = path.join(STATIC_ROOT, "uploads");
