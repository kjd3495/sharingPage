const express = require('express');
const router = express.Router();
const db = require('../config/db');

        router.post('/result',(req, res)=>{
            const keyword =req.body.keyword;
            const sql = 'SELECT BoardId, BoardTitle, BoardContent,Tag FROM board WHERE CONCAT(",",Tag,",")LIKE ?';
            db.query(sql, ["%,"+keyword+",%"],(err, result)=>{
                if(!err){
                    let newResult = result.map((a)=>{
                        let arrTag = a.Tag.split(',');
                        let newObj = {BoardId:a.BoardId, BoardTitle:a.BoardTitle, BoardContent:a.BoardContent, Tag:arrTag};
                        return newObj;
                    })
                    res.send(newResult);
                }else res.send('error');
            })
        })
        router.get('/select',(req, res)=>{
            const board_id = req.query.board_id;
            const sql = 'SELECT Tag FROM board WHERE BoardId=?'
            db.query(sql, [board_id],(err, result)=>{
                if(!err){
                    let newResult = result[0].Tag.split(',');
                    res.send(newResult);
                }else res.send('error');
            } )
        })
module.exports = router;