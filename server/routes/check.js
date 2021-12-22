const express = require('express');
const { session } = require('passport');
const router = express.Router();
const db = require('../config/db');


router.post('/email',(req, res)=> {
const sql = 'SELECT*FROM nayuntech.user WHERE UserEmail=?'
const user_email = req.body.user_email
        db.query(sql, [user_email], (err, data)=>{
            if(data.length>0){
                res.send('이미 사용중인 이메일 입니다')
            }else if (data.length===0){
                res.send('사용 가능한 이메일 입니다.')
            }
            else {
            res.send('오류')
        }
    })

})
router.get('/login',(req, res)=>{
    if(req.user) {
        res.send(req.user);
    }else{res.send(null)}
})

router.post('/nickname',(req, res)=> {
    const sql = 'SELECT*FROM nayuntech.user WHERE UserNickName=?'
    const user_nickname = req.body.user_nickname
            db.query(sql, [user_nickname], (err, data)=>{
                if(data.length>0){
                    res.send('이미 사용중인 닉네임 입니다')
                }else if (data.length===0){
                    res.send('사용 가능한 닉네임 입니다.')
                }
                else {
                res.send('오류')
            }
        })
    
    })
module.exports= router;