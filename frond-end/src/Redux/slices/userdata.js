import {createSlice}from "@reduxjs/toolkit";

const userDataSlice = createSlice({

    name:"userinfo",
    initialState:{
        value:{}
    },
    reducers:{
        logInUser:(state,action)=>{
            state.value =action.payload;
        },
    }
})
export const {logInUser} =userDataSlice.actions
export default userDataSlice.reducer;