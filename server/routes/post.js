const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/write', (req, res) => {
    
    const board_id = req.body.board_id
    const user_nickname = req.body.user_nickname;
    const board_title = req.body.board_title;
    const board_content = req.body.board_content;
    const createDate = req.body.date;
    const updateDate = null;
    const tag = req.body.tag===''?null:req.body.tag;
    const param = [board_id,board_title, board_content, createDate, updateDate, user_nickname, tag]
            const sql = 'INSERT INTO nayuntech.board(BoardId, BoardTitle,BoardContent,CreateDate, UpdateDate, UserNickName, Tag)VALUES(?,?,?,?,?,?,?)'
            db.query(sql, param, (error, result)=>{
                if(!error)res.send('등록완료');
                else res.send(error);
            })
            
        })
        router.post('/update', (req, res) => {
            const board_id = req.body.board_id
            const board_title = req.body.board_title;
            const board_content = req.body.board_content;
            const update_date = req.body.date;
            const tag = req.body.tag===''?null:req.body.tag;
            const param =  [board_title, board_content, update_date, tag, board_id];
            
        
                    const sql = 'UPDATE board SET BoardTitle=?, BoardContent=?, UpdateDate=?, Tag=? WHERE BoardId=?';
                    db.query(sql, param, (error, result)=>{
                        if(!error){
                            if(result!==null)
                            res.send('수정이 완료되었습니다');
                            
                        }
                        else res.send('오류');
                    })
                    
                })
        
                router.get('/select',(req, res)=>{
                    const board_id = req.query.board_id;
                    const sql = 'SELECT * FROM board WHERE BoardId=?'
                    db.query(sql, [board_id],(err, result)=>{
                        if(!err){
                            res.send(result);
                        }else res.send('error');
                    } )
                })
                router.post('/delete',(req, res)=>{
                    const board_id = req.body.board_id;
                    const sql = 'DELETE FROM board WHERE BoardId=?'
                    db.query(sql,[board_id],(err, result)=>{
                        if(!err){
                            res.send('제거완료');
                        }else res.send('error');
                    } )
                })
module.exports = router;