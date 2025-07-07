import express from 'express';
import verifyJWT from '../middlewares/auth.middlewares.js';
import { getMessagesBetweenUsers, sendMessage } from '../controllers/message.controllers.js';


const router = express.Router();
router.post('/', verifyJWT, sendMessage);
router.get('/:userId', verifyJWT, getMessagesBetweenUsers);

export default router;

