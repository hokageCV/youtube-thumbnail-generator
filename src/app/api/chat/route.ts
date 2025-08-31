import { processUserInput } from '@/utils/open-ai';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, image } = await req.json()

    const summary = await processUserInput(text)
    const data = { text: summary, image: image ?? null }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
