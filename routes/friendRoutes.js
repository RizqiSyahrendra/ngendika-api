import express from 'express';
import {jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    addFriend
} from '../controller/friendController.js';

const router = express.Router();

router.post('/add', [jwtTokenMiddleware], addFriend);   

export default router;