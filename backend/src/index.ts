import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { runAgent } from "./groqAgent.js";
import type { HistoryMessage } from "./groqAgent.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
}

function isHistoryMessage(h: unknown): h is HistoryMessage {
  if (typeof h !== "object" || h === null) return false;
  const entry = h as Record<string, unknown>;
  return (entry.role === "user" || entry.role === "assistant") && typeof entry.content === "string";
}

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req: Request<object, object, ChatRequestBody>, res: Response) => {
  try {
    const { message, history } = req.body ?? {};
    if (typeof message !== "string" || message.length === 0) {
      res.status(400).json({ error: "`message` (string) is required" });
      return;
    }
    const cleanHistory = Array.isArray(history) ? history.filter(isHistoryMessage) : [];
    const result = await runAgent(message, cleanHistory);
    res.json(result);
  } catch (err) {
    console.error("[/api/chat] error:", err);
    res.status(500).json({ error: "Something went wrong processing that request." });
  }
});

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
