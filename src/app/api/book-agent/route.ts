import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

interface BodyRequest {
  prompt: string;
}

export async function POST(req: Request) {
  try {
    const body: BodyRequest = await req.json();

    if (!body.prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    console.log("GROQ_API_KEY Loaded:", !!process.env.GROQ_API_KEY);

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY ?? "",
    });

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: body.prompt,
        },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Book Agent Error:", error);
    return NextResponse.json(
      { error: "Server Error — Check your API key or request body" },
      { status: 500 },
    );
  }
}
