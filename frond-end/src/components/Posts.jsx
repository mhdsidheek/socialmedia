import { Edit, Favorite, FavoriteBorder, LteMobiledata, MoreVert, Send, Share } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send';
import { Card, CardContent, Typography,Box, CardHeader,
     Avatar, IconButton, CardMedia,
      CardActions, Checkbox, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {format} from "timeago.js"
import { ToastContainer, toast } from 'react-toastify';


export default function Post({post}) {
  // console.log("like",post.likes?.length);
 const PF = "http://localhost:4000/images/";
 const lik = post.likes?.length
 
 const [like,setLike] = useState(lik)
 console.log("hhhhlik",like)
//  let isliked,setIsliked;
var [isliked ,setIsliked] =useState(false)

 
 const comm=post.comments
 const [commen,setCommen] = useState(comm)
const [user , setUser] =useState({});
const [text ,setText] = useState(null)
const Token=localStorage.getItem("token");

const userr = useSelector((state)=> state.user.value)
     




const likeHandler =async () =>{
  console.log("postid",post._id)
  try{
    await axios.put( "/posts/"+post._id+"/like",{
      userId:userr._id,
      
    })

  }catch(err){console.log(err)}
  setLike(isliked ? like -1 : like +1)
  setIsliked(!isliked)
}
useEffect(()=>{

 
  const fetchUser = async() =>{
    
  const res= await axios.get(`users/${userr._id}`,
  
  {
    
    headers :{
     "auth" : localStorage.getItem("token")
    } 
  }
 
  )
   
 setUser(res.data)
}
fetchUser()
  
},[]) 

 const makeComment = async (text,postId,) =>{
  console.log("make",text,postId,userr.username);
   const result= await axios.patch("/posts/comment",{
      text,
      postId,
      username:userr.username
    })
    setCommen(result.data.comments)
    setText("")
 }

 
 console.log(post.comments,"hgfjcjc")
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
        <Link to={`/editpost/${post._id}`} >
         <IconButton aria-label="settings">
           <Edit  />
         </IconButton>
         </Link>
         

       }
       title={user.username}
       subheader={format(post.createdAt)}
     />
    
     <CardMedia
       component="img"
       height="15%"
       image={PF + post.img}
       alt="Paella dish"
     />
     <CardContent>
       <Typography variant="body2" color="text.secondary">
        {post?.desc}
       </Typography>
     </CardContent>
     <CardActions disableSpacing>
       <IconButton aria-label="add to favorites">
       <Checkbox  icon={<FavoriteBorder />}  onClick={ likeHandler } checkedIcon={<Favorite sx={{color : "red"}}/>} />
       </IconButton>
       
       <span > {like +"   peopleliked" }</span>

       
     
       
     </CardActions>
     <CardActions>
     
     
    <CardContent sx={{marginBottom:3}}>
    {commen?.map((record) => {
          return (
            <div>
              <span style={{ fontWeight: "500" }}>{record.username}</span>{" "}
              <span>:</span>
              {record.text}
            </div>
          );
        })}
        </CardContent>

</CardActions>
     
     <form onSubmit={(e)=>{
        e.preventDefault()
        makeComment(e.target[0].value,post._id);
       }}>
        <TextField
           style={{marginBottom:10}} 
              sx={{ width: "100%" }}
              id="desc"
              name="comments"
              rows={3}
              placeholder={
                "put comments"
              }
                value={text}
              variant="standard"
            />
            <Send  type="submit"  style={{marginRight:"30"}}/>
       </form>
       
    
   </Card>
   <ToastContainer />
   </Box>
    
  )
}

