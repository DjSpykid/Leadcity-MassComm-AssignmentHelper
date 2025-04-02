

// // app/api/orders/route.ts
// import { NextResponse } from "next/server";

// import Order from "@/models/Order";
// import jwt from "jsonwebtoken";
// import { writeFile } from "fs/promises";
// import { join } from "path";
// import { courseReps } from "@/data/courseReps";
// import { v4 as uuidv4 } from "uuid";
// import { promises as fs } from "fs";
// import mongoose from "mongoose";
// import { connectToDB } from "@/lib/db/connect";
// ;

// // Connection check middleware
// async function ensureDBConnection() {
//   try {
//     const db = await connectToDB();
//     if (mongoose.connection.readyState !== 1) {
//       throw new Error('MongoDB connection not ready');
//     }
//     return db;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;
//   }
// }

// export async function POST(request: Request) {
//   try {
//     // 0. Ensure database connection
//     await ensureDBConnection();

//     // 1. Authentication
//     const authHeader = request.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json(
//         { error: "Authorization token missing or malformed" },
//         { status: 401 }
//       );
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return NextResponse.json(
//         { error: "Authorization token missing" },
//         { status: 401 }
//       );
//     }

//     // Verify JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//     };

//     if (!decoded.userId) {
//       return NextResponse.json(
//         { error: "Invalid token payload" },
//         { status: 401 }
//       );
//     }

//     // 2. Parse FormData
//     const formData = await request.formData();

//     // Extract fields
//     const serviceType = formData.get("serviceType") as string;
//     const price = parseFloat(formData.get("price") as string);
//     const detailsStr = formData.get("details") as string;

//     // Parse details JSON
//     let details;
//     try {
//       details = JSON.parse(detailsStr);
//     } catch (err) {
//       console.log(err)
//       return NextResponse.json(
//         { error: "Invalid details format" },
//         { status: 400 }
//       );
//     }

//     // 3. Validate required fields
//     const requiredFields = [
//       "studentName",
//       "matricNumber",
//       "courseCode",
//       "selectedRep",
//       "deadline",
//     ];

//     const missingFields = requiredFields.filter((field) => !details[field]);
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { error: `Missing required fields: ${missingFields.join(", ")}` },
//         { status: 400 }
//       );
//     }

//     // 4. Handle file uploads
//     const attachments: string[] = [];
//     const files = formData.getAll("files") as File[];

//     // Create uploads directory if it doesn't exist
//     const uploadsDir = join(process.cwd(), "public/uploads");
//     try {
//       await fs.mkdir(uploadsDir, { recursive: true });
//     } catch (err) {
//       console.error("Error creating uploads directory:", err);
//     }

//     for (const file of files) {
//       try {
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         // Generate unique filename
//         const timestamp = Date.now();
//         const ext = file.name.split(".").pop();
//         const fileName = `${timestamp}_${uuidv4().substring(0, 8)}.${ext}`;
//         const path = join(uploadsDir, fileName);

//         await writeFile(path, buffer);
//         attachments.push(`/uploads/${fileName}`);
//       } catch (err) {
//         console.error(`Error processing file ${file.name}:`, err);
//         // Continue with other files even if one fails
//       }
//     }

//     // 5. Create and save order
//     const repDetails = courseReps.find((rep) => rep.id === details.selectedRep);

//     const order = new Order({
//       serviceType,
//       details: {
//         ...details,
//         attachments: [...(details.attachments || []), ...attachments],
//         repDetails,
//         deadline: new Date(details.deadline),
//       },
//       price,
//       user: decoded.userId,
//       // Status will use the default value from schema
//     });

//     await order.save();

//     return NextResponse.json(
//       {
//         orderId: order._id,
//         message: "Order created successfully",
//         status: order.status, // Return the actual saved status
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Full error details:", {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//     });

//     if (error.name === "JsonWebTokenError") {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     if (error.name === "TokenExpiredError") {
//       return NextResponse.json({ error: "Token expired" }, { status: 401 });
//     }

//     if (error.message.includes("MongoDB connection")) {
//       return NextResponse.json(
//         { error: "Database connection failed. Please try again." },
//         { status: 503 }
//       );
//     }

//     return NextResponse.json(
//       {
//         error: error.message || "Internal server error",
//         details: process.env.NODE_ENV === "development" ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: Request) {
//   try {
//     await ensureDBConnection();

//     // Authentication
//     const authHeader = request.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json(
//         { error: "Authorization token missing or malformed" },
//         { status: 401 }
//       );
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//     };

//     const orders = await Order.find({ user: decoded.userId })
//       .sort({ createdAt: -1 })
//       .lean();

//     return NextResponse.json(orders);
//   } catch (error: any) {
//     console.error("Error fetching orders:", error);
    
//     if (error.name === "JsonWebTokenError") {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     return NextResponse.json(
//       {
//         error: error.message || "Failed to fetch orders",
//         details: process.env.NODE_ENV === "development" ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }



// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db/connect';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import { saveUploadedFile } from '@/lib/server/file-upload';
import { courseReps } from '@/data/courseReps';

export async function POST(request: Request) {
  try {
    await connectToDB();

    // 1. Authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token missing or malformed" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    if (!decoded.userId) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const serviceType = formData.get("serviceType") as string;
    const price = parseFloat(formData.get("price") as string);
    const detailsStr = formData.get("details") as string;

    // 3. Parse and validate details
    let details;
    try {
      details = JSON.parse(detailsStr);
    } catch (err) {
      console.error("Error in API:", err);
      return NextResponse.json(
        { error: "Invalid details format" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      "studentName",
      "matricNumber",
      "courseCode",
      "selectedRep",
      "deadline",
    ];

    const missingFields = requiredFields.filter((field) => !details[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // 4. Handle file uploads
    const attachments: string[] = [];
    const files = formData.getAll("files") as File[];

    for (const file of files) {
      try {
        const fileUrl = await saveUploadedFile(file);
        attachments.push(fileUrl);
      } catch (err) {
        console.error(`Error processing file ${file.name}:`, err);
        // Continue with other files even if one fails
      }
    }

    // 5. Create and save order
    const repDetails = courseReps.find((rep) => rep.id === details.selectedRep);

    const order = new Order({
      serviceType,
      details: {
        ...details,
        attachments: [...(details.attachments || []), ...attachments],
        repDetails,
        deadline: new Date(details.deadline),
      },
      price,
      user: decoded.userId,
      status: "PENDING",
    });

    await order.save();

    return NextResponse.json(
      {
        orderId: order._id.toString(),
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Order creation error:", error);

    if (error instanceof Error) {
      if (error.name === "JsonWebTokenError") {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      if (error.name === "TokenExpiredError") {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

}

export async function GET(request: Request) {
  try {
    await connectToDB();

    // Authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token missing or malformed" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const orders = await Order.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}