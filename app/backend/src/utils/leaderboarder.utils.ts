import MatchModel from '../database/models/MatchModel';
import ILeaderboard from '../interfaces/ILeaderboard.interface';

const response = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

const teamsMath = (matches: MatchModel[], id: number, teamName: string): ILeaderboard => (
  matches.reduce((acc: ILeaderboard, cur: MatchModel): ILeaderboard => {
    acc.totalGames += 1;
    acc.name = teamName;
    if (cur.homeTeam === id) {
      if (cur.homeTeamGoals > cur.awayTeamGoals) acc.totalVictories += 1;
      acc.goalsFavor += cur.homeTeamGoals;
      acc.goalsOwn += cur.awayTeamGoals;
    }
    if (cur.awayTeam === id) {
      if (cur.homeTeamGoals < cur.awayTeamGoals) acc.totalVictories += 1;
      acc.goalsFavor += cur.awayTeamGoals;
      acc.goalsOwn += cur.homeTeamGoals;
    }
    if (cur.homeTeamGoals === cur.awayTeamGoals) acc.totalDraws += 1;
    return acc;
  }, { ...response }));

const teamsBalance = (leaderboards: ILeaderboard): void => {
  const lb = leaderboards;
  lb.goalsBalance = lb.goalsFavor - lb.goalsOwn;
  lb.totalLosses = lb.totalGames - lb.totalVictories - lb.totalDraws;
  lb.totalPoints = lb.totalVictories * 3 + lb.totalDraws;
  lb.efficiency = ((lb.totalPoints / (lb.totalGames * 3)) * 100).toFixed(2);
};

const sortTeams = (leaderboard: ILeaderboard[]): void => {
  leaderboard.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));
};

export default { teamsMath, teamsBalance, sortTeams };
