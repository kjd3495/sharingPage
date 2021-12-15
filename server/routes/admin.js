const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt')
const saltRounds=10

router.post('/create', (req, res) => {
    const user_email = req.body.user_email
    const user_nickname = req.body.user_nickname
    const user_pw = req.body.user_pw
    const user_organ= req.body.user_organ
    const user_name = req.body.user_name
    const user_date = new Date()
    const user_adminAuth = req.body.user_adminAuth
    const param = [user_email, user_nickname, user_pw, user_organ, user_name,user_adminAuth,user_date]
    
    bcrypt.hash(param[2], saltRounds, (err, hash)=>{
            const sql = 'INSERT INTO nayuntech.user(UserEmail,UserNickName,UserPassword, UserOrgan, UserName, UserAdminAuth,CreateDate)VALUES(?,?,?,?,?,?,?)'
            param[2] = hash
            db.query(sql, param, (error, result)=>{
                if(!error)res.send('등록이 완료되었습니다!');
                else res.send('입력란을 다시 확인해주세요');
            })
            
        })
    })
    router.post('/delete',(req, res)=>{
        const user_email = req.body.user_email;
        const sql = 'DELETE FROM user WHERE UserEmail=?'
        db.query(sql,[user_email],(err, result)=>{
            if(!err){
                res.send('제거완료');
            }else res.send('error');
        } )
    })
    router.get('/read',(req, res)=>{
        const sql = 'SELECT * FROM user';
        db.query(sql, (err, result)=>{
            if(!err){
                res.send(result);
            }else res.send('error');
        } )
    })
    router.post('/select',(req, res)=>{

        const user_email = req.body.user_email;
        const sql = 'SELECT * FROM user WHERE UserEmail=?'
        db.query(sql,[user_email],(err, result)=>{
            if(!err){
                    res.send(result)
            }else res.send('error');
        } )
    })
    router.post('/update', (req, res) => {
        const user_nickname = req.body.user_nickname;
        const user_pw = req.body.user_pw;
        const user_organ = req.body.user_organ;
        const user_name = req.body.user_name;
        const user_adminAuth = req.body.user_adminAuth;
        const user_email = req.body.user_email;
        const param =  [user_nickname, user_pw, user_organ, user_name, user_adminAuth, user_email];
        
        bcrypt.hash(param[1], saltRounds, (err, hash)=>{
                const sql = 'UPDATE user SET UserNickName=?, UserPassword=?, UserOrgan=?, UserName=?, UserAdminAuth=? WHERE UserEmail=?';
                param[1] = hash
                db.query(sql, param, (error, result)=>{
                    if(!error){
                        res.send('수정이 완료되었습니다');
                        
                    }
                    else res.send('오류');
                })
                
            })
        })
module.exports = router;
