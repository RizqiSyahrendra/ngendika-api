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

    return res.status(201).json({
        success: true, 
        message: 'add friend success'
    });
});

export const removeFriend = asyncHandler(async(req, res) => {
    let user_id = req.body.user_id;
    let friend_id = req.body.friend_id;

    const deleted = await db.query("delete from friends where (user_id = ? and friend_id = ?) or (friend_id = ? and user_id = ?)", [
        user_id,
        friend_id,
        friend_id,
        user_id
    ]);

    if (deleted.affectedRows <= 0) {
        res.status(404);
        throw new Error('friends not found');
    }

    return res.json({
        success: true, 
        message: 'remove friend success'
    });
});

export const confirmFriend = asyncHandler(async(req, res) => {
    let user_id = req.body.user_id;
    let friend_id = req.body.friend_id;

    const updated = await db.query("update friends set status=1 where user_id = ? and friend_id = ?", [
        user_id,
        friend_id
    ]);

    if (updated.affectedRows <= 0) {
        res.status(404);
        throw new Error('friends not found');
    }

    return res.json({
        success: true, 
        message: 'confirm friend success'
    });
});

export const getFriendRequest = asyncHandler(async(req, res) => {
    let user_id = req.body.user_id;
    const friendReq = await db.query(`
        select *
        from friends
        where friend_id = ?
        and status = 0
    `, [
        user_id
    ]);

    return res.json({
        success: true, 
        message: 'get friend request success',
        data: friendReq
    });
});