import express from 'express';
import {jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    insertChat, getChats
} from '../controller/chatController.js';

const router = express.Router();

router.post('/add', [jwtTokenMiddleware], insertChat);   
router.post('/', [jwtTokenMiddleware], getChats);   

export default router;