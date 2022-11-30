import { Router } from 'express';
import userController from '../controller/user.controller';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware';

const router = Router();

router.get('/validate', validateTokenMiddleware, userController.getRole);
router.post('/', userController.logIn);

export default router;
