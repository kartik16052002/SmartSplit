import { Children, useEffect } from "react";
import {useDispatch} from "react-redux";
import API from "../services/API";
import { currentUser } from "../redux/features/auth/authAction";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const dispatch = useDispatch();

    const getUser = async ()=>{
        try {
            const {data} = await API.get("/auth/current-user");
            if(data?.success){
                // console.log(data)
                dispatch(currentUser(data))
            }
        } catch (error) {
            localStorage.clear();
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser();
    })

    if(localStorage.getItem("token")){
        return children;
    }else{
        return <Navigate to="/login"/>
    }
}

export default ProtectedRoute;