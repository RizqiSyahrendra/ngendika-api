import express from 'express';
import {jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    addFriend, removeFriend,
    confirmFriend, getFriendRequest,
    getFriendSuggestion
} from '../controller/friendController.js';

const router = express.Router();

router.post('/add', [jwtTokenMiddleware], addFriend);   
router.put('/confirm', [jwtTokenMiddleware], confirmFriend);   
router.delete('/remove', [jwtTokenMiddleware], removeFriend);   
router.get('/request', [jwtTokenMiddleware], getFriendRequest);   
router.get('/suggestion', [jwtTokenMiddleware], getFriendSuggestion);   

export default router;