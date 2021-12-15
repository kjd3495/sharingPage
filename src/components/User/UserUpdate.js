import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
const UserUpdate = () => {
    const user = useSelector(selectUser)
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [truePassword, setTruePassword] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState('')
    const [pwMessage, setPwMeassage] = useState('비밀번호가 일치하지 않습니다')
    useEffect(()=>{
        setTruePassword(isPassword(password))

        if(password === passwordCheck){
            setPwMeassage('비밀번호가 일치합니다')
        }else{
            setPwMeassage('비밀번호가 일치하지 않습니다')
        }
    },[passwordCheck, password])

    const nicknameCheck = () => {
        if(nickname==='') alert('닉네임을 입력해주세요')
        else{
        axios.post('http://localhost:8000/check/nickname', {
            user_nickname : nickname
        }).then((res)=>alert(res.data))
        .catch()
    }}
    const isPassword = (asValue)=>{
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
        return regExp.test(asValue); 
    }

    const onUpdate = () => {
        
        if(password==='')alert('비밀번호를 입력해주세요')
        else if(nickname==='')alert('닉네임을 입력해주세요')
        else if(truePassword===false)alert('비밀번호는 8 ~ 10자 영문, 숫자 조합으로 해주세요')
        else if(pwMessage!=='비밀번호가 일치합니다')alert('비밀번호가 일치하지 않습니다')
        else {axios.post('http://localhost:8000/user/update',{
                user_email : user.user_email,
                user_nickname : nickname,
                user_pw: password,        
    }).then((res)=>alert(res.data))
        .catch()
        }
    }
    return (
        <div className="user_update">
            <div className="update_items">
                <div className="update_item">{user.user_name}</div>
                <div className="update_item"><strong>이메일</strong><br/>{user.user_email} </div>
                <div className="update_item"><strong>조직</strong><br/>{user.user_organ}</div>
                <div className="update_item"><input type="password" name="user_pw" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className="update_item"><input type="password" id="passwordCheck" placeholder="비밀번호를 다시 입력해 주세요." value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}}/><span style={pwMessage==='비밀번호가 일치합니다'?{color:'green'}:{color:'red'}}>{pwMessage}</span></div>
                <div className="update_item"><input type="nickname"name="user_nickname" id="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={(e)=>{setNickname(e.target.value)}}/></div><button type="submit" onClick={nicknameCheck} className="nicknameCheck_btn">중복확인</button>
                <div className="update_item"><strong>등록일</strong><br/>{user.user_date}</div>
            </div>
            <div className="update_footer">
                    <button type="submit" onClick={onUpdate} className="updateUser_btn">수정완료</button>
                </div>
        </div>
    )
}

export default UserUpdate
