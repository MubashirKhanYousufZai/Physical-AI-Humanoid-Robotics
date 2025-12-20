// src/rag/rag.js

const { Groq } = require('groq-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// --- Configuration ---
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'mixtral-8x7b-32768'; // Default model
const DB_PATH = path.join(process.cwd(), 'rag-db.json');

// Initialize Groq SDK and RAG Database
let groq;
let ragDatabase = [];

try {
    if (!GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY not found in environment variables.');
    }
    groq = new Groq({ apiKey: GROQ_API_KEY });

    // Load the RAG database file
    const dbContent = fs.readFileSync(DB_PATH, 'utf-8');
    ragDatabase = JSON.parse(dbContent);

    if (ragDatabase.length === 0) {
        console.warn('RAG Database is empty. The model will respond without context.');
    }
} catch (error) {
    console.error('RAG Initialization Error:', error.message);
    // Set a flag or simplified object so askRAG can handle the error gracefully
    ragDatabase = null;
    groq = null;
}

// --- Utility Function: Simulate Embedding (Semantic Search) ---
// In a real RAG system, you would use an embedding model to convert the query
// into a vector and search for the most similar chunks. For simplicity, we use keyword matching.
function getContext(query) {
    if (!ragDatabase) {
        return {
            contextText: 'ERROR: RAG database failed to load. Check server console for GROQ_API_KEY or DB_PATH error.',
            sources: [],
        };
    }

    const keywords = query.toLowerCase().split(/\s+/).filter((k) => k.length > 2);
    const contextChunks = [];

    // Simple keyword matching and scoring
    ragDatabase.forEach((item) => {
        let score = 0;
        const lowerContent = item.content.toLowerCase();

        keywords.forEach((keyword) => {
            if (lowerContent.includes(keyword)) {
                score++;
            }
        });

        if (score > 0) {
            contextChunks.push({
                source: item.source,
                content: item.content,
                score: score,
            });
        }
    });

    // Sort by score and take the top 3 chunks
    contextChunks.sort((a, b) => b.score - a.score);
    const topContext = contextChunks.slice(0, 3);

    if (topContext.length === 0) {
        return { contextText: '', sources: [] }; // No relevant context found
    }

    // Format the context string and collect unique sources for the LLM
    const contextText = topContext.map((c) => `--- [Source: ${c.source}] ---\n${c.content}`).join('\n\n');
    const sources = [...new Set(topContext.map((c) => c.source))]; // Get unique sources

    return { contextText, sources };
}

// --- Main RAG Function ---
async function askRAG(query) {
    if (!groq) {
        // Throw an error if initialization failed (API key missing, etc.)
        throw new Error('RAG system not initialized. Check server console for configuration errors.');
    }

    const { contextText, sources } = getContext(query);

    const systemPrompt = `You are an AI assistant specialized in the book "Physical AI & Humanoid Robotics".
    
    Your goal is to answer the user's question based ONLY on the provided context below.
    If the context is empty or does not contain the answer, state clearly that you cannot find the relevant information in the book.
    Always prioritize information from the context.
    
    --- CONTEXT ---
    ${contextText || "No relevant information found in the book's database."}
    ---
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query },
            ],
            model: GROQ_MODEL, // Use the configured model
            temperature: 0.1,
        });

        const answer = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        // Append source information if context was used
        if (sources.length > 0) {
            return `${answer}\n\n(Source: ${sources.join(', ')})`;
        }

        return answer;
    } catch (error) {
        console.error('Groq API Call Failed:', error);
        throw new Error(`Groq API failed: ${error.message}`);
    }
}

module.exports = {
    askRAG,
};