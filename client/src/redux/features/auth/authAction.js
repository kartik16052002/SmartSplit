import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../../services/API';


export const userRegister = createAsyncThunk('auth/register',
    async({name,email,password,phone,upiId},{rejectWithValue})=>{
        try {
            const {data}= await API.post('/auth/register',{name,email,password,phone,upiId});
            if(data?.success){
                alert(data.message);
                window.location.replace('/login');
            }
            return data;
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }   
        }
    }
);


export const userLogin = createAsyncThunk('auth/login',
    async({email,password,phone,method},{rejectWithValue})=>{
        try {
            const {data}= await API.post('/auth/login',{email,phone,password,method});
            // console.log(data.user);
            if(data?.success){
                localStorage.setItem('token',data.token);
                alert(data.message);
                window.location.replace('/');
            }else{
                throw new Error(data?.message);
            }
            return data;

        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }   
        }

    }
);


export const currentUser = createAsyncThunk(
    'auth/current-user',
    async({rejectWithValue})=>{
        try {
            const res=await API.get('/auth/current-user');
            // console.log(res?.data)
            if(res?.data){
                return res?.data
            }
            
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }   
        }
    }
)