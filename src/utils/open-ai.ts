import OpenAI from "openai"

const client = new OpenAI

export async function processUserInput(user_input: string): Promise<string> {
  const SYSTEM_PROMPT = process.env.SYSTEM_INSTRUCTIONS!;

  const response = await client.chat.completions.create({
    model: process.env.CHAT_MODEL_NAME!,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: user_input },
    ],
  })

  return response.choices[0].message?.content ?? ""
}
