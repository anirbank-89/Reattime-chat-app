import mongoose, { ObjectId } from 'mongoose';

export interface MessageDocument extends mongoose.Document {
  message: string;
  users: Array<any>;
  sender: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MESSAGE_SCHEMA = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model<MessageDocument>('message', MESSAGE_SCHEMA);

export default messageModel;
