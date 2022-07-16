import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import { color } from '@mui/system';
import {useDispatch} from "react-redux";
import { logInUser } from "../../Redux/slices/userdata"

export default function Login() {

  const [err,seterr]=useState();
  const email = React.useRef();
  const password =React.useRef();
 const  navigate=useNavigate()
 const dispatch = useDispatch();
 
  const handleSubmit =async (event) => {
    event.preventDefault();
 try{
   const  
   userCredential=({email:email.current.value, password:password.current.value})
    const res =await axios.post("auth/login",userCredential);
    console.log("amal",res);
    
   localStorage.setItem("userdetails",JSON.stringify(res.data.user))
   localStorage.setItem("token",res.data.token)
   console.log("res.data",res.data.token,res.data.user)

   navigate('/')
   dispatch(logInUser(res.data.user))
  }catch(err){
    console.log("koooi",err.response.data);
    seterr(err.response.data)
  }
     
  
   
  };

  return (
   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* <span style={{color:"red"}}>{err}</span> */}
          <Typography component="h1" variant="h5">
            Login 
          </Typography>
          <form    onSubmit={handleSubmit}>
          <Box   noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={password}

              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2  }}
      

            >
             Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link to ="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </form>
        </Box>
      
      </Container>
   
  );
}