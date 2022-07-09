import {Box} from "@mui/material";
import Home from "./pages/Home/Home"
import { BrowserRouter,  Route, Routes, useNavigate } from "react-router-dom"
import SignUp from './pages/Signup/Signup'
import Login from './pages/login/Login'
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";



const Routing =() =>{
  const navigate = useNavigate()
  useEffect(()=>{
   
    const user = localStorage.getItem("userdetails")
  if(user){
   
  navigate('/')
  }else{
    navigate("/login")
    
  }

  },[])
  return(
   < Routes>
     <Route path="/" element={<Home/> }/>
     <Route path="/login" element={<Login/> }/>
     <Route path="/signup" element={<SignUp/> }/>
    </Routes>

  )
  
}

function App() {
  const {user} =useContext(AuthContext)
  return (
    <Box>
       <BrowserRouter>
    
      <Routing/>
    </BrowserRouter>
    </Box>
    
  );
}

export default App;
