import { Avatar, AvatarGroup, Box, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'
import {Users} from "../dummyData"
import Online from './Online'

function Rightbar() {
  return (
    <Box 
      flex={2}
       p={2}
       sx={{display:{xs:"none",sm:"block"}}}
        >
          <Box position="fixed" width={300}>
             <Typography  variant="h6" fontWeight={100}> Online friends</Typography>
             {Users.map(u =>(
                    <Online key={u.id} user={u} />
                  ))}

          </Box>
        </Box>
  )
}

export default Rightbar