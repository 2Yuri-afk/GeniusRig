import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { budget, useCase, preferredBrands } = await request.json();

    if (!budget || !useCase) {
      return NextResponse.json(
        { error: "Budget and use case are required" },
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

    const prompt = `You are an expert PC builder. Given a budget, use case, and optional brand preferences, recommend compatible computer parts including CPU, GPU, RAM, Storage, Motherboard, PSU, and Case.

Budget: $${budget}
Use Case: ${useCase}
${preferredBrands ? `Preferred Brands: ${preferredBrands}` : ""}

IMPORTANT: Consider the latest components available as of early 2025, including:

GPUs:
- NVIDIA RTX 50 series: RTX 5090, RTX 5080, RTX 5070 Ti, RTX 5070, RTX 5060 Ti, RTX 5060
- AMD RX 8000 series: RX 8800 XT, RX 8700 XT, RX 8600 XT, RX 8500 XT
- Intel Arc B-series: Arc B580, Arc B570

CPUs:
- AMD Ryzen 9000 series: Ryzen 9 9950X, 9900X, 9700X, 9600X
- AMD Ryzen 8000 series APUs: Ryzen 7 8700G, Ryzen 5 8600G, Ryzen 5 8500G
- Intel 15th gen: Core i9-15900K, i7-15700K, i5-15600K
- Intel 14th gen refresh: Core i9-14900KS, i7-14700KF, i5-14600KF

Motherboards:
- AMD AM5 chipsets: X870E, X870, B850, A820
- Intel LGA 1700/1851: Z890, B860, H810

Memory & Storage:
- DDR5 memory as standard (DDR5-5600, DDR5-6000, DDR5-6400)
- PCIe 5.0 NVMe SSDs
- PCIe 4.0 SSDs for budget builds

Please recommend a complete PC build with all necessary components using current 2025 pricing and availability.

Return result as JSON with this exact structure:
{
  "parts": [
    {"name": "Component Name", "type": "CPU", "price_estimate": 300},
    {"name": "Component Name", "type": "GPU", "price_estimate": 500},
    {"name": "Component Name", "type": "RAM", "price_estimate": 150},
    {"name": "Component Name", "type": "Storage", "price_estimate": 100},
    {"name": "Component Name", "type": "Motherboard", "price_estimate": 150},
    {"name": "Component Name", "type": "PSU", "price_estimate": 100},
    {"name": "Component Name", "type": "Case", "price_estimate": 80}
  ],
  "total_estimate": 1380,
  "reasoning": "Brief explanation of why these components were chosen and how they work together for the specified use case and budget."
}

Ensure all components are compatible and the total stays within or close to the budget. Use current market prices and popular, reliable components. Return only the JSON, no additional text.`;

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
            maxOutputTokens: 2048,
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

    // Parse the JSON response
    let buildData;
    try {
      // Clean the response to extract JSON
      const cleanedContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      buildData = JSON.parse(cleanedContent);
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        buildData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON response from AI");
      }
    }

    // Validate the response structure
    if (
      !buildData.parts ||
      !Array.isArray(buildData.parts) ||
      !buildData.total_estimate ||
      !buildData.reasoning
    ) {
      throw new Error("Invalid response structure from AI");
    }

    return NextResponse.json(buildData);
  } catch (error) {
    console.error("Error generating build:", error);
    return NextResponse.json(
      { error: "Failed to generate build recommendation" },
      { status: 500 }
    );
  }
}
