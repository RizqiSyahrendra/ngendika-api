import express from 'express';
import {apiTokenMiddleware,jwtTokenMiddleware} from '../middleware/authMiddleware.js';
import { 
    login, register, verify, 
    logout, sendVerification, getUser, updateUser, updatePassword
} from '../controller/authController.js';
import upload from '../helper/upload.js';

const router = express.Router();

router.post('/register', [apiTokenMiddleware], register);
router.get('/verify', verify);
router.post('/login', [apiTokenMiddleware], login);
router.post('/logout', [jwtTokenMiddleware], logout);
router.post('/send-verification', [jwtTokenMiddleware], sendVerification);
router.post('/get-user', [jwtTokenMiddleware], getUser);
router.put('/update-user', [upload.single('avatar'), jwtTokenMiddleware], updateUser);
router.put('/update-pw', [jwtTokenMiddleware], updatePassword);

export default router;