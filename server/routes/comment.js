const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/create', (req, res) => {
    const comment_id = req.body.comment_id
    const user_nickname = req.body.user_nickname
    const comment_content = req.body.comment_content
    const board_id = req.body.board_id
    const createDate = req.body.date
    const param = [comment_id, comment_content, createDate, user_nickname, board_id ]
    const sql = 'INSERT INTO comment(CommentId,CommentContent,CreateDate, UserNickName, BoardId)VALUES(?,?,?,?,?)'
            
            db.query(sql, param, (error, result)=>{
                if(!error)res.send('등록이 완료되었습니다!');
                else res.send('등록실패');
            })
            
        })
        router.get('/id',(req, res)=>{
            const sql = 'SELECT MAX(CommentId)AS comment_id FROM comment'
            db.query(sql,(err, result)=>{
                if(!err){
                    res.send(result[0]);
                }else res.send('error');
            } )
        })
        router.get('/read',(req, res)=>{
            const board_id = req.query.board_id;
            const sql = 'SELECT * FROM comment WHERE BoardId=?'
            db.query(sql, [board_id],(err, result)=>{
                if(!err){
                    res.send(result);
                }else res.send('error');
            } )
        })
        router.post('/delete',(req, res)=>{
            const comment_id = req.body.comment_id;
            const sql = 'DELETE FROM comment WHERE CommentId=?'
            db.query(sql,[comment_id],(err, result)=>{
                if(!err){
                    res.send('제거완료');
                }else res.send('error');
            } )
        })
module.exports = router;