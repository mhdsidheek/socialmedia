import {Box} from "@mui/material";
import Home from "./pages/Home/Home"
import { BrowserRouter,  Route, Routes, useNavigate } from "react-router-dom"
import SignUp from './pages/Signup/Signup'
import Login from './pages/login/Login'
import Editpost from "./pages/edit post/Editpost";
import { useEffect } from "react";
import Error from "./pages/Error";



const Routing =() =>{
  const navigate = useNavigate()
  useEffect(()=>{
   
    const user = localStorage.getItem("token")
  if(user){
   
  // navigate('/')
  }else{
    navigate("/login")
    
  }

  },[])
  return(
   < Routes>
     <Route path="/" element={<Home/> }/>
     <Route exact path="/login" element={<Login/> }/>
     <Route path="/signup" element={<SignUp/> }/>
     <Route   path="*" element={<Error />}/>
     <Route path="/editpost/:postId" element ={<Editpost/>}/>
    </Routes>

  )
  
}

function App() {
  
  return (
    <Box>
       <BrowserRouter>
    
      <Routing/>
    </BrowserRouter>
    </Box>
    
  );
}

export default App;
