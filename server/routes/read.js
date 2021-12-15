const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/boardId',(req, res)=>{
    const sql = 'SELECT MAX(BoardId)AS max_id FROM board'
    db.query(sql,(err, result)=>{
        if(!err){
            res.send(result[0]);
        }else res.send('error');
    } )
})
module.exports = router;