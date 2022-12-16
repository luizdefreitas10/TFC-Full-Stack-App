import TeamModel from '../models/TeamModel';

const getAll = async ()
:Promise<{ status: number | null, message: { id: number, teamName: string }[] }> => {
  const teams = await TeamModel.findAll();
  return { status: null, message: teams };
};

const getTeamById = async (id: number)
:Promise<{ status: number | null, message: { id: number, teamName: string } | null | string }> => {
  const team = await TeamModel.findByPk(id);
  if (!team) return { status: 404, message: 'There is no team with such id!' };
  return { status: null, message: team };
};

export default { getAll, getTeamById };
