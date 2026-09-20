import express from "express";
import path from "path";
import * as archiverModule from "archiver";
import { createServer as createViteServer } from "vite";
import { getAllStudents, getAttendanceByDate, saveAttendanceRecord } from "./src/db/attendance.ts";
import { getOrCreateUser } from "./src/db/users.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      database: "Cloud SQL PostgreSQL",
      region: "asia-southeast1",
      instance: "ai-studio-2faa4f60",
    });
  });

  // Database endpoints
  app.get("/api/students", async (_req, res) => {
    try {
      const studentList = await getAllStudents();
      res.json(studentList);
    } catch (error: any) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: error.message || "Failed to fetch students" });
    }
  });

  app.get("/api/attendance", async (req, res) => {
    try {
      const date = (req.query.date as string) || new Date().toISOString().split("T")[0];
      const records = await getAttendanceByDate(date);
      res.json(records);
    } catch (error: any) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: error.message || "Failed to fetch attendance" });
    }
  });

  app.post("/api/attendance", async (req, res) => {
    try {
      const { studentId, date, status, hadBreakfast, hadLunch, note } = req.body;
      const record = await saveAttendanceRecord({
        studentId,
        date: date || new Date().toISOString().split("T")[0],
        status: status || "present",
        hadBreakfast: !!hadBreakfast,
        hadLunch: !!hadLunch,
        note,
      });
      res.json(record);
    } catch (error: any) {
      console.error("Error saving attendance:", error);
      res.status(500).json({ error: error.message || "Failed to save attendance" });
    }
  });

  // User sync with Firebase Auth
  app.post("/api/users/sync", async (req, res) => {
    try {
      const { uid, email, name } = req.body;
      if (!uid || !email) {
        return res.status(400).json({ error: "Missing uid or email" });
      }
      const user = await getOrCreateUser(uid, email, name);
      res.json(user);
    } catch (error: any) {
      console.error("Error syncing user:", error);
      res.status(500).json({ error: error.message || "Failed to sync user" });
    }
  });

  // Direct download endpoint for Flutter App project (ZIP)
  app.get("/api/download/flutter-app", (_req, res) => {
    try {
      res.setHeader("Content-Disposition", 'attachment; filename="eduattend-flutter-app.zip"');
      res.setHeader("Content-Type", "application/zip");
      const ZipClass = archiverModule.ZipArchive || (archiverModule as any).default?.ZipArchive;
      const archive = ZipClass ? new ZipClass({ zlib: { level: 9 } }) : (archiverModule as any)("zip", { zlib: { level: 9 } });
      archive.on("error", (err: any) => {
        console.error("Archive error:", err);
        if (!res.headersSent) res.status(500).send({ error: err.message });
      });
      archive.pipe(res);
      archive.directory(path.join(process.cwd(), "flutter_app"), "flutter_app");
      archive.finalize();
    } catch (err: any) {
      console.error("Download error:", err);
      if (!res.headersSent) res.status(500).send({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
