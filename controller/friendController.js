import asyncHandler from 'express-async-handler';
import db from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const addFriend = asyncHandler(async(req, res) => {
    let user_id = req.body.user_id;
    let friend_id = req.body.friend_id;

    const availables = await db.query("select * from friends where (user_id = ? and friend_id = ?) or (friend_id = ? and user_id = ?)", [
        user_id,
        friend_id,
        friend_id,
        user_id
    ]);

    if (availables.length > 0) {
        res.status(403);
        throw new Error('cannot add the same friend twice');
    }

    await db.query("insert into friends(user_id, friend_id, created_at) values (?, ?, now())", [
        user_id,
        friend_id
    ]);

    return res.json({
        success: true, 
        message: 'add friend success'
    });
});