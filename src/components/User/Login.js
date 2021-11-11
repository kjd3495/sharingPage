import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleId = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const onClickLogin = () => {
        axios.post('http://localhost:3001/user_inform/onLogin', null, {
                body:{user_email : email,
                user_pw: password
            }
        })
        .then(alert('보내기성공'))
        .catch()
    }
    

    return (
        <div>
        <div className="top">
            <div>
                <img src="" clsssName="top_img" alt=""/>
                <span><strong>나연테크</strong> Na Docs</span>
            </div>
            <hr/>
        </div>
        <div className="content">
            <h1>NA DOCS</h1>
            <div className="login">
                <div><strong>Login</strong></div>
                <div className="login_inputFields">
                <div className="login_inputField"><input type="email" id="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></div>
                <div className="login_inputField"><input type="password" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className="login_checkBox"><input type="checkbox" id="keep_login" name="keep_login"/>로그인 상태 유지</div>
                </div>
                <div className="login_footer">
                    <button type="submit" onClick={onClickLogin} className="login_btn">로그인</button>
                    <button type="submit" className="create_btn">회원가입</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
