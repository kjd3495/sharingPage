import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import Pagination from './Pagination';
import { selecting } from '../../features/selectSlice';
import {useDispatch, useSelector} from 'react-redux'
const AdminMain = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
    const fetchPosts = () => {
        axios.get('http://localhost:8000/admin/read').then((res)=>
        setPosts(res.data))
    }

        fetchPosts();
    }, []);
    const onSelect = (email) =>{
                
        dispatch(selecting({
                    user_email: email
                }));
        navigate('/adminUpdate')
}

    const onDelete = (email) =>{
        axios.post('http://localhost:8000/admin/delete',{
            user_email: email
        }).then(window.location.replace('/adminMain'))
        .then(res=>alert(res.data))
        
    }
    const back = () => {
        navigate('/')
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container" style={{ fontFamily: 'Noto Sans Korean,Malgun Gothic,sans-serif' }}>
            <div className="title"><span>조직원 목록</span></div>
            <div className="content">
            <div className="top">
                <button className='returnBtn' onClick={back}>뒤로가기</button><button className="user_create"onClick={()=>navigate('/adminCreate')}>추가하기</button>
            </div>
                <div style={{ padding: "0 12px" }}>
                <table className="board_list text-center">
                    <colgroup>
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="20%" />
                        <col width="*" />
                        <col width="*" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>조직</th>
                        <th>권한</th>
                        <th>이메일</th>
                        <th>등록일</th>
                        <th>삭제</th>
                      </tr>
                   </thead>
                   <tbody>
                      {currentPosts.map(post => (
                            <tr key={post.UserEmail}>
                            <td>{post.UserName}</td>
                            <td>{post.UserOrgan}</td>
                            <td>{post.UserAdminAuth===1?'관리자':'일반사용자'}</td>
                            <td className="user_update"><span onClick={()=>onSelect(post.UserEmail)}>{post.UserEmail}</span></td>
                            <td>{post.CreateDate}</td>
                            <td>
                            <button onClick={()=>onDelete(post.UserEmail)}>삭제</button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
 
                </table>
             </div>
 
             <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate}></Pagination>
          </div>
       </div>
    )
}

export default AdminMain
