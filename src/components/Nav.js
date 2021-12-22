import React from 'react'
import {Link} from 'react-router-dom'
import {logout, loading} from '../features/userSlice'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import '../styles/nav.css'
import { Settings, Edit, Person, ExitToApp} from '@material-ui/icons'
const Nav = () => {
    const dispatch = useDispatch();
    
    const useLogout = ()=>{
        axios.get('http://10.0.15.27:8000/user/logout',{},
            { withCredentials : true }
        ).then(dispatch(logout()))
        .then(dispatch(loading(false)));
        

 
    }
    return(
            <div className='nav_content'>
                <div className='left_content'>
            <div className="nav_logo" ><img className="nav_img" src="img/logo.png" alt='logo'/><Link to="/"><h1>나연테크</h1></Link></div><strong className='docs'>Na DOCS</strong>
            </div>
            <div className="nav_items">
                <div className="nav_item" ><Link to="/adminMain"><Settings/></Link></div>
                <div className="nav_item" ><Link to="/write"><Edit/></Link></div>
                <div className="nav_item" ><Link to="/userUpdate"><Person/></Link></div>
                <div className="nav_item"><ExitToApp onClick={useLogout}/></div>
            </div>
            </div>
    
    )
}

export default Nav
