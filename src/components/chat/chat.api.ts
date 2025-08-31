export async function sendMessage(text: string, image?: string): Promise<{ text: string; image?: string }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, image }),
  })

  if (!res.ok) throw new Error("Failed to send message")

  const data = await res.json()
  return { text: data?.data?.text ?? "", image: data?.data?.image }
}
