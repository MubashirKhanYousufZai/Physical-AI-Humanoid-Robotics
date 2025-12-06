"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// === Your full book content ===
const bookContent = `
Chapter 1: Defining the Disciplines
This chapter establishes the core terminology and historical context for both Artificial Intelligence and Robotics... 
Chapter 2: The Fusion of AI and Humanoids
This chapter explores the necessity and methods of integration...
Chapter 3: Advanced Perception
For a humanoid to operate effectively...
Chapter 4: Human-Robot Interaction (HRI)
Humanoids require specialized skills...
Chapter 5: Motion and Locomotion
This chapter focuses on AI for purposeful humanoid movement...
Chapter 6: Learning and Manipulation
Humanoids learn skills and interact with objects...
Chapter 7: Safety, Trust, and Regulation
As humanoids become more capable, safety and ethics become critical...
Chapter 8: The Road Ahead
Our final chapter explores the future of AI and humanoid design...
`;

export default function BookAgentWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (): Promise<void> => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/book-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
          Use ONLY the following book content to answer the question.
          If the answer is not in the book, reply: "I don't know".

          Book content:
          ${bookContent}

          Question:
          ${prompt}
          `,
        }),
      });

      const data = (await res.json()) as { message?: string };
      setResponse(data.message ?? "No response");
    } catch {
      setResponse("⚠️ Something went wrong with the API request.");
    }

    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          📘 Book Agent
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl p-5 border z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📘 Book Helper Agent</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-red-500 text-lg font-bold hover:text-red-600 transition-colors"
            >
              ✖
            </button>
          </div>

          <Card className="shadow-none border-0">
            <CardContent className="p-0 space-y-4">
              <Textarea
                className="min-h-[120px]"
                placeholder="Ask anything about your book..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <Button onClick={handleAsk} disabled={loading} className="w-full">
                {loading ? "Thinking..." : "Ask Agent"}
              </Button>

              {response && (
                <div className="p-3 bg-gray-100 border rounded-xl whitespace-pre-wrap text-sm">
                  {response}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
