import { generateImage } from '@/utils/generate-image';
import { processUserInput } from '@/utils/open-ai';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, image } = await req.json()
    if (!text?.trim()) return NextResponse.json({ error: "Text is required" }, { status: 400 })

    const processedInput = await processUserInput(text)

    const result = await generateImage(processedInput, image)
    const data = {
      text: result.text ?? 'Error in processing input. Kripya kuch samay baad prayatn kare.',
      image: result.imageUrl ?? null
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
