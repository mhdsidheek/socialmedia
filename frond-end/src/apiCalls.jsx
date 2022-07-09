import axios from "axios";
import { useNavigate } from "react-router-dom";


export const LoginCall =async(userCredential,dispatch)=>{
  const nav =useNavigate()
    dispatch({type :"LOGIN_START"});
    try{
        const res =await axios.post("auth/login",userCredential);
        dispatch({type:"LOGIN_Success",payload:res.data});
         localStorage.setItem("token",res.data.token)
         localStorage.setItem("userdetails",JSON.stringify(res.data.user))
         console.log("gdrtghsgh",res.data);
        
         
    }catch(err){
        dispatch({type:"LOGIN_Fail",payload:err});
        

    }
}