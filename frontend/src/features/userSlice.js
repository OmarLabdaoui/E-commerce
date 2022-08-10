import {  createSlice } from "@reduxjs/toolkit";


const initialState = {
  user:null,
  username:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user=action.payload
     
    },
    setusername:(state,action)=>{
state.username=action.payload
    },
    logout:(state,action) => {
      state.user=null
      
         },  
         },
  },
);

export default userSlice.reducer;
export const {login,logout,setusername}=userSlice.actions
export const selectUser = (state)=>state.user.user
