// import { NextResponse } from "next/server";
// import { saveUploadedFile } from "@/lib/server/file-upload";

// // export async function POST(request: Request) {
// //   try {
// //     const formData = await request.formData();
// //     const file = formData.get("file") as File;

// //     if (!file) {
// //       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
// //     }

// //     const filePath = await saveUploadedFile(file);

// //     return NextResponse.json({
// //       success: true,
// //       filePath,
// //     });
// //   } catch (error) {
// //     console.error("File upload error:", error);
// //     return NextResponse.json({ error: "File upload failed" }, { status: 500 });
// //   }
// // }



// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/server/cloudinary-upload";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload to Cloudinary
    const fileUrl = await uploadToCloudinary(file);

    return NextResponse.json({
      success: true,
      fileUrl,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}