// src/rag/rag.js

const { Groq } = require('groq-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// --- Configuration ---
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DB_PATH = path.join(process.cwd(), 'rag-db.json');

// Initialize Groq SDK and RAG Database
let groq;
let ragDatabase = [];

try {
    if (!GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY not found in environment variables.");
    }
    groq = new Groq({ apiKey: GROQ_API_KEY });
    
    // Load the RAG database file
    const dbContent = fs.readFileSync(DB_PATH, 'utf-8');
    ragDatabase = JSON.parse(dbContent);
    
    if (ragDatabase.length === 0) {
        console.warn("RAG Database is empty. The model will respond without context.");
    }
    
} catch (error) {
    console.error("RAG Initialization Error:", error.message);
    // Set a flag or simplified object so askRAG can handle the error gracefully
    ragDatabase = null; 
    groq = null;
}


// --- Utility Function: Simulate Embedding (Semantic Search) ---
// In a real RAG system, you would use an embedding model (like OpenAI, Cohere, or a local one)
// to convert the query into a vector and search the database for the closest vector chunk.
// For simplicity, we simulate this by looking for keyword matches in the 'content' field.
function getContext(query) {
    if (!ragDatabase) {
        return "ERROR: RAG database failed to load. Check server console for GROQ_API_KEY or DB_PATH error.";
    }
    
    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);
    let context = [];

    // Simple keyword matching and scoring
    ragDatabase.forEach(item => {
        let score = 0;
        const lowerContent = item.content.toLowerCase();
        
        keywords.forEach(keyword => {
            if (lowerContent.includes(keyword)) {
                score++;
            }
        });

        if (score > 0) {
            context.push({ 
                source: item.source, 
                content: item.content, 
                score: score 
            });
        }
    });

    // Sort by score and take the top 3 chunks
    context.sort((a, b) => b.score - a.score);
    
    if (context.length === 0) {
        return ""; // No relevant context found
    }

    // Format the context string for the LLM
    return context.slice(0, 3).map(c => `--- [Source: ${c.source}] ---\n${c.content}`).join('\n\n');
}

// --- Main RAG Function ---
async function askRAG(query) {
    if (!groq) {
        // Throw an error if initialization failed (API key missing, etc.)
        throw new Error("RAG system not initialized. Check server console for configuration errors.");
    }

    const context = getContext(query);
    
    const systemPrompt = `You are an AI assistant specialized in the book "Physical AI & Humanoid Robotics".
    
    Your goal is to answer the user's question based ONLY on the provided context below.
    If the context is empty or does not contain the answer, state clearly that you cannot find the relevant information in the book.
    Always prioritize information from the context.
    
    --- CONTEXT ---
    ${context || "No relevant information found in the book's database."}
    ---
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: query }
            ],
            model: "mixtral-8x7b-32768", // Fast and powerful model
            temperature: 0.1,
        });

        const answer = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        
        // Append source information if context was used
        if (context) {
            const sources = ragDatabase.map(c => c.source).join(', ');
            return `${answer}\n\n(Source: Information derived from the book database.)`;
        }

        return answer;
        
    } catch (error) {
        console.error("Groq API Call Failed:", error);
        throw new Error(`Groq API failed: ${error.message}`);
    }
}

module.exports = {
    askRAG
};