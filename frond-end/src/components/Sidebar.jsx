import { AccountBox, Group, Home, ModeNight, School, Settings } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Sidebar({mode,setMode}) {
  const userr =useSelector((state)=>state.user.value)
  console.log("sidebar",userr);
  const userId =userr._id
  return (
   <Box 
    flex={1}
     p={2}
     sx={{display:{xs:3,sm:"block",}}}
      >
        <Box position = "fixed">

         <List>
      <ListItem disablePadding>
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <Home/>
          </ListItemIcon>
          <ListItemText primary="Homepage" />
        </ListItemButton>
      </ListItem>
      </List>
      <List>
      <ListItem disablePadding>
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <Settings/>
          </ListItemIcon>
          <ListItemText primary="settings" />
        </ListItemButton>
      </ListItem>
      </List>
      <List>
      <ListItem disablePadding>
      <Link to={`/profile/${userId}`}>
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <AccountBox/>
          </ListItemIcon>
          <ListItemText primary="profile" />
        </ListItemButton>
          </Link>
      </ListItem>
      </List>
      <List>
      <ListItem disablePadding>
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <Group/>
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItemButton>
      </ListItem>
      </List>
      <List>
      <ListItem disablePadding>
        <Link to ="/courses">
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <School/>
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        </Link>
      </ListItem>
      </List>
      <List>
      <ListItem disablePadding>
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
            <ModeNight/>
         <Switch onChange={e => setMode(mode ==="light"? "dark":"light")}/>
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItemButton>
      </ListItem>
      </List>
        </Box>
      </Box>
  )
}

export default Sidebar