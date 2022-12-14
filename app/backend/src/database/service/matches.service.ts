import IMatch from '../../interfaces/IMatch.interface';
import MatchModel from '../models/MatchModel';
import Team from '../models/TeamModel';

const getAll = async () : Promise<{ status: number | null, message: MatchModel[] }> => {
  const match = await MatchModel.findAll({
    include: [{
      model: Team, as: 'teamHome',
    },
    {
      model: Team, as: 'teamAway',
    }],
  });
  return { status: null, message: match };
};

const filterByProgress = async (query: boolean)
:Promise<{ status: number | null, message: MatchModel[] }> => {
  const filtered = await MatchModel.findAll({
    where: { inProgress: query },
    include: [{
      model: Team, as: 'teamHome',
    },
    {
      model: Team, as: 'teamAway',
    }],
  });
  return { status: null, message: filtered };
};

const saveMatch = async (match: IMatch): Promise<{ status: number | null, message: IMatch }> => {
  const { id } = await MatchModel.create({ ...match, inProgress: true });
  return { status: null, message: { id, ...match, inProgress: true } };
};

export default { getAll, filterByProgress, saveMatch };
