import { Router } from 'express';
import userController from '../controller/user.controller';

const router = Router();

router.post('/login', userController.logIn);

export default router;
