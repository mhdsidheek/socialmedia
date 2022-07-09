import { Fab, Modal, Tooltip, styled, Typography, Avatar, TextField, Stack, ButtonGroup, Button } from '@mui/material';
import React, { useState } from 'react';
import {Add as AddIcon, DateRange, EmojiEmotions, PersonAdd, Photo, VideoCameraBack}from "@mui/icons-material"
import { Box } from '@mui/system';

const StyledModal = styled(Modal)({
    display :"flex",
    alignItems :"center",
    justifyContent :"center"

})
const UserBox = styled(Box)({
   display:"flex",
    alignItems :"center",
    gap :"10px",
    marginBottom:"20px"

})
const Add= ()=> {
    const [open ,setOpen] =useState(false)
  return (
    <>
    <Tooltip  onClick={e=>setOpen(true)} sx={{position :"fixed",
     bottom:20,
      left:{xs : "calc(50% - 20px)", md:30}}}>
    <Fab color="primary" aria-label="add">
     <AddIcon />
</Fab>
</Tooltip>
< StyledModal
  open={open}
  onClose={e=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box width={400} height={280} bgcolor={"background.default"} color={"text.primary"}p={3} borderRadius={5} >
      <Typography varient="h6" color="gray" textAlign="center">create post</Typography>
      <UserBox>
        <Avatar
        src ="/assets/persons/1.webp"
        sx={{width:30 ,height:30}}
        />
        <Typography varient="span" fontWeight={500}>Sidheek</Typography>
      </UserBox>
      <TextField
      sx={{width:"100%"}}
          id="standard-multiline-static"
          
          multiline
          rows={3}
          placeholder="Whats on your mind"
          variant="standard"
        />
        <Stack direction="row" gap={1} mt={2} mb={2}>
            <EmojiEmotions color="primary"/>
            <Photo  color="secondary"/>
            <VideoCameraBack color="success"/>
            <PersonAdd color="error"/>
        </Stack>
        <ButtonGroup
        fullWidth
        variant="contained" aria-label="outlined primary button group">
  <Button>post</Button>
  <Button sx={{width :"100px2a"}}>

    <DateRange/></Button>
  
</ButtonGroup>
  </Box>
</StyledModal>
    </>
  )
}

export default Add