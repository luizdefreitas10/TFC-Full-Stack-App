import { Router } from 'express';
import * as leaderboardController from '../controller/leaderboard.controller';

const router = Router();

router.get('/', leaderboardController.default.getLb);

export default router;
