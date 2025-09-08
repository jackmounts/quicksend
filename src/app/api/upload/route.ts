import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const uploadDir = "\\\\nas\\quicksend";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savedFiles: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueName = `${Date.now()}-${value.name}`;
        const filePath = path.join(uploadDir, uniqueName);

        fs.writeFileSync(filePath, buffer);

        savedFiles.push(filePath);
      }
    }

    return NextResponse.json({ success: true, files: savedFiles });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: "Errore upload" },
      { status: 500 }
    );
  }
}
