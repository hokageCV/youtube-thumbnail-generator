import { processUserInput } from '@/utils/open-ai';
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const text = body.text;

    const summary = await processUserInput(text)
    const data = { text: summary }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return NextResponse.json( { error: "Invalid JSON" }, { status: 400 })
  }
}
