/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or left as default placeholder. Immersive atmospheric fallback mode active.");
}

// Memory database for newsletter subscriptions and saved archive items
const subscribers: Array<{ email: string; date: string }> = [];

// API: Newsletter subscription
app.post("/api/newsletter/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Indirizzo email non valido." });
  }

  // Prevent duplicates
  if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ success: true, message: "Sei già registrato all'archivio segreto." });
  }

  subscribers.push({ email, date: new Date().toISOString() });
  return res.json({
    success: true,
    message: "La tua chiave d'accesso all'archivio è stata sigillata. Riceverai i prossimi frammenti."
  });
});

// API: Get total subscribers count for social proof
app.get("/api/newsletter/count", (req, res) => {
  res.json({ count: 147 + subscribers.length });
});

// API: Serve custom cover image if uploaded
app.get("/api/cover/:index", (req, res) => {
  const index = req.params.index;
  const idx = parseInt(index, 10);
  const num = isNaN(idx) ? 1 : idx + 1;
  const possiblePaths = [
    path.join(process.cwd(), `Cover ${num}.jpeg`),
    path.join(process.cwd(), `Cover ${num}.jpg`),
    path.join(process.cwd(), `Cover ${num}.png`),
    path.join(process.cwd(), `cover ${num}.jpeg`),
    path.join(process.cwd(), `cover ${num}.jpg`),
    path.join(process.cwd(), `cover ${num}.png`)
  ];
  const coverPath = possiblePaths.find(p => fs.existsSync(p));
  if (coverPath) {
    res.sendFile(coverPath);
  } else {
    res.status(404).json({ error: `Cover ${num} not uploaded yet.` });
  }
});

// Serve frontend assets
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files in production layout.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on port ${PORT}`);
  });
}

start();
