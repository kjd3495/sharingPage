import React, {useEffect, useState} from 'react'
import { useNavigate} from "react-router-dom";
import { selectPost } from '../../features/postSlice';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import { selectUser } from '../../features/userSlice';



const Post = () => {
    const board_id = useSelector(selectPost)
    const [post, setPost] = useState([])
    const [tag_list, setTag_list] = useState([])
    const [comment, setComment] = useState('')
    const [commentId, setCommentId] = useState(0)
    const [commentList, setCommentList] = useState([])
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const p =document.createElement('p')
    useEffect(()=>{
        const getPost = async()=>{
            await axios.get('http://localhost:8000/post/select?board_id='+board_id+'')
            .then(res=> setPost(res.data[0]))
            await axios.get('http://localhost:8000/tag/select?board_id='+board_id+'')
            .then(res=>setTag_list(res.data))
            await axios.get('http://localhost:8000/comment/read?board_id='+board_id+'')
            .then(res=>setCommentList(res.data))
        }
        getPost();
    },[board_id, commentId])

    useEffect(()=>{
        axios.get('http://localhost:8000/comment/id')
        .then(res=>{
            if(res.data.comment_id===null){
                setCommentId(1)
            }else
            setCommentId(res.data.comment_id+1)
        })
    },[board_id])
    
const createComment = ()=>{
    axios.post('http://localhost:8000/comment/create',{
        comment_id: commentId,
        comment_content:comment,
        board_id:board_id,
        user_nickname: user.user_nickname
    }).then(setCommentId(commentId+1))
    .then(setComment(''))
    .then(res=>alert(res.data))
}
const goList = ()=>{
    navigate('/result')
    
}
        return (
        <div className="posts">
            <div className="post_top">
                <button className="btn" onClick={goList}>목록</button>
                <button className="btn" onClick={()=>navigate('/edit')}>편집하기</button>
            <div className="title">제목: {post.BoardTitle}</div>
            <div className="create_date">등록일: {post.CreateDate}</div>
            <div className="update_date">수정일: {post.UpdateDate?post.UpdateDate:'----'}</div>
            <div className="user_nickName">닉네임: {post.UserNickName}</div>
            </div>
            
            <div className="content"dangerouslySetInnerHTML={ {__html: post.BoardContent} } ></div>
            <div className="tag"><span>태그</span>
            {
                tag_list.map((tag)=>(
                    <div>{tag}</div>
                ))
            }
            </div>
            <div className="comments">
                <input type="text" placeholder="댓글을 입력하세요" value={comment} onChange={(e)=>{setComment(e.target.value)}}/><button onClick={createComment}>댓글등록</button>
                {
                commentList.map((comments)=>(
                    <div key={comments.CommentId}>
                    <div>{comments.CommentContent}</div>
                    <div>{comments.UserNickName}</div>
                    <div>{comments.CreateDate}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Post
