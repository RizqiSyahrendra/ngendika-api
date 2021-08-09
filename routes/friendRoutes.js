import express from 'express';
import {jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    addFriend, removeFriend,
    getFriendRequest
} from '../controller/friendController.js';

const router = express.Router();

router.post('/add', [jwtTokenMiddleware], addFriend);   
router.delete('/remove', [jwtTokenMiddleware], removeFriend);   
router.get('/request', [jwtTokenMiddleware], getFriendRequest);   

export default router;