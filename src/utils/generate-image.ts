import OpenAI from "openai"

const nanoBanana = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.NANO_BANANA_KEY,
})

type NanoBananaMessage = {
  role: string
  content?: string
  images?: { type: string; image_url: { url: string }; index: number }[]
}

export async function generateImage(
  processedText: string,
  base64Image?: string
): Promise<{ text: string; imageUrl: string | null }> {
  const contentArray: any[] = [{ type: "text", text: processedText }]

  if (base64Image) contentArray.push({ type: "image_url", image_url: { url: base64Image } })

  const completion = await nanoBanana.chat.completions.create({
    model: process.env.IMAGE_MODEL_NAME!,
    messages: [{ role: "user", content: contentArray }],
  })

  const replyMessage = completion.choices[0].message as unknown as NanoBananaMessage
  const messageText = typeof replyMessage?.content === "string" ? replyMessage.content : ""
  const imageUrl = replyMessage?.images?.[0]?.image_url?.url ?? null

  return { text: messageText, imageUrl }
}
