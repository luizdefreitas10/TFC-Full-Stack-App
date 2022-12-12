import { Request, Response } from 'express';
import * as matchesService from '../database/service/matches.service';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const { status, message } = !inProgress
    ? await matchesService.default.getAll()
    : await matchesService.default.filterByProgress(JSON.parse(inProgress as string));
  if (status) return res.status(status).json({ message });
  res.status(200).json(message);
};

// const filterByProgress = async (req: Request, res: Response) => {
//   const { status, message } = await matchesService.default.filterByProgress(inProgress);
// };

export default { getAll };
