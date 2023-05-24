import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Services
import { storeMessage, fetchMessages } from '../services/message.service';

export const addMessage = async (req: Request, res: Response) => {
  try {
    const { from, to, message } = req.body;

    await storeMessage({
      message: message,
      users: [
        new mongoose.Types.ObjectId(from),
        new mongoose.Types.ObjectId(to),
      ],
      sender: from,
    }).then((doc) => {
      res.status(201).json({
        status: true,
        message: 'Message saved successfully',
        data: doc,
      });
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.body;

    await fetchMessages(from, to).then((docs) => {
      if (docs) {
        // console.log(docs);
        return res.status(200).send(
          docs.map((msg) => {
            return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message,
            };
          })
        );
      } else {
        return res.status(404).send({ message: 'No messages were found' });
      }
      // res.status(200).json({
      //   status: true,
      //   message: 'Messages get successfully',
      //   data: docs,
      // });
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
