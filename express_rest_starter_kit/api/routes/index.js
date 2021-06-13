import express from 'express';
const router=express.Router();

import { registerController,loginController,whoamiController,refreshController } from '../controllers';
import auth from '../middlewares/auth';

// POST /api/register
router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/whoami',auth,whoamiController.me);
router.post('/refresh',refreshController.refresh);
router.post('/logout',auth,loginController.logout);

export default router;
