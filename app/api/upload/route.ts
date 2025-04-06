import { NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/server/file-upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filePath = await saveUploadedFile(file);

    return NextResponse.json({
      success: true,
      filePath,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
