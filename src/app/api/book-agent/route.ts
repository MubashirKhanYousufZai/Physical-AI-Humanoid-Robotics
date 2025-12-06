export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

interface RequestBody {
  prompt: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as RequestBody;

    if (!body.prompt || !body.prompt.trim()) {
      return NextResponse.json(
        { message: "No prompt received" },
        { status: 400 }
      );
    }

    console.log("Loaded API Key:", process.env.GROQ_API_KEY);

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const chat = await client.chat.completions.create({
      messages: [{ role: "user", content: body.prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
    });

    const reply = chat.choices?.[0]?.message?.content ?? "No response";

    return NextResponse.json({ message: reply });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";

    console.error("BOOK AGENT ERROR:", errorMessage);

    return NextResponse.json(
      { message: "Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
