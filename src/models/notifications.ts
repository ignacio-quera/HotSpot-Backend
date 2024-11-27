import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for TypeScript
interface INotification extends Document {
  user: mongoose.Types.ObjectId; // Reference to the user receiving the notification
  event: mongoose.Types.ObjectId | null; // Reference to an event (optional)
  type: string; // Type of notification (e.g., "like", "comment", "reminder")
  message: string; // Main content of the notification
  data: object; // Additional data (e.g., event details, links)
  isRead: boolean; // Status of the notification
  createdAt: Date; // Timestamp
  updatedAt: Date; // Timestamp
}

// Define the Mongoose schema
const NotificationSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', default: null },
    type: { type: String, required: true, enum: ['like', 'comment', 'reminder', 'system'] },
    message: { type: String, required: true },
    data: { type: Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>('Notification', NotificationSchema);
