import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../app/utils/catchAsync';
import User from '../app/modules/user/user.model';

const verifyUser = () => {
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
    req.user = user;
    next();
  });
};

export default verifyUser;
