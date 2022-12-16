import { Request, Response } from 'express';
import matchSchema from '../validations/match.schema';
import * as matchesService from '../database/service/matches.service';
import * as teamsService from '../database/service/teams.service';

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
  const { error } = matchSchema.validate({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
  if (error) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const team1 = await teamsService.default.getTeamById(homeTeam);
  const team2 = await teamsService.default.getTeamById(awayTeam);
  if (team1.status || team2.status) {
    return res.status(team1.status as number).json({ message: team1.message });
  }

  const { status, message } = await matchesService.default
    .saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
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
