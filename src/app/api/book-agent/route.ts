export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
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
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant", // ✅ NEW SUPPORTED MODEL
      temperature: 0.7,
    });

    const reply = chat.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ message: reply });
  } catch (error: any) {
    console.error("BOOK AGENT ERROR:", error);
    return NextResponse.json(
      { message: "Server Error", details: error.message },
      { status: 500 }
    );
  }
}
