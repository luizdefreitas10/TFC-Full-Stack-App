import { Request, Response } from 'express';
import * as teamsService from '../database/service/teams.service';

const getAll = async (req: Request, res: Response) => {
  const { status, message } = await teamsService.default.getAll();
  if (status) {
    res.status(status).json({ message });
  }
  res.status(200).json(message);
};

export default { getAll };
