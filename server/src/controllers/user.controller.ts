import { Request, Response } from 'express';
import { omit } from 'lodash';

import userModel from '../models/user.model';

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    var id: string = req.params.id;

    await userModel
      .findByIdAndUpdate(
        id,
        { avatarImage: req.body.avatarImage, isAvatarImageSet: true },
        { new: true }
      )
      .then((doc) => {
        res.status(200).json({
          status: true,
          message: 'Avatar image set',
          data: { image: doc?.toJSON().avatarImage },
        });
      });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
