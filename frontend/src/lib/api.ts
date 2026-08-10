import type { ChatApiResponse } from "@/types/chat"

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787"

export async function sendChatMessage(
  message: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<ChatApiResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }

  return res.json()
}
