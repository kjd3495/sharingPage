import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { useKeyword } from '../../features/postSlice'
import { usingTag} from '../../features/tagSlice'
import '../../styles/search.css'
import { Search} from '@material-ui/icons'

const SearchPage = () => {
    const [keywords, setKeywords] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [useTag, setUseTag] = useState('false')
    
    const useSearch = ()=>{
        dispatch(useKeyword(keywords));
        dispatch(usingTag(useTag));
        navigate('/result');
    }
    const Enter = (e) =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if(e.key==='Enter')useSearch();
    }
    return (
        <div className='search_rap'>
          <img className='nadocs' src="img/NaDocs.png" alt="nadocs" width={800}/> 
        <div className='search'>
            <select size="1" id="search_items" value={useTag} onChange={e=>{setUseTag(e.target.value)}}>
            <option value = 'false' >제목+내용</option>
            <option value = 'true'>태그</option>
            </select>
            <input className="input_search"type="text" placeholder="검색어" onChange={(e)=>{setKeywords(e.target.value)}} onKeyPress={Enter}/><Search onClick={useSearch}/>
        </div>
        </div>
    )
}

export default SearchPage
