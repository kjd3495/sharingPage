import React, {useState, useEffect, useRef} from 'react'
import { selectPost } from '../../features/postSlice';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router';
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR"
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { Delete} from '@material-ui/icons'
import moment from 'moment'
import 'moment/locale/ko'
const Edit = () => {
    const board_id = useSelector(selectPost)
    const [post, setPost]=useState([])
    const [title, setTitle] = useState('')
    const [content, setContent]= useState('')
    const [tag_list, setTag_list] = useState([])
    const [commentList, setCommentList] = useState([])
    const [tag, setTag] = useState('')
    const[tagId, setTagId] = useState(0)
    const navigate = useNavigate()
    const reader = new FileReader();
    useEffect(()=>{
        const getPost= async()=>{
            await axios.get('http://10.0.15.27:8000/post/select?board_id='+board_id+'')
            .then(res=> setPost(res.data[0]))
            await axios.get('http://10.0.15.27:8000/tag/select?board_id='+board_id+'')
            .then(res=>setTag_list(res.data))
            await axios.get('http://10.0.15.27:8000/read?board_id='+board_id+'')
            .then(res=>setCommentList(res.data))
        }
        getPost()
    },[board_id])
    useEffect(() => {
        setTitle(post.BoardTitle);
        setContent(post.BoardContent)
    
        
    }, [post])

    const updatePost = () =>{
        if(title==='')alert('제목을 입력해주세요')
        else{
        axios.post('http://10.0.15.27:8000/post/update',{
            board_id: board_id,
            board_title:title,
            board_content:document.querySelector('.note-editable').innerHTML,
            tag: tag_list.join(),
            date: moment().format('YYYYMMDD HH:mm:ss')
        }).then(res=>alert(res.data))
        .then(navigate('/post'))
    }
    }
    const deletePost = async() => {
        await axios.post('http://10.0.15.27:8000/post/delete',{
            board_id : board_id
        }).then(res=>alert(res.data))
        navigate('/result')
    }
    const deleteTag=(tag)=>{
        setTag_list(tag_list => tag_list.filter((a)=>a!==tag))
    }
    const createTag = ()=>{
        if(tag!==''){
        if(!tag_list.includes(tag)){
        setTag_list(tag_list => [...tag_list, tag])
        setTag('')
        }
        else{
            alert('태그가 중복됩니다.')
            setTag('')
        }
    }
        else{
            alert('태그를 입력해주세요')
        }
    }
    const onImageUpload = (images, insertImage) => {
        for (let i = 0; i < images.length; i++) {
    
            reader.onloadend = () => {
            insertImage(reader.result);
            };
    
            reader.readAsDataURL(images[i]);
            }
        
        };
    return (
        <div className="posts">
            <div className="post_top">
                <button className="btn" style={{marginRight:"5px"}} onClick={()=>navigate(-1)}>뒤로가기</button>
                <button className="btn" onClick={updatePost}>저장하기</button>
                <button className="btn" onClick={deletePost}>삭제하기</button>
            <div className="title">제목: <input type="text" placeholder="제목" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/></div>
            <div className="create_date">등록일: {post.CreateDate}</div>
            <div className="update_date">수정일: {post.UpdateDate?post.UpdateDate:'----'}</div>
            <div className="user_nickName">닉네임: {post.UserNickName}</div>
            </div>

            <div className="content">
                <ReactSummernote 
                options={{
                lang: "ko-KR",
                height: 400,
                dialogsInBody: true,
                toolbar: [
                ["style", ["style"]],
                ["font", ["bold", "underline", "clear"]],
                ["fontname", ["fontname"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "video"]],
                ["view", ["fullscreen", "codeview"]],
                ],
                }}
                placeholder="내용을 입력해주세요" 
                onImageUpload={onImageUpload}
                value={content}
                /></div>
            <div className="tag">
            <div className="tag_arr">  
                    {
                        tag_list.map((tag)=>(
                            <div style={{marginRight:"10px", display:"flex", alignItems:"center"}} key={tag} className='tag_content'><span style={{padding:"5px"}}>{tag}</span><Delete onClick={()=>deleteTag(tag)}/></div>
                        ))
                    }
                    </div>
                    <input type="text" name="tag" placeholder="태그를 입력하세요" value={tag} onChange={(e)=>setTag(e.target.value)}/><button onClick={createTag}>등록</button>
                    </div>
        </div>
    )
}

export default Edit
