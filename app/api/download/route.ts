// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import fs from "fs";
// import path from "path";

// export async function GET(request: Request) {
//   const token = await getToken({ req: request as unknown });

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { searchParams } = new URL(request.url);
//   const fileParam = searchParams.get("file");

//   if (!fileParam) {
//     return NextResponse.json(
//       { error: "File parameter is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Security check - prevent directory traversal
//     const safePath = path.join(
//       process.env.UPLOAD_DIR || "uploads",
//       path.basename(fileParam)
//     );

//     if (!fs.existsSync(safePath)) {
//       return NextResponse.json({ error: "File not found" }, { status: 404 });
//     }

//     const fileBuffer = fs.readFileSync(safePath);
//     const headers = new Headers();
//     headers.set("Content-Type", "application/octet-stream");
//     headers.set(
//       "Content-Disposition",
//       `attachment; filename="${path.basename(fileParam)}"`
//     );

//     return new NextResponse(fileBuffer, { headers });
//   } catch (error) {
//     console.error("File download error:", error);
//     return NextResponse.json(
//       { error: "Failed to download file" },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const fileParam = searchParams.get("file");

//   if (!fileParam) {
//     return NextResponse.json(
//       { error: "File parameter is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Security check - prevent directory traversal
//     const safePath = path.join(
//       process.env.UPLOAD_DIR || "public/uploads",
//       path.basename(fileParam)
//     );

//     if (!fs.existsSync(safePath)) {
//       return NextResponse.json({ error: "File not found" }, { status: 404 });
//     }

//     const fileBuffer = fs.readFileSync(safePath);
//     const headers = new Headers();
//     headers.set("Content-Type", "application/octet-stream");
//     headers.set(
//       "Content-Disposition",
//       `attachment; filename="${path.basename(fileParam)}"`
//     );

//     return new NextResponse(fileBuffer, { headers });
//   } catch (error) {
//     console.error("File download error:", error);
//     return NextResponse.json(
//       { error: "Failed to download file" },
//       { status: 500 }
//     );
//   }
// }




// app/api/download/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("file");

  if (!fileUrl) {
    return NextResponse.json(
      { error: "File parameter is required" },
      { status: 400 }
    );
  }

  // Simply redirect to the Cloudinary URL
  return NextResponse.redirect(fileUrl);
}