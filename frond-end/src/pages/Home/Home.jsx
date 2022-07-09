import React from 'react'
import Add from '../../components/Add'
import Feed from '../../components/Feeds'
import Navbar from '../../components/Navbar'
import Rightbar from '../../components/Rightbar'
import Sidebar from '../../components/Sidebar'
import { useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";


function Home() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default Home