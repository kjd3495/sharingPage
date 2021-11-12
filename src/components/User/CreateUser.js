import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CreateUser = () => {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [organ, setOrgan] = useState('')
    const [name, setName] = useState('')

    
    const onCreate = () => {
        axios.post('http://localhost:8000/user_inform/register',{
                user_email : email,
                user_nickname : nickname,
                user_pw: password,
                user_organ: organ,
                user_name : name            
    })
        .then((res)=>{console.log(res.data)})
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
                <div className="login_inputField"><input type="password" id="passwordCheck" placeholder="비밀번호를 입력해 주세요." /></div>
                <div className="login_inputField"><input type="name" id="name" placeholder="이름을 입력해 주세요." value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <div className="login_inputField"><input type="organ" id="organ" placeholder="조직을 입력해 주세요." value={organ} onChange={(e)=>{setOrgan(e.target.value)}}/></div>
                <div className="login_inputField"><input type="nickname" id="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={(e)=>{setNickname(e.target.value)}}/></div>
                
                </div>
                <div className="login_footer">
                    <button type="submit" onClick={onCreate} className="createUser_btn">가입하기</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CreateUser