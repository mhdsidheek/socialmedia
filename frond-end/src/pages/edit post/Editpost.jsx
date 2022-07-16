import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import { Card, CardContent, Typography,Box, CardHeader,
     Avatar, IconButton, CardMedia,
      CardActions, Checkbox, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {format} from "timeago.js"


export default function Editpost() {
const  PF = "http://localhost:4000/images/"
 const [post,setPost] = useState();
 const [desc,setDesc] =useState()
const postId = useParams().postId;
console.log("postid",postId);

useEffect(()=>{
    const getpost = async ()=>{
      
     const res =await axios.get(`/posts/${postId}`)
     console.log("res",res);
     setPost(res.data)
     setDesc(res.data.desc)

    }
   getpost()
},[])
const updatePost = async() =>{

    const res = await axios.put("/posts/updatepost",{
        desc,
        postId
    })
   {console.log("123",res)}
   Navigate("/");

}

const DeletePost =async () =>{
    
    console.log("delete",postId)
    const res = await axios.delete(`/posts/delete/${postId}`)
    console.log("dres",res);
    // navigate("/")
}

  return (

    <Box   flex={4} p={2} >
    <Card >
     <CardHeader
    
       action={
         <IconButton aria-label="settings">
           <MoreVert />
         </IconButton>
       }
   
     />
     <CardMedia
       component="img"
       height="15%"
       image={PF+post?.img}
       alt="Paella dish"
     />
     <CardContent>
    
       
       <TextField
           style={{marginBottom:10}} 
              sx={{ width: "100%" }}
              id="desc"
              value={desc}
              name="comments"
              rows={3}
              onChange={(e)=> setDesc(e.target.value)}
              variant="standard"
            />

     </CardContent>
     <CardActions disableSpacing>
       <Button onClick={updatePost}>
        Update
       </Button>

       <Button onClick={DeletePost}>
       Delete
       </Button>
      
      
     </CardActions>
    
   </Card>
   </Box>
    
  )
}
