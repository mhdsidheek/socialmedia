import {configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage" 

import userReducer from "./slices/userdata"

const  persistconfig ={key:"root" ,storage}

const reducer =combineReducers({
    user:userReducer,
})
const persistReduce = persistReducer(persistconfig,reducer);
const store =configureStore({
    reducer:persistReduce,
})

export default store
