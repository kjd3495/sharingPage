import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../../features/userSlice';
import '../../styles/login.css'
import {useCreate} from '../../features/useCreateSlice'
axios.defaults.withCredentials = true;

const Login = () => {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onClickLogin = () => {
        axios.post('http://localhost:8000/user/login',{
                user_email : email,
                user_pw: password
                
    })
        .then(res => {
            if(res.data.UserEmail){
                dispatch(login({
                    user_email: res.data.UserEmail,
                    user_nickname:res.data.UserNickName,
                    user_pw:res.data.UserPassword,
                    user_organ: res.data.UserOrgan,
                    user_name: res.data.UserName,
                    user_adminAuth: res.data.UserAdminAuth,
                    user_date: res.data.CreateDate
                }));
                navigate('/');
            }else{
                alert(res.data.message)
            }
        })
        .catch()
    }
    const onCreate = () =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch(useCreate(true))
    }
    return (
        <div>
        <div className='top'>
            <div className='top_content'>
            <div className='logo'><img className="logo_img" src="img/logo.png" alt='logo'/><h1>나연테크</h1></div><strong className='docs'>Na DOCS</strong>
            </div>
        </div>
        <hr/>
        <div className="content">
            <div className='img_div'>
            <img className='nadocs' src="img/NaDocs.png" alt="nadocs" width={800}/>
            </div>
            <div className="login">
                <div className='strong_login'><strong>Login</strong></div>
                <div className="login_inputFields">
                <div className="login_inputField"><input type="email" id="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></div>
                <div className="login_inputField"><input type="password" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                </div>
                <div className="login_footer">
                    <button type="submit" onClick={onClickLogin} className="login_btn">로그인</button>
                    <button type="submit" className="create_btn" onClick={onCreate}>회원가입</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
