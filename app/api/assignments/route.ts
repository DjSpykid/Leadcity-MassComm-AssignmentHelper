import { connectDB } from "@/lib/db";
import Assignment from "@/models/assignment";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const file = formData.get("file"); // file will be a Blob

    if (!title || !description || !price) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newAssignment = new Assignment({
      title,
      description,
      price,
      fileUrl: file ? "uploaded-file-url" : null, // Handle file uploads later
    });

    await newAssignment.save();
    return NextResponse.json(
      { message: "Assignment submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
     console.error("Error submitting assignment:", error);
    return NextResponse.json(
      { error: "Error submitting assignment" },
      { status: 500 }
    );
  }
}
