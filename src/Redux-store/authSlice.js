import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    authStatus:false,
    userData:{}
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getUserData: (state, action)=>{
            state.userData = action.payload
            if(action.payload.username){
                state.authStatus = true
            }else{
                state.authStatus = false
            }
        }
    }
})

export const { getUserData} = authSlice.actions
export default authSlice.reducer