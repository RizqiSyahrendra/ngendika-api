import asyncHandler from 'express-async-handler';
import db from '../config/database.js';
import dotenv from 'dotenv';
import ESClient from '../config/elasticsearch.js';

dotenv.config();

export const addFriend = asyncHandler(async(req, res) => {
    let user_id = req.user_login.id;
    let friend_id = req.body.friend_id;

    const availables = await db.query("select * from friends where (user_id = ? and friend_id = ?) or (user_id = ? and friend_id = ?)", [
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
    let user_id = req.user_login.id;
    let friend_id = req.body.friend_id;
    
    const deleted = await db.query("delete from friends where (user_id = ? and friend_id = ?) or (user_id = ? and friend_id = ?)", [
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
    let user_id = req.user_login.id;
    let friend_id = req.body.friend_id;

    const updated = await db.query("update friends set status=1 where user_id = ? and friend_id = ?", [
        friend_id,
        user_id
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
    let user_id = req.user_login.id;
    const friendReq = await db.query(`
        select b.id, b.email, b.name, b.avatar
        from friends a
        join users b on a.user_id = b.id
        where a.friend_id = ?
        and a.status = 0
    `, [
        user_id
    ]);

    return res.json({
        success: true, 
        message: 'get friend request success',
        data: friendReq
    });
});

export const getFriendSuggestion = asyncHandler(async(req, res) => {
    let user_id = req.user_login.id;
    let from = req.body.from;
    let size = req.body.size;

    // const friendSuggestion = await db.query(`
    //     SELECT a.id, a.email, a.name, a.avatar
    //     FROM users a
    //     LEFT JOIN friends b ON (b.user_id = ? AND b.friend_id = a.id) OR (b.user_id = a.id AND b.friend_id = ?)
    //     WHERE id <> ?
    //     AND b.status IS NULL
    //     LIMIT 5
    // `, [
    //     user_id,
    //     user_id,
    //     user_id
    // ]);

    const {body} = await ESClient.search({
        index: 'ngendika_user',
        body: {
            query: {
                bool: {
                    must_not: {
                        term: {id: user_id}
                    },
                    must: {
                        term: {status: 1}
                    }
                }
            },
            from: from,
            size: size
        }
    });

    return res.json({
        success: true, 
        message: 'get friend suggestion success',
        data: [...body.hits.hits].map(x => x._source)
    });
});

export const getFriends = asyncHandler(async(req, res) => {
    let user_id = req.user_login.id;

    const friends = await db.query(`
        SELECT b.id, b.email, b.name, b.avatar, if(a.user_id = ?, a.unread_user, a.unread_friend) as unread_chat
        FROM friends a
        JOIN users b ON IF(a.user_id = ?, a.friend_id, a.user_id) = b.id
        WHERE a.status=1 AND (a.user_id = ? OR a.friend_id = ?)
    `, [
        user_id,
        user_id,
        user_id,
        user_id
    ]);

    return res.json({
        success: true, 
        message: 'get friends success',
        data: friends
    });
});