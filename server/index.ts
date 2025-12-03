// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { STATIC_ROOT, UPLOADS_ROOT } from "./paths.js"; // 👈 new

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files (client build)
  const staticPath = STATIC_ROOT;
  app.use(express.static(staticPath));

  // ✅ Serve uploaded images from the *same* tree
  app.use("/uploads", express.static(UPLOADS_ROOT));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Static root:   ${staticPath}`);
    console.log(`Uploads root:  ${UPLOADS_ROOT}`);
  });
}

startServer().catch(console.error);
