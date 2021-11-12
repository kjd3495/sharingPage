const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/register', (req, res) => {
    const user_email = req.body.user_email
    const user_nickname = req.body.user_nickname
    const user_pw = req.body.user_pw
    const user_organ= req.body.user_organ
    const user_name = req.body.user_name
    const user_date = new Date()
    const user_adminAuth = false
    const param = [user_email, user_nickname, user_pw, user_organ, user_name,user_adminAuth,user_date]

const sql = 'INSERT INTO nayuntech.user(UserEmail,UserNickName,UserPassword, UserOrgan, UserName, UserAdminAuth,CreateDate)VALUES(?,?,?,?,?,?,?)'
   
    db.query(sql, param, (err,result)=>{
        if(err) console.log(err)
    })
    res.send(user_email)
})

module.exports = router;
