import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../../styles/createUser.css'
import { useNavigate } from 'react-router-dom'
import { useCreate } from '../../features/useCreateSlice'
import { useDispatch } from 'react-redux'
import '../../styles/createUser.css'
const CreateUser = () => {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [organ, setOrgan] = useState('')
    const [name, setName] = useState('')
    const [passEmail, setPassEmail]= useState(false)
    const [passNick, setPassNick] = useState(false)
    const [trueEmail, setTrueEmail] = useState(false)
    const [truePassword, setTruePassword] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState('')
    const [pwMessage, setPwMeassage] = useState('비밀번호가 일치하지 않습니다')
    const dispatch = useDispatch()
    useEffect(()=>{
        setTrueEmail(isEmail(email))
        setTruePassword(isPassword(password))
        if(password === passwordCheck){
            setPwMeassage('비밀번호가 일치합니다')
        }else{
            setPwMeassage('비밀번호가 일치하지 않습니다')
        }
    },[email, password, passwordCheck])

    const OnCreate = () => {

        if(email==='')alert('이메일을 입력해주세요')
        else if(nickname==='')alert('닉네임을 입력해주세요')
        else if(password==='')alert('비밀번호를 입력해주세요')
        else if(organ==='')alert('조직을 입력해주세요')
        else if(name==='')alert('이름을 입력해주세요')
        else if(passEmail===false)alert('이메일 중복을 확인해주세요')
        else if(passNick===false)alert('닉네임 중복을 확인해주세요')
        else if(truePassword===false)alert('비밀번호는 8 ~ 10자 영문, 숫자 조합으로 해주세요')
        else{
        axios.post('http://localhost:8000/user/register',{
                user_email : email,
                user_nickname : nickname,
                user_pw: password,
                user_organ: organ,
                user_name : name            
    }).then((res)=>alert(res.data))
    .then(dispatchCreate())
    }
    }
    const isEmail = (asValue)=> {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(asValue); 
    }

    const isPassword = (asValue)=>{
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
        return regExp.test(asValue); 
    }
    const emailCheck = () => {
        setTrueEmail(isEmail(email))
        if(email==="") alert('이메일을 입력해주세요')
        else if(trueEmail===false){
            alert('이메일 형식을 지켜주세요')
        }
        else{
        axios.post('http://localhost:8000/check/email', {
            user_email : email
        }).then((res)=>{
            alert(res.data)
            if(res.data==='사용 가능한 이메일 입니다.')setPassEmail(true)
            else setPassEmail(false)
        })
        
    }}
    const nicknameCheck = () => {
        if(nickname=="") alert('닉네임을 입력해주세요')
        else{
        axios.post('http://localhost:8000/check/nickname', {
            user_nickname : nickname
        }).then((res)=>{
            alert(res.data)
            if(res.data==='사용 가능한 닉네임 입니다.')setPassNick(true)
            else setPassNick(false)
        })
        
        
    }}
    const dispatchCreate = () =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch(useCreate())
    }

    return (
        <div>
        <div className='top'>
            <div className='top_content'>
            <div className='logo'><img className="logo_img" src="img/logo.png" alt='logo'/><h1>나연테크</h1></div><strong className='docs'>Na DOCS</strong>
            </div>
        </div>
        <hr/>
        <div className="create_content">
            <button onClick={dispatchCreate}>취소</button>
            <div className="create">
                <div><strong>회원가입</strong></div>
                <div className="create_inputFields">
                <div className="create_inputField"><input type="email" name="user_email" id="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(e)=>{setEmail(e.target.value); setPassEmail(false)}}/></div><button type="submit" onClick={emailCheck} className="emailCheck_btn">중복확인</button>
                <div className="create_inputField"><input type="password" name="user_pw" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className="create_inputField"><input type="password" id="passwordCheck" placeholder="비밀번호를 다시 입력해 주세요." value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}}/><span style={pwMessage==='비밀번호가 일치합니다'?{color:'green'}:{color:'red'}}>{pwMessage}</span></div>
                <div className="create_inputField"><input type="name" name="user_name"id="name" placeholder="이름을 입력해 주세요." value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <div className="create_inputField"><input type="organ"name="user_organ" id="organ" placeholder="조직을 입력해 주세요." value={organ} onChange={(e)=>{setOrgan(e.target.value)}}/></div>
                <div className="create_inputField"><input type="nickname"name="user_nickname" id="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={(e)=>{setNickname(e.target.value); setPassNick(false)}}/></div><button type="submit" onClick={nicknameCheck} className="nicknameCheck_btn">중복확인</button>
                
                </div>
                <div className="create_footer">
                    <button type="submit" onClick={OnCreate} className="createUser_btn">가입하기</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CreateUser