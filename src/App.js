import React, {useEffect} from 'react';
import Login from './components/User/Login'
import './App.css';
import Main from './components/Main';
import Loading from './Loading'
import {selectUser, selectLoading} from './features/userSlice';
import { selectCreate } from './features/useCreateSlice';
import {useDispatch, useSelector} from 'react-redux';
import {login, loading} from './features/userSlice';
import axios from 'axios';
import CreateUser from './components/User/CreateUser';
function App() {
  const user = useSelector(selectUser);
  const useCreate = useSelector(selectCreate);
  const dispatch = useDispatch();
  const loading_state = useSelector(selectLoading);
  useEffect(()=> {
      axios.get('http://10.0.15.27:8000/check/login', {}, {withCredentials: true})
      .then(res=>{
        if(res.data){dispatch(login({
        user_email: res.data.UserEmail,
        user_nickname:res.data.UserNickName,
        user_pw:res.data.UserPassword,
        user_organ: res.data.UserOrgan,
        user_name: res.data.UserName,
        user_adminAuth: res.data.UserAdminAuth,
        user_date: res.data.CreateDate
      }))}else dispatch(loading(false))
    });
 },[dispatch])

  return (
    <div className="App">
      {
        
      user?<Main/>:(loading_state?<Loading/>:(useCreate?<CreateUser />:<Login />))

      }
      </div>
  );
}

export default App;
