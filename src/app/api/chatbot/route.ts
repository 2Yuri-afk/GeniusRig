import { NextRequest, NextResponse } from "next/server";

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
- Latest 2025 hardware including RTX 50 series, AMD RX 8000 series, Intel 15th gen, AMD Ryzen 9000 series
- Budget optimization and price/performance advice
- Troubleshooting build issues

Guidelines:
- Be friendly, helpful, and enthusiastic about PC building
- Keep responses concise but informative (2-3 sentences max for simple questions)
- Use emojis sparingly but appropriately
- If asked about specific products, mention current 2025 options
- For complex builds, suggest using the main build assistant tool
- Stay focused on PC hardware topics

User question: ${message}

Provide a helpful, friendly response:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 300,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

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