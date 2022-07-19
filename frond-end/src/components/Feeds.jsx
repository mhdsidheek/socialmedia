import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from './Posts'

import axios from "axios"

function Feeds() {

  const [Posts ,setPosts] = useState([])

 
  useEffect(()=>{
    const fetchPosts = async() =>{
     const user = localStorage.getItem('userdetails')
     const Token =localStorage.getItem('token')
  const   userinfo =JSON.parse(user)
  // console.log(Token)

    const res= await axios.get(`/posts/timeline/${userinfo._id}`,
    {
    
      headers :{
        "auth" :Token
      }
      
    }
    )
    setPosts(res.data)
  }
  fetchPosts()
    
  },[])  
  return (
    <Box flex={4} p ={2}>
     
  {Posts.map((p)=>(
    <Post key={p._id} post ={p}/>
  ))}
         
    </Box>

  )
}

export default Feeds