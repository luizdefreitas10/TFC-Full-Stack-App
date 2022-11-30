import { Router } from 'express';
import teamsController from '../controller/teams.controller';

const router = Router();

router.get('/', teamsController.getAll);

export default router;
