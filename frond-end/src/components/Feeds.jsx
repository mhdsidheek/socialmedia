import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from './Posts'

import axios from "axios"

function Feeds() {

  const [Posts ,setPosts] = useState([])

 
  useEffect(()=>{
    const fetchPosts = async() =>{
    const res= await axios.get(`posts/timeline/62bed5eaf08c390ac9c05757`)
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