import express from 'express';
import {jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    addFriend, removeFriend,
    confirmFriend, getFriendRequest,
    getFriendSuggestion, getFriends
} from '../controller/friendController.js';

const router = express.Router();

router.post('/add', [jwtTokenMiddleware], addFriend);   
router.put('/confirm', [jwtTokenMiddleware], confirmFriend);   
router.delete('/remove', [jwtTokenMiddleware], removeFriend);   
router.post('/request', [jwtTokenMiddleware], getFriendRequest);   
router.post('/suggestion', [jwtTokenMiddleware], getFriendSuggestion);   
router.post('/', [jwtTokenMiddleware], getFriends);   

export default router;