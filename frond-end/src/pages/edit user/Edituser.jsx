import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Paper, TextField }from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { SettingsInputAntenna, SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [username,setUsername] =React.useState()
  const [newpassword,setNewpassword] =React.useState()
  const [currentpassword,setCurrentpassword] =React.useState()
  const [confirmpassword,setConfirmpassword] =React.useState()
  const userid =useParams().userId
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const  userr =useSelector((state)=>state.user.value)
 const userId =userr._id
  useEffect(()=>{
 const getUser = async()=>{
  const data =await axios.get(`/users/${userId}`)
    setUsername(data.data.username)
 }
    getUser()
  },[])

  const editProfile = async () =>{
    console.log("edit",username,  userid,)
    const res = await axios.put(`/users/updateuser`,{
      username,
      userid,
  })
  }
  const changePassword =async () =>{
    console.log("pass");
    if(newpassword === confirmpassword){
          await axios.put(`/users/updatepassword`,{
            currentpassword,
            newpassword,
            userId,
            

          })
     


    }
  }

  return (

    
    <Paper className ="card"
      
    sx={{
      display :"flex",
     height:"400px",
      flexGrow:1,
      margin :"30px auto",
      maxWidth:"700px",
      padding:"20px",
      textAlingn:"center",
      bodersolid:"5px"
      
    }}
    >
      <h2>Edit user</h2>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="User Details" {...a11yProps(0)} />
        <Tab label="Password" {...a11yProps(1)} />
        
       
      </Tabs>
      
      <TabPanel value={value} index={0}>
        
      <TextField
           style={{marginBottom:10}} 
              sx={{ width: "100%" }}
              id="desc"
              name="username"
              rows={3}
             value={username}
              variant="standard"
              onChange={(e)=>  setUsername(e.target.value)}
            />
       <button className='btn'  onClick= {editProfile}  >Update</button>
      </TabPanel>
     
        
      
      
        <Paper className="minicard"
        sx={{
          display :"flex",
          height:"300",
          flexGrow:1,
          margin :"30px auto",
          maxWidth:"300px",
          padding:"20px",
          textAlingn:"center",
          bodersolid:"5px"
          
        }}
        
        >
      <TabPanel value={value} index={1}>
      <TextField
           style={{marginBottom:10}} 
              sx={{ width: "100%" }}
              id="desc"
              placeholder='current password'
              name="currentpassword"
              rows={3}
              onChange ={(e) =>setCurrentpassword(e.target.value)}
             
              variant="standard"
            />
            <TextField
           style={{marginBottom:10}} 
              sx={{ width: "100%" }}
              id="desc"
              name="newpassword"
              rows={3}
              placeholder='New password'
              onChange={(e)=>setNewpassword(e.target.value)}
              variant="standard"
            />
             <TextField
           style={{marginBottom:10}} 
              sx={{ width: "100%" }}
              id="desc"
              name="confirmpassword"
              rows={3}
              placeholder='Confirm password'
              onChange={(e)=>setConfirmpassword(e.target.value)}
              variant="standard"
            />

            <button className='btn'  onClick={changePassword}  >Update</button>
        
      </TabPanel>
      </Paper>
     
      
    </Box>
    </Paper>
  );
}
