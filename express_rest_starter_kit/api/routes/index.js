import express from 'express';
const router=express.Router();

import { registerController,loginController,whoamiController,refreshController, productController } from '../controllers';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

// Auth Routes
router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/whoami',auth,whoamiController.me);
router.post('/refresh',refreshController.refresh);
router.post('/logout',auth,loginController.logout);

// Product Routes CRUD
// passing more than one middleware are executed sequentially a/c to the index if passed as array.
router.get('/products',productController.getall);
router.get('/products/:id',productController.getsingle);
router.post('/products',[auth,admin],productController.store);
router.put('/products/:id',[auth,admin],productController.update);
router.delete('/products/:id',[auth,admin],productController.remove);



export default router;
