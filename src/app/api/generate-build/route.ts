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

COMPATIBILITY REQUIREMENTS - CRITICAL FOR SAFE BUILDING:
1. CPU & Motherboard: Ensure CPU socket matches motherboard socket (e.g., AM5 CPU with AM5 motherboard, LGA1700 CPU with LGA1700 motherboard)
2. RAM & Motherboard: Match RAM type with motherboard support (DDR4 or DDR5)
3. PSU Wattage: Calculate total system power draw and add 20% headroom. Minimum PSU requirements:
   - RTX 4060/RX 7600 class: 550W minimum
   - RTX 4070/RX 7700 XT class: 650W minimum  
   - RTX 4080/RX 7800 XT class: 750W minimum
   - RTX 4090/RX 7900 XTX class: 850W minimum
4. Case Size: Ensure case can fit motherboard form factor (ATX, mATX, ITX) and GPU length
5. Storage: Verify motherboard has required M.2 slots for NVMe SSDs
6. All components must be from reputable manufacturers with good reliability records

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

CRITICAL REQUIREMENTS:
1. COMPATIBILITY: Double-check ALL component compatibility before finalizing. CPU socket MUST match motherboard. PSU wattage MUST be adequate for the entire system with 20% headroom.
2. BUDGET: The total_estimate MUST NOT exceed the budget of $${budget}. If you cannot fit all components within budget, prioritize the most important components for the use case and reduce specs on others. The total should ideally be 90-100% of the budget but NEVER exceed it.
3. SAFETY: Only recommend components that will work together safely and reliably.

Use current market prices and popular, reliable components. Return only the JSON, no additional text.`;

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

    // Check if the AI went over budget and adjust if necessary
    if (buildData.total_estimate > budget) {
      console.warn(`AI exceeded budget: ${buildData.total_estimate} > ${budget}`);
      
      // Calculate the overage and proportionally reduce all component prices
      const overage = buildData.total_estimate - budget;
      const reductionFactor = budget / buildData.total_estimate;
      
      buildData.parts = buildData.parts.map((part: any) => ({
        ...part,
        price_estimate: Math.round(part.price_estimate * reductionFactor)
      }));
      
      buildData.total_estimate = buildData.parts.reduce((sum: number, part: any) => sum + part.price_estimate, 0);
      
      // Update reasoning to reflect the adjustment
      buildData.reasoning += ` Note: Component prices were adjusted to stay within your $${budget} budget.`;
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
