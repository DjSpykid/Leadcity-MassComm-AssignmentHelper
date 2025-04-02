
// // models/Order.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IOrder extends Document {
//   serviceType: string;
//   details: {
//     studentName: string;
//     matricNumber: string;
//     courseCode: string;
//     printType?: string;
//     copies?: number;
//     doubleSided?: boolean;
//     handwrittenRequired?: boolean;
//     handwritingInstructions?: string;
//     bindingType?: string;
//     assignmentQuestion?: string;
//     pages?: number;
//     formatting?: string;
//     urgency?: string;
//     deliveryFormat?: string;
//     selectedRep: string;
//     repDetails?: any;
//     specialInstructions?: string;
//     deadline: Date;
//     attachments: string[];
//   };
//   price: number;
//   user: mongoose.Schema.Types.ObjectId;
//   status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
//   createdAt: Date;
//   updatedAt: Date;
// }

// const OrderSchema = new Schema<IOrder>(
//   {
//     serviceType: { type: String, required: true },
//     details: {
//       studentName: { type: String, required: true },
//       matricNumber: { type: String, required: true },
//       courseCode: { type: String, required: true },
//       printType: { type: String },
//       copies: { type: Number },
//       doubleSided: { type: Boolean },
//       handwrittenRequired: { type: Boolean },
//       handwritingInstructions: { type: String },
//       bindingType: { type: String },
//       assignmentQuestion: { type: String },
//       pages: { type: Number },
//       formatting: { type: String },
//       urgency: { type: String },
//       deliveryFormat: { type: String },
//       selectedRep: { type: String, required: true },
//       repDetails: { type: Schema.Types.Mixed },
//       specialInstructions: { type: String },
//       deadline: { type: Date, required: true },
//       attachments: { type: [String], default: [] },
//     },
//     price: { type: Number, required: true },
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     status: {
//       type: String,
//       enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
//       default: 'PENDING',
//     },
//   },
//   { timestamps: true }
// );

// // Clear existing model if it exists
// if (mongoose.models.Order) {
//   delete mongoose.models.Order;
// }

// export default mongoose.model<IOrder>('Order', OrderSchema);





import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  serviceType: string;
  details: {
    studentName: string;
    matricNumber: string;
    courseCode: string;
    printType?: string;
    copies?: number;
    doubleSided?: boolean;
    handwrittenRequired?: boolean;
    handwritingInstructions?: string;
    bindingType?: string;
    assignmentQuestion?: string;
    pages?: number;
    formatting?: string;
    urgency?: string;
    deliveryFormat?: string;
    selectedRep: string;
    repDetails?: any;
    specialInstructions?: string;
    deadline: Date;
    attachments: string[];
  };
  price: number;
  user: mongoose.Schema.Types.ObjectId;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "SUBMITTED";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    serviceType: { type: String, required: true },
    details: {
      studentName: { type: String, required: true },
      matricNumber: { type: String, required: true },
      courseCode: { type: String, required: true },
      printType: { type: String },
      copies: { type: Number },
      doubleSided: { type: Boolean },
      handwrittenRequired: { type: Boolean },
      handwritingInstructions: { type: String },
      bindingType: { type: String },
      assignmentQuestion: { type: String },
      pages: { type: Number },
      formatting: { type: String },
      urgency: { type: String },
      deliveryFormat: { type: String },
      selectedRep: { type: String, required: true },
      repDetails: { type: Schema.Types.Mixed },
      specialInstructions: { type: String },
      deadline: { type: Date, required: true },
      attachments: { type: [String], default: [] },
    },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED", "SUBMITTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export default mongoose.model<IOrder>("Order", OrderSchema);