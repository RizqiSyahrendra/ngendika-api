import asyncHandler from 'express-async-handler';
import db from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const insertChat = asyncHandler(async(req, res) => {
    let user_id = req.user_login.id;
    let friend_id = req.body.friend_id;
    let message = req.body.message;

   await db.query("insert into chats (user_id, friend_id, message) values (?, ?, ?)", [
        user_id,
        friend_id,
        message
    ]);

    return res.status(201).json({
        success: true, 
        message: 'chat inserted successfully'
    });
});

export const updateUnread = asyncHandler(async(req, res) => {
    let user_id = req.body.user_id;
    let unread = req.body.unread;

   await db.query("update users set unread = ? where id = ?", [
        unread,
        user_id
    ]);

    return res.status(200).json({
        success: true, 
        message: 'unread message updated successfully'
    });
});

export const getChats = asyncHandler(async(req, res) => {
    let user_id = req.user_login.id;
    let friend_id = req.body.friend_id;

    const chats = await db.query(`
        SELECT a.id,
        a.user_id,
        b.email AS user_email,
        a.message AS text,
        a.created_at
        FROM chats a
        JOIN users b ON a.user_id = b.id
        WHERE (a.user_id = ? AND a.friend_id=?) OR (a.friend_id = ? AND a.user_id = ?)
        ORDER BY a.created_at
   `, [
        user_id,
        friend_id,
        user_id,
        friend_id
    ]);

    return res.status(201).json({
        success: true, 
        message: 'get chats successfully',
        data: chats
    });
});
