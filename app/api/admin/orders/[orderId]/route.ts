


import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectToDB } from "@/lib/db/connect";

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    await connectToDB();

    const order = await Order.findById(params.orderId)
      .populate("user", "name email phone")
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Transform the data to ensure all fields are present
    const enhancedOrder = {
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
    };

    return NextResponse.json(enhancedOrder);
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    await connectToDB();

    const { status, adminNotes } = await request.json();

    const validStatuses = [
      "PENDING",
      "PROCESSING",
      "COMPLETED",
      "CANCELLED",
      "SUBMITTED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updateData: unknown  = { status };
    if (adminNotes) updateData.adminNotes = adminNotes;

    const updatedOrder = await Order.findByIdAndUpdate(
      params.orderId,
      updateData,
      { new: true }
    )
      .populate("user", "name email phone")
      .lean();

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...updatedOrder,
      _id: updatedOrder._id.toString(),
      details: {
        ...updatedOrder.details,
        studentName: updatedOrder.details?.studentName || "Not provided",
        matricNumber: updatedOrder.details?.matricNumber || "Not provided",
      },
    });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import Order from "@/models/Order";
// import { connectToDB } from "@/lib/db/connect";

// // Type definitions remain the same as before
// type UserData = {
//   name: string;
//   email: string;
//   phone: string;
//   _id: string;
// };

// type RepDetails = {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
// } | null;

// type OrderDetails = {
//   studentName: string;
//   matricNumber: string;
//   courseCode: string;
//   assignmentQuestion?: string;
//   pages?: number;
//   handwrittenRequired?: boolean;
//   formatting?: string;
//   deadline?: string | null;
//   specialInstructions?: string;
//   attachments?: string[];
//   printType?: string;
//   copies?: number;
//   bindingType?: string;
//   urgency?: string;
//   deliveryFormat?: string;
//   repDetails?: RepDetails;
// };

// type OrderStatus =
//   | "PENDING"
//   | "PROCESSING"
//   | "COMPLETED"
//   | "CANCELLED"
//   | "SUBMITTED";

// interface OrderDocument {
//   _id: string;
//   serviceType: string;
//   status: OrderStatus;
//   price: number;
//   createdAt: Date;
//   user?: UserData;
//   details?: OrderDetails;
//   adminNotes?: string;
// }

// interface EnhancedOrder extends Omit<OrderDocument, "_id" | "createdAt"> {
//   _id: string;
//   createdAt: string;
//   details: OrderDetails;
// }

// interface UpdateOrderRequest {
//   status: OrderStatus;
//   adminNotes?: string;
// }

// // For App Router, we use this syntax
// export async function GET(
//   request: Request,
//   { params }: { params: { orderId: string } }
// ) {
//   try {
//     await connectToDB();

//     const order = await Order.findById(params.orderId)
//       .populate("user", "name email phone")
//       .lean();

//     if (!order) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 });
//     }

//     const enhancedOrder: EnhancedOrder = {
//       ...order,
//       _id: order._id.toString(),
//       createdAt: order.createdAt.toISOString(),
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
//     };

//     return NextResponse.json(enhancedOrder);
//   } catch (error) {
//     console.error("Order fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch order" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { orderId: string } }
// ) {
//   try {
//     await connectToDB();

//     const { status, adminNotes }: UpdateOrderRequest = await request.json();

//     const validStatuses: OrderStatus[] = [
//       "PENDING",
//       "PROCESSING",
//       "COMPLETED",
//       "CANCELLED",
//       "SUBMITTED",
//     ];

//     if (!validStatuses.includes(status)) {
//       return NextResponse.json(
//         { error: "Invalid status value" },
//         { status: 400 }
//       );
//     }

//     const updateData: Partial<UpdateOrderRequest> = { status };
//     if (adminNotes) updateData.adminNotes = adminNotes;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       params.orderId,
//       updateData,
//       { new: true }
//     )
//       .populate("user", "name email phone")
//       .lean();

//     if (!updatedOrder) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       ...updatedOrder,
//       _id: updatedOrder._id.toString(),
//       details: {
//         ...updatedOrder.details,
//         studentName: updatedOrder.details?.studentName || "Not provided",
//         matricNumber: updatedOrder.details?.matricNumber || "Not provided",
//       },
//     });
//   } catch (error) {
//     console.error("Order update error:", error);
//     return NextResponse.json(
//       { error: "Failed to update order" },
//       { status: 500 }
//     );
//   }
// }