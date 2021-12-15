import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import postReducer from '../features/postSlice'
import selectReducer from '../features/selectSlice'
import tagReducer from '../features/tagSlice'
import useCreateReducer from '../features/useCreateSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    user:userReducer,
    post:postReducer,
    select:selectReducer,
    useCreate:useCreateReducer,
    tag:tagReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer:persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});
export default store;