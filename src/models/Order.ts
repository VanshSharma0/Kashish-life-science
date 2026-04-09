import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }>;
  totalAmount: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: 'pending' | 'paid' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
  }],
  totalAmount: { type: Number, required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
}, {
  timestamps: true
});

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
