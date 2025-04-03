




// import { NextResponse } from "next/server";
// import Order from "@/models/Order";
// import { connectToDB } from "@/lib/db/connect";

// export async function GET() {
//   try {
//     await connectToDB();

//     const orders = await Order.find()
//       .populate("user", "name email phone") // Added phone to populated fields
//       .sort({ createdAt: -1 })
//       .lean(); // Using lean() for better performance

//     // Transform the data to include all necessary fields
//     const enhancedOrders = orders.map((order) => ({
//       ...order,
//       _id: order._id.toString(), // Convert ObjectId to string
//       createdAt: order.createdAt.toISOString(),
//       // Ensure details exists and has all expected fields
//       details: {
//         studentName: order.details?.studentName || "Not provided",
//         matricNumber: order.details?.matricNumber || "Not provided",
//         courseCode: order.details?.courseCode || "Not provided",
//         assignmentQuestion: order.details?.assignmentQuestion || "",
//         pages: order.details?.pages || 0,
//         handwrittenRequired: order.details?.handwrittenRequired || false,
//         formatting: order.details?.formatting || "",
//         deadline: order.details?.deadline || null,
//         specialInstructions: order.details?.specialInstructions || "",
//         attachments: order.details?.attachments || [],
//         printType: order.details?.printType || "",
//         copies: order.details?.copies || 1,
//         bindingType: order.details?.bindingType || "",
//         urgency: order.details?.urgency || "standard",
//         deliveryFormat: order.details?.deliveryFormat || "",
//         repDetails: order.details?.repDetails || null,
//       },
//     }));

//     return NextResponse.json(enhancedOrders);
//   } catch (error) {
//     console.error("Admin orders fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch orders" },
//       { status: 500 }
//     );
//   }
// }






import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectToDB } from "@/lib/db/connect";

export async function GET() {
  try {
    await connectToDB();

    const orders = await Order.find()
      .populate({
        path: "user",
        select: "name email phone",
      })
      .sort({ createdAt: -1 })
      .lean();

    const enhancedOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
      details: {
        studentName: order.details?.studentName || "Not provided",
        matricNumber: order.details?.matricNumber || "Not provided",
        courseCode: order.details?.courseCode || "Not provided",
        assignmentQuestion: order.details?.assignmentQuestion || "",
        pages: order.details?.pages || 0,
        handwrittenRequired: order.details?.handwrittenRequired || false,
        formatting: order.details?.formatting || "",
        deadline: order.details?.deadline || null,
        specialInstructions: order.details?.specialInstructions || "",
        attachments: order.details?.attachments || [],
        printType: order.details?.printType || "",
        copies: order.details?.copies || 1,
        bindingType: order.details?.bindingType || "",
        urgency: order.details?.urgency || "standard",
        deliveryFormat: order.details?.deliveryFormat || "",
        repDetails: order.details?.repDetails || null,
      },
    }));

    return NextResponse.json(enhancedOrders);
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}