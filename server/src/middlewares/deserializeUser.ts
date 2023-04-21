import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';

import { decode } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../services/auth.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.x-access-token', '')
    .toString()
    .replace(/^Bearer\s/, '');

  const refreshToken = get(req, 'headers.x-refresh', '')
    .toString()
    .replace(/^Bearer\s/, '');

  if (!accessToken) return next();

  const { expired, decoded } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader('x-access-token', newAccessToken);

      const { decoded } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
