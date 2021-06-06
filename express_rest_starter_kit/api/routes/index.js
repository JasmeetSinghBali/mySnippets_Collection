import express from 'express';
const router=express.Router();

import { registerController } from '../controllers';

// POST /api/register
router.post('/register',registerController.register);

export default router;
