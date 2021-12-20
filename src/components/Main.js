import React , {useState, useEffect}from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {  selectUser } from '../features/userSlice'
import Nav from './Nav'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Search from './Search/Search'
import Result from './Search/Result'
import Write from './Post/Write'
import AdminMain from './Admin/AdminMain';
import UserUpdate from './User/UserUpdate';
import AdminCreate from './Admin/AdminCreate';
import AdminUpdate from './Admin/AdminUpdate';
import CreateUser from './User/CreateUser'
import Edit from './Post/Edit';
import Post from './Post/Post';
import '../styles/main.css'

const Main = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    
    
    const NotAdmin = () =>{   
            return(
                <div style={{textAlign:"center", fontSize:"30px"}}>관리자 전용페이지 입니다</div>
            )
    }
    return (
        
        <div>
            <Nav/>
            <div className="main_container">
        <Routes>
        <Route path ="/adminMain" element={ user.user_adminAuth===1 ?<AdminMain/>:<NotAdmin/>}/>
        <Route path ="/adminCreate" element={<AdminCreate/>}/>
        <Route path ="/adminUpdate" element={<AdminUpdate/>}/>
        <Route path ="/userUpdate" element={<UserUpdate/>} />
        <Route path ="/edit" element={<Edit/>}/>
        <Route path ="/post" element={<Post/>}/>
        <Route path ="/write" element={<Write/>} />
        <Route path ="/" element={<Search/>} exact />
        <Route path ="/result" element={<Result/>}/>
        </Routes>
            </div>

        </div>
    )
}

export default Main
