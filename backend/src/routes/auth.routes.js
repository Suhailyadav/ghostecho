import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controllers.js';
import verifyJWT from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



export default router