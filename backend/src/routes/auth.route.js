import express from 'express';

const router=express.Router();
import {login, signup, logout,updateProfile,checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.put('/updateProfile',protectRoute,updateProfile)
router.get('/checkAuth',protectRoute,checkAuth);
export default router;