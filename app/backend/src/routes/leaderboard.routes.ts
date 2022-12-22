import { Router } from 'express';
import * as leaderboardController from '../controller/leaderboard.controller';

const router = Router();

router.get('/', leaderboardController.default.getLb);
router.get('/home', leaderboardController.default.getHomeLb);
router.get('/away', leaderboardController.default.getAwayLb);

export default router;
