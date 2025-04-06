// lib/server/cloudinary-upload.ts
"use server";

import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function uploadToCloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "assignments",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        }
      }
    );

    const readableStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });

    readableStream.pipe(uploadStream);
  });
}
