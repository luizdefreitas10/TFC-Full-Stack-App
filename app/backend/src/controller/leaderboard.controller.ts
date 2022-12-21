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
    const filteredMatches = matches.filter(({ homeTeam, awayTeam, inProgress }) => {
      const response = inProgress ? false : homeTeam === id || awayTeam === id;
      console.log(response);
      return response;
    });
    const matchData = leaderboardUtils.default.teamsMath(filteredMatches, id, teamName);
    leaderboardUtils.default.teamsBalance(matchData);
    lb.push(matchData);
  });
  leaderboardUtils.default.sortTeams(lb);
  res.status(200).json(lb);
};

export default { getLb };
