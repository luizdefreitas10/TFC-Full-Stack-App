import { Request, Response } from 'express';
import * as matchesService from '../database/service/matches.service';

const getAll = async (_req: Request, res: Response) => {
  const { status, message } = await matchesService.default.getAll();
  if (status) return res.status(status).json({ message });
  res.status(200).json(message);
};

export default { getAll };
