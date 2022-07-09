import { AddAlarm } from '@mui/icons-material'
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'


function Online({user}) {
  return (
    <ListItem
            
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={AddAlarm}
                  src={user.profilePicture}
                />
              </ListItemAvatar>
              <ListItemText  primary={user.username} />
            </ListItemButton>
          </ListItem>
  )}


export default Online
