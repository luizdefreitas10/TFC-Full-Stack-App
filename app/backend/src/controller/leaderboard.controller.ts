import { Request, Response } from 'express';
import * as matchService from '../database/service/matches.service';
import * as teamService from '../database/service/teams.service';
import ILeaderboard from '../interfaces/ILeaderboard.interface';
import * as leaderboardUtils from '../utils/leaderboarder.utils';

const getLb = async (_req: Request, res: Response) => {
  const { message: teams } = await teamService.default.getAll();
  const { message: matches } = await matchService.default.getAll();
  const lb: ILeaderboard[] = [];
  teams.forEach(({ id, teamName }) => {
    const filteredMatches = leaderboardUtils.default.matchFilter(matches, id, null);
    const matchData = leaderboardUtils.default.teamsMath(filteredMatches, id, teamName);
    leaderboardUtils.default.teamsBalance(matchData);
    lb.push(matchData);
  });
  leaderboardUtils.default.sortTeams(lb);
  res.status(200).json(lb);
};

const getHomeLb = async (_req: Request, res: Response) => {
  const { message: teams } = await teamService.default.getAll();
  const { message: matches } = await matchService.default.getAll();
  const lb: ILeaderboard[] = [];
  teams.forEach(({ id, teamName }) => {
    const matchData = leaderboardUtils.default.matchFilter(matches, id, 'home');
    const result = leaderboardUtils.default.teamsMath(matchData, id, teamName);
    leaderboardUtils.default.teamsBalance(result);
    lb.push(result);
  });
  leaderboardUtils.default.sortTeams(lb);
  res.status(200).json(lb);
};

const getAwayLb = async (_req: Request, res: Response) => {
  const { message: teams } = await teamService.default.getAll();
  const { message: matches } = await matchService.default.getAll();
  const lb: ILeaderboard[] = [];
  teams.forEach(({ id, teamName }) => {
    const matchData = leaderboardUtils.default.matchFilter(matches, id, 'away');
    const result = leaderboardUtils.default.teamsMath(matchData, id, teamName);
    leaderboardUtils.default.teamsBalance(result);
    lb.push(result);
  });
  leaderboardUtils.default.sortTeams(lb);
  res.status(200).json(lb);
};

export default { getLb, getHomeLb, getAwayLb };
