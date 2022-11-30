import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decoded = jwt.verify(token, secret);
  req.body.user = decoded;
  next();
};

export default validateTokenMiddleware;
