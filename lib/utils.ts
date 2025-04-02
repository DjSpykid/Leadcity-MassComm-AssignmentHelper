// // app/actions/file-upload.ts
// "use server";

// import { join } from "path";
// import { promises as fs } from "fs";

// export async function saveUploadedFile(file: File): Promise<string> {
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const uploadsDir = join(process.cwd(), "public/uploads");
//   await fs.mkdir(uploadsDir, { recursive: true });

//   const timestamp = Date.now();
//   const ext = file.name.split(".").pop();
//   const fileName = `${timestamp}_${Math.random()
//     .toString(36)
//     .substring(2, 9)}.${ext}`;
//   const path = join(uploadsDir, fileName);

//   await fs.writeFile(path, buffer);
//   return `/uploads/${fileName}`;
// }

// export async function handleFileUpload(formData: FormData) {
//   try {
//     const file = formData.get("file") as File;
//     if (!file) {
//       throw new Error("No file uploaded");
//     }
//     const filePath = await saveUploadedFile(file);
//     return { success: true, filePath };
//   } catch (error) {
//     console.error("Upload failed:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Upload failed",
//     };
//   }
// }


// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}