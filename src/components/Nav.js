import React from 'react'
import {Link} from 'react-router-dom'
import  search  from './Search/Search'
import adminMain from './Admin/AdminMain'
import write from './Post/Write'
import userUpdate from './User/UserUpdate'
import {logout, loading} from '../features/userSlice'
import {useDispatch} from 'react-redux'
import axios from 'axios'
const Nav = () => {
    const dispatch = useDispatch();
    
    const useLogout = ()=>{
        axios.get('http://localhost:8000/user/logout',{},
            { withCredentials : true }
        ).then(dispatch(logout()))
        .then(dispatch(loading(false)));
        

 
    }
    return(
            <div>
            <div className="logo" ><Link to="/"><span><strong>나연테크</strong> Na Docs</span></Link></div>
            
            <div className="nav_items">
                <div className="nav_item" ><Link to="/adminMain">관리자</Link></div>
                <div className="nav_item" ><Link to="/write">글쓰기</Link></div>
                <div className="nav_item" ><Link to="/userUpdate">유저수정</Link></div>
                <div className="nav_item"><button onClick={useLogout}>로그아웃</button></div>
            </div>
            <hr/>
            </div>
    )
}

export default Nav
