import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  IconButton,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PermMedia,
  PersonAdd,
  SignalCellularNull,
  VideoCameraBack,
} from "@mui/icons-material";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios"
import { useSelector } from "react-redux";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "2",
});



function Add() {
  const user = useSelector((state)=> state.user.value)
     console.log("redux",user);
  const [open, setOpen] = useState(false);
  const desc =useRef();
 
  const [file,setFile] = useState({});
  console.log("fileme",file);


  const submitHandler = async(e) =>{
    e.preventDefault()
    const newPost ={
      userId:user._id,
      desc:desc.current.value  
    }
   
    if(file){
      const data= new FormData();
      const fileName = Date.now() + file.name;
      console.log("name",fileName);
      data.append("name",fileName);
      data.append("file",file);
      newPost.img =fileName;
      console.log("new Post",newPost);
      try{
        console.log("data",data)
        await axios.post("/upload",data)
      }catch(err){
        console.log(err);
      }
    }
    try{
      console.log("new2",newPost);
     await axios.post("/posts",newPost)
     window.location.reload()
    }catch(err){
      console.log(err);

    }
  }

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <IconButton>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </IconButton>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create Post
          </Typography>
          <UserBox>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Typography variant="span">{user.username}</Typography>
          </UserBox>
          <form onSubmit={submitHandler}>
            <TextField
              sx={{ width: "100%" }}
              id="desc"
              name="desc"
              multiline
              rows={3}
              placeholder={
                "What's on your mind ?"
              }
              inputRef= {desc}
              variant="standard"
            />
            <Stack direction="row" gap={1} mt={2} mb={3}>
              <EmojiEmotions />
              <label   htmlFor='file' >
        <PermMedia/>
        <input style={{display:'none'  }}  type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e)=>setFile(e.target.files[0])} />
        </label>
              <VideoCameraBack color="success" />
              <PersonAdd color="error" />
            </Stack>
            {/* <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files)} /> */}
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button sx={{bgcolor:"black"}} type="submit">Post</Button>
            </ButtonGroup>
          </form>
        </Box>
      </StyledModal>
    </>
  );
}

export default Add;