import { AccountBox, Group, Home, ModeNight, School, Settings } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import React from 'react'

function Sidebar({mode,setMode}) {
  return (
   <Box 
    flex={1}
     p={2}
     sx={{display:{xs:"none",sm:"block"}}}
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
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <AccountBox/>
          </ListItemIcon>
          <ListItemText primary="profile" />
        </ListItemButton>
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
        <ListItemButton component="a" herf="#Home">
          <ListItemIcon>
         <School/>
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
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