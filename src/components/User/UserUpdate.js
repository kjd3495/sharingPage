import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import '../../styles/update.css'

const UserUpdate = () => {
    const user = useSelector(selectUser)
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [truePassword, setTruePassword] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState('')
    const [pwMessage, setPwMeassage] = useState('비밀번호가 일치하지 않습니다')
    const [passNick, setPassNick] = useState(false)
    useEffect(()=>{
    setNickname(user.user_nickname)
},[])
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
        axios.post('http://10.0.15.27:8000/check/nickname', {
            user_nickname : nickname
        }).then((res)=>{alert(res.data)
        if(res.data==='사용 가능한 닉네임 입니다.')setPassNick(true)
            else setPassNick(false)})
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
        else if(user.user_nickname!==nickname&&passNick===false)alert('닉네임 중복을 확인해주세요')
        else {axios.post('http://10.0.15.27:8000/user/update',{
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
                <div className="update_item"><strong>이메일</strong><br/>{user.user_email} </div>
                <div className="update_item"><strong>이름</strong><br/>{user.user_name}</div>
                <div className="update_item"><strong>조직</strong><br/>{user.user_organ}</div>
                <div className="update_pw"><strong>비밀번호</strong><br/><input className='update_input' type="password" name="user_pw" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className='update_check_rap'><div className="update_check"><strong>비밀번호확인</strong><br/><input  className='update_input' type="password" id="passwordCheck" placeholder="비밀번호를 다시 입력해 주세요." value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}}/></div><br/><span style={pwMessage==='비밀번호가 일치합니다'?{color:'green'}:{color:'red'}}>{pwMessage}</span></div>
                <div className='update_check_rap'><div className="update_check"><strong>닉네임</strong><br/><input  className='update_input' type="nickname"name="user_nickname" id="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={(e)=>{setNickname(e.target.value); setPassNick(false)}}/></div><br/><button type="submit" onClick={user.user_nickname===nickname ?()=>alert('현재 닉네임입니다'):nicknameCheck} className="nicknameCheck_btn">중복확인</button></div>
                <div className="update_item"><strong>등록일</strong><br/>{user.user_date}</div>
            </div>
            <div className="update_footer">
                    <button type="submit" onClick={onUpdate} className="updateUser_btn">수정완료</button>
                </div>
        </div>
    )
}

export default UserUpdate
