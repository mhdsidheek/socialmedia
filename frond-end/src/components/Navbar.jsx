import { AppBar,
   Avatar, Badge,
    InputBase, Toolbar,
     Typography,styled, Menu, MenuItem } from '@mui/material';
import {Mail, Notifications, School} from "@mui/icons-material"
import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';




const StyledToolbar =styled(Toolbar)({
  display: "flex",
  justifyContent:"space-between"

})

const Search =styled("div")(({theme})=>({
  backgroundColor:"white",
  borderRadius : theme.shape.borderRadius,
     width:"40%",
     padding:"0 10px"
}))


const Icons =styled("div")(({theme})=>({ 
display:"none",
gap:"20px",
alignItems :"centre",
[theme.breakpoints.up("sm")]:{
  display:"flex"
}
}));
const UserBox =styled("Box")(({theme})=>({ display:"flex",
gap:"20px",
alignItems :"centre",
[theme.breakpoints.up("sm")]:{

  display:"none"
}
}))


const Navbar=()=> {
  const [open ,setOpen] =useState(false)
 
 
  const history =useNavigate()
  const logout =()=>{
    localStorage.removeItem('userdetails')
    localStorage.removeItem('token')
    history("/login")
     
  }

  return (
    <AppBar position='sticky' sx={{bgcolor:"#9c27b0"}}>
      <StyledToolbar>
       
        <Typography variant="h5" sx={{display :{xs:"none",sm:"block"}}}>Edugram</Typography>
       
        
           <School sx={{display :{xs:"block",sm:"none"}}}/>
           <Search>< InputBase placeholder="serch....."></InputBase></Search>
           <Icons>
           <Badge badgeContent={4} color="error">
          <Mail />
          </Badge>
          <Badge badgeContent={4} color="error">
          <Notifications />
          </Badge>
          <Avatar
          onClick ={e=>setOpen(true)} 
           sx={{width :30 ,height:30}} src="/assets/persons/4.webp"/>
           </Icons>
           <UserBox>
           <Avatar
           onClick ={e =>setOpen(true)}
            sx={{width :30 ,height:30}} src="/assets/persons/4.webp"/>
           <Typography variant="span">sidheek</Typography>
           </UserBox>

      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        
        open={open}
        onClose={e =>setOpen(false)}
        
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={logout} >Logout</MenuItem>
      </Menu>

      
    </AppBar>
  )
}

export default Navbar