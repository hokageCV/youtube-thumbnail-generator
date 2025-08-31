import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = { text: body.text }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return NextResponse.json( { error: "Invalid JSON" }, { status: 400 })
  }
}
