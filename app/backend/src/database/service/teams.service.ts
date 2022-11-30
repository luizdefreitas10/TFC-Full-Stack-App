import TeamModel from '../models/TeamModel';

const getAll = async ()
:Promise<{ status: number | null, message: { id: number, teamName: string }[] }> => {
  const teams = await TeamModel.findAll();
  return { status: null, message: teams };
};
const getTeamById = async (id: number)
:Promise<{ status: number | null, message: { id: number, teamName: string } | null }> => {
  const team = await TeamModel.findByPk(id);
  return { status: null, message: team };
};

export default { getAll, getTeamById };
