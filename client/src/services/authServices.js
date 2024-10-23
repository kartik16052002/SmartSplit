import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store"

export const  handleRegister=( e, email, name, phone, password, upiId, confirmPassword)=>{
    e.preventDefault();
    try {
        if(!name || !email || !password || !upiId || !confirmPassword || !phone){
            throw new Error('All fields are required');
        }
        if(confirmPassword!==password){
            throw new Error('Passwords do not match');
        }
        store.dispatch(userRegister({name,email,password,upiId,phone}));
        
    } catch (error) {
        console.log(error);
    }

}

export const  handleLogin=(e,email, phone, password, method )=>{
    e.preventDefault();
    try {
        if((!email && !phone) || !password){
            throw new Error('All fields are required');
        }
        store.dispatch(userLogin({email,phone,password,method}));
        
    } catch (error) {
        console.log(error);
    }

}