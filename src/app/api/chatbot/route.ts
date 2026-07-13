import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are RigBot, a friendly and knowledgeable PC building assistant for GeniusRig. You specialize in helping users with:

- PC component recommendations and explanations
- Hardware compatibility questions
- Gaming, productivity, and workstation builds
- Latest 2026 hardware including RTX 50/60 series, AMD RX 8000/9000 series, Intel Core Ultra, AMD Ryzen 9000/10000 series
- Budget optimization and price/performance advice
- Troubleshooting build issues

Guidelines:
- Be friendly, helpful, and enthusiastic about PC building
- Keep responses concise but informative (2-3 sentences max for simple questions)
- Use emojis sparingly but appropriately
- If asked about specific products, mention current 2026 options
- For complex builds, suggest using the main build assistant tool
- Stay focused on PC hardware topics

User question: ${message}

Provide a helpful, friendly response:`;

    const client = new GoogleGenAI({ apiKey });

    const interaction = await client.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt,
    });

    const content = interaction.output_text;

    if (!content) {
      throw new Error("No response from Gemini");
    }

    return NextResponse.json({ response: content.trim() });
  } catch (error) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI assistant" },
      { status: 500 }
    );
  }
}