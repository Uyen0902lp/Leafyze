import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../helpers/jwtHelpers';
import ApiError from '../errors/ApiError';
import secret from '../config/secret';

const auth =
  (...requiredRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers?.authorization?.split(" ")?.[1];
        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        const verifiedUser = jwtHelpers.verifyToken(token, secret.jwt.secret as Secret);
        req.user = verifiedUser;

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
        next();
      } catch (error) {
        next(error);
      }
    };

export default auth;