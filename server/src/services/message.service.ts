import mongoose, { ObtainDocumentType } from 'mongoose';

import messageModel, { MessageDocument } from '../models/message.model';

export async function storeMessage(input: ObtainDocumentType<MessageDocument>) {
  try {
    return await messageModel.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchMessages(from: string, to: string) {
  try {
    return await messageModel
      .find({
        users: {
          $all: [
            new mongoose.Types.ObjectId(from),
            new mongoose.Types.ObjectId(to),
          ],
        },
      })
      .sort({ updatedAt: 1 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
