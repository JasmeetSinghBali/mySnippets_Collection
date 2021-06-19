import express from 'express';
const router=express.Router();

import { registerController,loginController,whoamiController,refreshController, productController } from '../controllers';
import auth from '../middlewares/auth';

// Auth Routes
router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/whoami',auth,whoamiController.me);
router.post('/refresh',refreshController.refresh);
router.post('/logout',auth,loginController.logout);

// Product Routes CRUD
router.post('/products',productController.store);

export default router;
