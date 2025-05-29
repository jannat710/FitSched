import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../app/utils/catchAsync';
import { TUserRole } from '../app/modules/user/user.interface';
import User from '../app/modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized!');
    }

    const decoded = jwt.verify(token, 'secret') as JwtPayload;

    const { role, email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized');
    }

    req.user = user;
    next();
  });
};

export default auth;
