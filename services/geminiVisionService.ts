import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize Google GenAI with the secure server-side API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeBlueprintPDFBuffer(pdfBuffer: Buffer, sheetTitle: string) {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      sheetTitle: { type: Type.STRING, description: "Title or name of the architectural/structural sheet." },
      scale: { type: Type.STRING, description: "Detected drawing scale, e.g., 1:100 or 1:50." },
      elements: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Element category: Walls, Columns, Beams, Slabs, Doors, Windows" },
            elementId: { type: Type.STRING, description: "Tag or ID from drawing, e.g., C1, W1, D1" },
            description: { type: Type.STRING, description: "Detailed specification complying with SMM2 standards" },
            estimatedQuantity: { type: Type.NUMBER, description: "Measured quantity based on dimensions" },
            unit: { type: Type.STRING, description: "Measurement unit: m3, m2, m, No." },
            dimensions: { type: Type.STRING, description: "Extracted length, width, thickness or height" },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0.0 and 1.0" }
          },
          required: ["category", "elementId", "estimatedQuantity", "unit"]
        }
      }
    },
    required: ["sheetTitle", "elements"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert construction Quantity Surveyor specializing in SMM2 standards for East Africa (Kenya). Analyze this architectural and structural drawing sheet (${sheetTitle}). Extract all structural elements (walls, columns, beams, slabs, doors, windows), calculate their quantities using visible dimensions, and return strict structured JSON matching the requested schema. Ensure opening deductions and concrete wastage factors are accounted for.`
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBuffer.toString("base64")
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1
      }
    });

    if (!response.text) {
      throw new Error("Gemini Vision returned empty response text.");
    }

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Gemini Vision analysis error:", error);
    throw new Error(`AI Analysis Failed: ${error.message}`);
  }
}
