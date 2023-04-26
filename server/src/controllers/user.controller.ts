import { Request, Response } from 'express';
import { Types } from 'mongoose';

import userModel from '../models/user.model';

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    var id: string = req.params.id;

    await userModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .then((doc) => {
        res.status(200).json({
          status: true,
          message: 'Avatar image set',
          data: doc,
        });
      });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
