import { Request, Response } from 'express';
import { omit } from 'lodash';

import { createUser } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).send(omit(user.toJSON(), 'password'));
  } catch (err: any) {
    console.log('registration err due to ', err.message);
    return res.status(409).send(err.message);
  }
};
