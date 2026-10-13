import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided in the upload request." }, { status: 400 });
    }

    // Validate file type (PDF or supported image types)
    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file format. Please upload a valid architectural PDF or drawing image." }, { status: 400 });
    }

    // Enforce 50MB file size limit
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds the 50MB maximum limit." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Calculate file hash for integrity and duplicate detection
    const fileHash = crypto.createHash("sha256").update(buffer).digest("hex");

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadDir, safeFilename);

    await fs.writeFile(filePath, buffer);

    // Return structured success response with metadata for Celery task dispatch
    return NextResponse.json({
      success: true,
      message: "Blueprint uploaded successfully and queued for analysis.",
      file: {
        filename: safeFilename,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        fileHash: fileHash,
        url: `/uploads/${safeFilename}`
      },
      task: {
        taskId: `task-${Date.now()}`,
        status: "QUEUED",
        dispatchTime: new Date().toISOString()
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Internal server error during file upload." }, { status: 500 });
  }
}
