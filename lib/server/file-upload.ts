// "use server";

// import { writeFile, mkdir } from "fs/promises";
// import { join } from "path";

// export async function saveUploadedFile(file: File): Promise<string> {
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // Create uploads directory if it doesn't exist
//   const uploadsDir = join(process.cwd(), "public/uploads");
//   await mkdir(uploadsDir, { recursive: true });

//   // Generate unique filename
//   const timestamp = Date.now();
//   const ext = file.name.split(".").pop();
//   const fileName = `${timestamp}_${Math.random()
//     .toString(36)
//     .substring(2, 9)}.${ext}`;
//   const path = join(uploadsDir, fileName);

//   await writeFile(path, buffer);
//   return `/uploads/${fileName}`;
// }



"use server";

import cloudinary from "@/lib/cloudinary";

export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url!);
        }
      }
    );

    stream.end(buffer);
  });
}
