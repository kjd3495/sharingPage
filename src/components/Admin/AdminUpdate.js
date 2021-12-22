import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { selectedUser } from '../../features/selectSlice'
const AdminUpdate = () => {
    const navigate = useNavigate();
    const selecteduser = useSelector(selectedUser);
    const [user, setUser] = useState([]);
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [name, setName] = useState('')
    const [organ, setOrgan] = useState('')
    const [adminAuth, setAdminAuth] = useState(0)
    const [truePassword, setTruePassword] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState('')
    const [pwMessage, setPwMeassage] = useState('비밀번호가 일치하지 않습니다')
    const [passNick, setPassNick] = useState(false)
    useEffect(()=>{
        console.log(adminAuth)
    },[adminAuth])
    useEffect(()=>{
        const ReadUser= async ()=>{
        await axios.post('http://10.0.15.27:8000/admin/select',{
            user_email:selecteduser.user_email
        }).then(res=>{
            setUser(res.data[0]);
        })
        }
        ReadUser();
    },[selecteduser]);

    useEffect(()=>{
        setNickname(user.UserNickName);
        setName(user.UserName);
        setOrgan(user.UserOrgan);
        setAdminAuth(user.UserAdminAuth);
    },[user]);

    useEffect(()=>{
        setTruePassword(isPassword(password))
        if(password === passwordCheck){
            setPwMeassage('비밀번호가 일치합니다')
        }else{
            setPwMeassage('비밀번호가 일치하지 않습니다')
        }
    },[ passwordCheck, password])

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
        else if(organ ==='')alert('조직을 입력해주세요')
        else if(name ==='')alert('이름을 입력해주세요')
        else if(truePassword===false)alert('비밀번호는 8 ~ 10자 영문, 숫자 조합으로 해주세요')
        else if(user.UserNickName!==nickname&&passNick===false)alert('닉네임 중복을 확인해주세요')
        else {axios.post('http://10.0.15.27:8000/admin/update',{
                user_email : selecteduser.user_email,
                user_nickname : nickname,
                user_pw: password,
                user_name:name,
                user_organ:organ,
                user_adminAuth:adminAuth       
    }).then((res)=>alert(res.data))
        .catch()
        }
    }
    const goBack = () =>{
        navigate('/adminMain')
    }
    return (
        <div className="user_update">
                <div className="update_top">
                    <button onClick={goBack}>뒤로가기</button><button type="submit" onClick={onUpdate} className="updateUser_btn">수정완료</button>
                </div>
            <div className="adUpdate_items">
            <div className="adUpdate_item">
                <strong>권한: </strong>
                <select name="adminAuth" defaultValue={selecteduser.user_adminAuth}
                    onChange={(e)=>setAdminAuth(e.target.value)}>
                    <option value={0}>일반사용자</option>
                    <option value={1}>관리자</option>
                    </select></div>
            <div className="adUpdate_item"><strong>이메일 : </strong>{selecteduser.user_email}</div>
                <div className="adUpdate_item"><strong>비밀번호</strong><br/><input type="password" name="user_pw" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className="adUpdate_item"><strong>비밀번호확인</strong><br/><input type="password" id="passwordCheck" placeholder="비밀번호를 다시 입력해 주세요." value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}}/><span style={pwMessage==='비밀번호가 일치합니다'?{color:'green'}:{color:'red'}}>{pwMessage}</span></div>
                <div className="adUpdate_item"><strong>이름</strong><br/><input type="name" name="user_name"id="name" placeholder="이름을 입력해 주세요." value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <div className="adUpdate_item"><strong>조직</strong><br/><input type="organ"name="user_organ" id="organ" placeholder="조직을 입력해 주세요." value={organ} onChange={(e)=>{setOrgan(e.target.value)}}/></div>
                <div className="adUpdate_item"><strong>닉네임</strong><br/><input type="nickname"name="user_nickname" id="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={(e)=>{setNickname(e.target.value); setPassNick(false)}}/></div><button type="submit" onClick={selecteduser.user_nickname===nickname ?()=>alert('현재 닉네임입니다'):nicknameCheck} className="nicknameCheck_btn">중복확인</button>
            </div>
        </div>
    )
}

export default AdminUpdate
