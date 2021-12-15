import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch}from 'react-redux'
import { readPost } from '../../features/postSlice'
import { useNavigate } from 'react-router'
import {selectUser} from '../../features/userSlice'
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR"
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";

const Write = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const user = useSelector(selectUser)
    const [tag, setTag] = useState('')
    const [tagList,setTagList] = useState([])
    const [boardId, setBoardId] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const reader = new FileReader();
    const contentArr = [];
    useEffect(()=>{
        axios.get('http://localhost:8000/read/boardId')
        .then(res=>{
            if(res.data.max_id===null){
                setBoardId(1)
            }else
            setBoardId(res.data.max_id+1)
        })
        
    },[])

    const onWrite = ()=>{
        axios.post('http://localhost:8000/post/write', {
            board_id:boardId,
            board_title: title,
            board_content:document.querySelector('.note-editable').innerHTML,
            user_nickname: user.user_nickname,
            tag: tagList.join()
        }).then(res=>alert(res.data))
        .then(setTagList([]))
        .then(dispatch(readPost(boardId)))
        .then(navigate('/post'))

    }
    const createTag = ()=>{
        if(tag!==''){
        if(!tagList.includes(tag)){
        setTagList(tagList => [...tagList, tag])
        setTag('')
        }
        else{
            alert('태그가 중복됩니다.')
            setTag('')
        }
    }   else{
        alert('태그를 입력해주세요')
    }
    console.log(document.querySelector('.note-editable'))
    }
    const deleteTag=(tag)=>{
        setTagList(tagList => tagList.filter((a)=>a !==tag))
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
        
        <div className="post">
            <div className="post_top">
                <button onClick={onWrite}>글 등록</button>
            </div>
            <div className="title">
            <input type="text" name="title" placeholder="제목을 입력해주세요" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="container">
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
                
                />
            </div>
            <div className="tag">
                <div className="tag_arr">
                    {
                        tagList.map((tag)=>(
                            <div key={tag}>{tag}<button onClick={()=>deleteTag(tag)}>삭제</button></div>
                        ))
                    }
                </div>
                <input type="text" name="tag" placeholder="태그를 입력하세요" value={tag} onChange={(e)=>setTag(e.target.value)}/><button onClick={createTag}>등록</button>
            </div>
        </div>
    )
}

export default Write
