import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing!');
  }
  // Bearer stringToken
  const [Bearer, token] = authHeader.split(' ');

  try {
    const { secret } = authConfig.jwt;

    if (secret) {
      const decodedToken = verify(token, secret);

      const { sub } = decodedToken as ITokenPayload;

      req.user = {
        id: sub,
      };
    }

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token!');
  }
}
