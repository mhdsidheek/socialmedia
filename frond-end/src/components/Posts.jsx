import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import { Card, CardContent, Typography,Box, CardHeader,
     Avatar, IconButton, CardMedia,
      CardActions, Checkbox } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {format} from "timeago.js"


export default function Post({post}) {
 
const [user , setUser] =useState({});
  
useEffect(()=>{
  const fetchUser = async() =>{
  const res= await axios.get(`users/${post.userId}`);
  setUser(res.data)
}
fetchUser()
  
},[post.userId]) 
  return (

    <Box   flex={4} p={2} >
    <Card >
     <CardHeader
       avatar={
         <Avatar  src=  {user.profilePicture} 
       aria-label="recipe">
          
         </Avatar>
       }
       action={
         <IconButton aria-label="settings">
           <MoreVert />
         </IconButton>
       }
       title={user.username}
       subheader={format(post.createdAt)}
     />
     <CardMedia
       component="img"
       height="15%"
       image="https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=600"
       alt="Paella dish"
     />
     <CardContent>
       <Typography variant="body2" color="text.secondary">
        {post?.desc}
       </Typography>
     </CardContent>
     <CardActions disableSpacing>
       <IconButton aria-label="add to favorites">
       <Checkbox  icon={<FavoriteBorder />}   checkedIcon={<Favorite sx={{color:"red"}}/>} />
       </IconButton>
       <IconButton aria-label="share">
         <Share />
         
       </IconButton>
       <span className='postcommenttext'>{post.comment}comments</span>
      
     </CardActions>
    
   </Card>
   </Box>
    
  )
}

