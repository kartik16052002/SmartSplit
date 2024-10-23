import {createSlice} from '@reduxjs/toolkit';
import {  currentUser, userLogin, userRegister } from './authAction';

const token = localStorage.getItem('token')?localStorage.getItem('token'):null;

const initialState= {
    // isAuthenticated: false,
    loading:false,
    user: null,
    token,
    error:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers: {},
    extraReducers:(builder)=>{
        // login user
        builder.addCase(userLogin.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(userLogin.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
            state.token=payload.token;
        });
        builder.addCase(userLogin.rejected,(state,{payload})=>{
            state.loading=false;
            // console.log("rejected login"+payload);
            state.error=payload;
        });
        // Register user
        builder.addCase(userRegister.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(userRegister.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
        });
        builder.addCase(userRegister.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload.error;
        });
        // current user
        builder.addCase(currentUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(currentUser.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
        });
        builder.addCase(currentUser.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload.error;
        });
    },
    
});

export default authSlice;