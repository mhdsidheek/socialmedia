import React from 'react'
import Add from '../../components/Add'
import Feed from '../../components/Feeds'
import Navbar from '../../components/Navbar'
import Rightbar from '../../components/Rightbar'
import Sidebar from '../../components/Sidebar'
import { useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Card from '../../components/ImageCard';


function Courses() {

  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing ={2} justifyContent="space-around">
          <Sidebar />
          
         <Card/>
         <Card/>
         <Card/>
          
          
            
        </Stack>
        

        
      </Box>
      
      

    </ThemeProvider>
    
  </>
  );
}
      
export default Courses