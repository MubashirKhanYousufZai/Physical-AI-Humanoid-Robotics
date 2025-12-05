"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// === Paste your full book content here ===
const bookContent = `
Chapter 1: AI Introduction
Artificial Intelligence (AI) is the simulation of human intelligence in machines...

Chapter 2: Humanoid Robots
Humanoid robots are designed to resemble humans in appearance and behavior...

Chapter 3: Human-Robot Interaction
Effective HRI requires natural language understanding, emotion recognition, and adaptive behavior...
`; 

export default function BookAgent() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    setResponse(""); 
    setLoading(true);

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
          `
        }),
      });

      const data = await res.json();
      setResponse(data.message || "No message received");
    } catch (err) {
      setResponse("⚠️ Something went wrong with the API request.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Agent Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          📘 Book Agent
        </button>
      )}

      {/* Agent Popup */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl p-5 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📘 Book Helper Agent</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-red-500 text-lg font-bold"
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
