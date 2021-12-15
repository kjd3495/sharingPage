import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { useKeyword } from '../../features/postSlice'
import { usingTag} from '../../features/tagSlice'
const Search = () => {
    const [keywords, setKeywords] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [useTag, setUseTag] = useState('false')
    
    const useSearch = ()=>{
        dispatch(useKeyword(keywords));
        dispatch(usingTag(useTag));
        navigate('/result');
    }
    return (
        <div>
            <select size="1" id="search_items" value={useTag} onChange={e=>{setUseTag(e.target.value)}}>
            <option value = 'false' >제목+내용</option>
            <option value = 'true'>태그</option>
            </select>
            <input type="text" placeholder="검색어" onChange={(e)=>{setKeywords(e.target.value)}}/><button onClick={useSearch}>검색</button>
        </div>
    )
}

export default Search
