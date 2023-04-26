import { Request, Response } from 'express';
import { omit } from 'lodash';
import dotenv from 'dotenv';
dotenv.config();

import {
  createUser,
  validateCredentials,
  createAccessToken,
} from '../services/auth.service';
import { sign } from '../utils/jwt.utils';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    // create access token - service
    const accessToken = createAccessToken(
      omit(user.toJSON(), ['password', 'avatarImage'])
    ); // { user, session }

    // create refresh token - utils
    const refreshToken = sign(
      omit(user.toJSON(), ['password', 'avatarImage']),
      {
        expiresIn: 60, // Number(process.env.REFRESH_TOKEN_TTL),
      }
    );

    return res.status(201).send({
      accessToken,
      refreshToken,
      userDetails: omit(user.toJSON(), 'password'),
    });
  } catch (err: any) {
    console.log('registration err due to ', err.message);
    return res.status(409).send(err.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // validate login credentials - service
    const user = await validateCredentials({
      usernameOrEmail: req.body.usernameOrEmail,
      pwd: req.body.password,
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: 'Invalid email or password.' });
    }
    // create a session - service

    // create access token - service
    const accessToken = createAccessToken(omit(user, 'avatarImage')); // { user, session }

    // create refresh token - utils
    const refreshToken = sign(omit(user, 'avatarImage'), {
      expiresIn: 60, // Number(process.env.REFRESH_TOKEN_TTL),
    });

    // send access and refresh token back
    res.status(200).json({ accessToken, refreshToken, userDetails: user });
  } catch (err: any) {
    console.log('Login error due to ', err.message);

    return res.status(500).send({ error: err.message });
  }
};
