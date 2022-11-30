import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

import ILogin from '../../interfaces/ILogin.interface';

import UserModel from '../models/UserModel';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const login = async (user: ILogin): Promise<{ status: number | null, message: string }> => {
  if (!user.email || !user.password) {
    return {
      status: 400,
      message: 'All fields must be filled',
    };
  }
  const response = await UserModel.findOne({ where: { email: user.email } });
  if (!response || !compareSync(user.password, response.password)) {
    return { status: 401, message: 'Incorrect email or password' };
  }

  const { password, ...userWithoutPass } = response;
  const token = jwt.sign(userWithoutPass, secret);
  return { status: null, message: token };
};

// const validateLogin = async (token: string):Promise<string> => {

// };

export default { logIn: login };
