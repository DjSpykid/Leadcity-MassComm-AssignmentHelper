import mongoose, { Schema, Document } from 'mongoose';

interface Order extends Document {
  assignmentId: mongoose.Types.ObjectId;
  studentName: string;
  status: string;
  completedAt?: Date;
  createdAt: Date;
}

const OrderSchema = new Schema<Order>({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentName: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);
