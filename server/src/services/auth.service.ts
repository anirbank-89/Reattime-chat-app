import { ObtainDocumentType, FlattenMaps, Types } from 'mongoose';
import { omit, get } from 'lodash';
import dotenv from 'dotenv';
dotenv.config();

import userModel, { UserDocument } from '../models/user.model';
import { sign, decode } from '../utils/jwt.utils';

export async function createUser(input: ObtainDocumentType<UserDocument>) {
  try {
    return await userModel.create(input);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function validateCredentials({
  usernameOrEmail,
  pwd,
}: {
  usernameOrEmail: string;
  pwd: string;
}) {
  let user;
  user = await userModel.findOne({ username: usernameOrEmail });

  if (!user) {
    user = await userModel.findOne({ email: usernameOrEmail });

    if (!user) {
      return false;
    }
  }

  const isPwdValid = await user.comparePassword(pwd);

  if (!isPwdValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
}

export function createAccessToken(
  user:
    | Omit<UserDocument, 'password'>
    | Pick<
        FlattenMaps<
          UserDocument & {
            _id: Types.ObjectId;
          }
        >,
        'username' | 'email'
      >
) {
  const accessToken = sign(user, {
    expiresIn: Number(process.env.ACCESS_TOKEN_TTL),
  });

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  const user = await userModel.findById(get(decoded, '_id'));

  if (!user) return false;

  const accessToken = createAccessToken(omit(user.toJSON(), 'password'));

  return accessToken;
}
