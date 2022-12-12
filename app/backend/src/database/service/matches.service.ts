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

export default { getAll, filterByProgress };
