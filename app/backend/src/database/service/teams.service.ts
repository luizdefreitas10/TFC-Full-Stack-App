import TeamModel from '../models/TeamModel';

const getAll = async ()
:Promise<{ status: number | null, message: { id: number, teamName: string }[] }> => {
  const teams = await TeamModel.findAll();
  return { status: null, message: teams };
};

export default { getAll };
