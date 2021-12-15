const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt')
const saltRounds=10
const passport = require('passport');

router.post('/register', (req, res) => {
    const user_email = req.body.user_email
    const user_nickname = req.body.user_nickname
    const user_pw = req.body.user_pw
    const user_organ= req.body.user_organ
    const user_name = req.body.user_name
    const user_date = new Date()
    const user_adminAuth = false
    const param = [user_email, user_nickname, user_pw, user_organ, user_name,user_adminAuth,user_date]
    
    bcrypt.hash(param[2], saltRounds, (err, hash)=>{
            const sql = 'INSERT INTO nayuntech.user(UserEmail,UserNickName,UserPassword, UserOrgan, UserName, UserAdminAuth,CreateDate)VALUES(?,?,?,?,?,?,?)'
            param[2] = hash
            db.query(sql, param, (error, result)=>{
                if(!error)res.send('가입한 아이디로 로그인해주세요!');
                else res.send('오류');
            })
            
        })
    })
    router.post('/login', (req, res, next)=> {
        passport.authenticate(
            'local', (err, user, info)=>{
                if(err) { return next(err); }
        
                if(user){
        
                req.logIn(user, (error)=>{
                    if(error){return next(error);}
                    return res.send(user);
                });
                }else {
                res.send(info);
                }
            })(req, res, next);
        });
        router.get('/logout', function(req, res) {
            req.logout();
            req.session.destroy();
            
        });
        router.post('/update', (req, res) => {
            const user_nickname = req.body.user_nickname;
            const user_pw = req.body.user_pw;
            const user_email = req.body.user_email;
            const param =  [user_nickname, user_pw, user_email];
            
            bcrypt.hash(param[1], saltRounds, (err, hash)=>{
                    const sql = 'UPDATE user SET UserNickName=?, UserPassword=? WHERE UserEmail=?';
                    param[1] = hash
                    db.query(sql, param, (error, result)=>{
                        if(!error){
                            if(result!==null)
                            res.send('수정이 완료되었습니다');
                            
                        }
                        else res.send('오류');
                    })
                    
                })
            })
module.exports = router;
