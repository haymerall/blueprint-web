const fs = require('fs');
const path = require('path');

console.log("[*] Wiring Live Gemini Vision API & CAD Pipeline Integration...");

// 1. Create API route: app/api/analyze-blueprint/route.ts
const apiDir = path.join('app', 'api', 'analyze-blueprint');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

const apiRouteContent = `import { NextRequest, NextResponse } from "next/server";
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
      return NextResponse.json({ 
        error: "GEMINI_API_KEY environment variable is not configured." 
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const prompt = \`
    You are an expert Quantity Surveyor specializing in SMM2 (Standard Method of Measurement) CAD analysis.
    Analyze this architectural drawing and extract structural quantities.
    
    1. Identify structural elements: Concrete Walls, RC Columns, Beams, Slabs, and Openings/Doors.
    2. Provide total quantities, units (m³, m², or Nr), confidence scores, and SMM2 measurement codes.
    3. Return bounding box normalized coordinates [ymin, xmin, ymax, xmax] scaled 0 to 1000 for key detected elements so they can be overlaid on the CAD canvas.
    \`;

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
            { text: prompt }
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
    console.error("Gemini Vision Extraction Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process blueprint with Gemini Vision API" }, { status: 500 });
  }
}
`;

fs.writeFileSync(path.join(apiDir, 'route.ts'), apiRouteContent);
console.log("[✓] Created app/api/analyze-blueprint/route.ts");

// 2. Create .env.local template if missing
const envPath = path.join('.env.local');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, 'GEMINI_API_KEY=your_gemini_api_key_here\n');
  console.log("[✓] Created .env.local template");
}

console.log("[*] Live Gemini Vision integration setup completed successfully!");
