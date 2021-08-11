import express from 'express';
import {jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    insertChat, getChats, updateUnread
} from '../controller/chatController.js';

const router = express.Router();

router.post('/add', [jwtTokenMiddleware], insertChat);   
router.post('/', [jwtTokenMiddleware], getChats);   
router.put('/update-unread', [jwtTokenMiddleware], updateUnread);   

export default router;