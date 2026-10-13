import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No PDF blueprint file provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return structured mock response if API key is not configured so app doesn't hang
      return NextResponse.json({
        success: true,
        mock: true,
        data: {
          projectName: file.name.replace(/\.pdf$/i, "").replace(/_/g, " "),
          drawingScale: "1:100 @ A1",
          grossAreaSqM: 3450.0,
          elements: [
            { smm2Code: "A.1.1", description: "Reinforced Concrete Walls (200mm)", unit: "m³", quantity: 1310.5, confidence: "99.1%", box2d: [100, 100, 900, 900] },
            { smm2Code: "A.2.1", description: "RC Columns (300x300mm)", unit: "m³", quantity: 52.4, confidence: "97.5%", box2d: [150, 150, 250, 250] },
            { smm2Code: "A.3.1", description: "RC Beams & Lintels", unit: "m³", quantity: 142.1, confidence: "95.0%", box2d: [300, 200, 380, 800] },
            { smm2Code: "E.1.2", description: "Solid Core Timber Flush Doors", unit: "No.", quantity: 16, confidence: "98.2%", box2d: [450, 100, 550, 180] }
          ]
        }
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        projectName: { type: Type.STRING },
        drawingScale: { type: Type.STRING },
        grossAreaSqM: { type: Type.NUMBER },
        elements: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              smm2Code: { type: Type.STRING },
              description: { type: Type.STRING },
              unit: { type: Type.STRING },
              quantity: { type: Type.NUMBER },
              confidence: { type: Type.STRING },
              box2d: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER },
                description: "Bounding box normalized coordinates [ymin, xmin, ymax, xmax] from 0 to 1000"
              }
            },
            required: ["smm2Code", "description", "unit", "quantity", "confidence"]
          }
        }
      },
      required: ["projectName", "drawingScale", "elements"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: file.type || "application/pdf", data: base64Data } },
            { text: "Analyze this architectural blueprint and extract SMM2 structural takeoff quantities and bounding box coordinates [ymin, xmin, ymax, xmax] scaled 0 to 1000." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return NextResponse.json({ success: true, data: parsedData });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process blueprint" }, { status: 500 });
  }
}
