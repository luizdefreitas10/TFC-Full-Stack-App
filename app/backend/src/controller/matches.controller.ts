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

const saveMatch = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  const { status, message } = await matchesService.default.saveMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  });
  if (status) return res.status(status).json({ message });
  return res.status(201).json(message);
};

const finishMatch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status, message } = await matchesService.default.finishMatch(id);
  if (status) return res.status(status).json({ message });
  return res.status(200).json({ message });
};

export default { getAll, saveMatch, finishMatch };
