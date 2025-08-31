export async function sendMessage(text: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error("Failed to send message")

  const data = await res.json()
  return data?.data?.text ?? ""
}
