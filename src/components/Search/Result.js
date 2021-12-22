import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { readPost, selectKeyword } from '../../features/postSlice'
import SearchPagination from './SearchPagination'
import { useKeyword } from '../../features/postSlice'
import { usedTag, usingTag } from '../../features/tagSlice'
import { Search} from '@material-ui/icons'
const Result = () => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keywords = useSelector(selectKeyword);
    const tag = useSelector(usedTag);
    const [keyword, setKeyword] = useState(keywords)
    const [useTag, setUseTag] = useState(tag)
    useEffect(()=> {
        const getData = ()=>{
            if(keywords!==''){
                if(tag==='false'){
                axios.post('http://10.0.15.27:8000/search_result/result',{
                keyword:keywords
                }).then((res)=>{
                if(res.data.length===0){
                    setPosts([])
                }
                else{
                setPosts(res.data)
                }
                })}
                else if(tag==='true'){

                axios.post('http://10.0.15.27:8000/tag/result',{
                keyword:keywords
                }).then((res)=>{
                if(res.data.length===0){
                    setPosts([])
                }
                else{
                setPosts(res.data)
                }
                })  
                }}
            }
        getData();
    },[keywords, tag]);

    const useSearch = ()=>{
        if(keyword===''){
            alert('검색어를 입력해주세요')
        }
        dispatch(useKeyword(keyword));
        dispatch(usingTag(useTag));
    };
    const Enter = (e) =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if(e.key==='Enter')useSearch();
    }
    const selectPost = (id) =>{
        dispatch(readPost(id))
        navigate('/post')
    };
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <div style={{padding:"20px", margin:"0 auto" }}>
            <div className="search">
            <select size="1" id="search_items"value={useTag} onChange={e=>{setUseTag(e.target.value)}}>
            <option value = 'false'>제목+내용</option>
            <option value = 'true'>태그</option>
            </select>
            <input type="text"className='input_search' placeholder="검색어" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} onKeyPress={Enter}/><Search onClick={useSearch}/>
            </div>
            <div className="content">
            {
                posts.length===0? <div>검색결과없음</div>:
            currentPosts.map(post => (
                <div key={post.BoardId}>
                <div><span style={{fontSize:"40px", fontWeight:"50",color:"black"}}onClick={()=>selectPost(post.BoardId)}>{post.BoardTitle}</span></div>
                <div onClick={()=>selectPost(post.BoardId)} dangerouslySetInnerHTML={ {__html: post.BoardContent.replace(/<IMG(.*?)>/gi,'')} }></div>
                <div style={{display:"flex", alignItems:"center"}}>{
                post.Tag&&post.Tag.map(a=>
                (<div style={{marginRight:"10px", backgroundColor: "yellow",
                color:"rgb(141, 137, 137)"}} key={a}><span style={{padding:"5px"}}>{a}</span></div>))}
                </div>
                </div>
            )) }
            </div>
            <SearchPagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate}></SearchPagination>
        </div>
    )
}
export default Result;