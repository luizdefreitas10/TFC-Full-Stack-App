import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware';
import matchesController from '../controller/matches.controller';

const router = Router();

router.get('/', matchesController.getAll);
router.post('/', validateTokenMiddleware, matchesController.saveMatch);
router.patch('/:id/finish', matchesController.finishMatch);
router.patch('/:id', matchesController.updateMatch);

export default router;
