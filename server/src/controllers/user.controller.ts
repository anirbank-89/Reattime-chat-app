import { Request, Response } from 'express';
import { get } from 'lodash';

import userModel from '../models/user.model';

import { allUsers } from '../services/user.service';

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

export const getContacts = async (req: Request, res: Response) => {
  const user = get(req, 'user');
  // @ts-ignore
  const userId = user._id;
  try {
    const contacts = await userModel
      .find({ _id: { $ne: userId } })
      .select(['_id', 'email', 'username', 'avatarImage']);
    return res.status(200).send({ status: true, data: contacts });
  } catch (error: any) {
    return res.status(500).send({ status: false, error: error.message });
  }
};
