import { Request, Response } from 'express';
import * as userService from '../database/service/user.service';

const login = async (req: Request, res: Response) => {
  const { status, message } = await userService.default.logIn(req.body);
  if (status) {
    return res.status(status).json({ message });
  }
  res.status(200).json({ token: message });
};

export default { logIn: login };
