const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/result',(req, res)=>{
    const keyword =req.body.keyword;
    const sql = 'SELECT BoardId, BoardTitle, BoardContent FROM board WHERE BoardContent LIKE ? OR BoardTitle LIKE ?'
    db.query(sql, ["%"+keyword+"%","%"+keyword+"%"],(err, result)=>{
        if(!err){
            res.send(result);
        }else res.send('error');
    } )
})
module.exports = router;