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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import {useNavigate,Link} from "react-router-dom";
import axios from "axios"
import {useForm} from  "react-hook-form"




const theme = createTheme();

export default function SignUp() {
  const {register ,handleSubmit,formState:{errors},trigger,reset} = useForm(); 

  const username =useRef();
  const email =useRef();
  const password =useRef();
  const passwordAgain =useRef();
  const history =useNavigate();
const onSubmit =(data)=>{
  console.log(data);
}
console.log(errors);
  const handleSubmits =async (event) => {
    event.preventDefault();
    if(passwordAgain.current.value !==password.current.value){
      password.current.setCustomValidity("Passwords don't match");
    }
      else{
        const user ={
          username :username.current.value,
          email :email.current.value,
          password :password.current.value
        }
        try{

       const res=   await axios.post("/auth/register",user)
       console.log("signup",res);
          history("/login")
        }catch(err){
          console.log(err);
        }
      }
    }
   
   

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit) && handleSubmits}>
          <Box  noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="username"
                 {...register("username",{required:"user name is required"})} 
                  fullWidth
                  id="firstName"
                  label="User Name"
                  autoFocus
                  inputRef={username}
                  onKeyUp={()=>{
                    trigger("username")
                  }}

                />
                
                {errors.username &&(<small style={{color:"red"}} >{errors.username.message}</small>)}
              
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={email}
                  type="email"
                  {...register("email",{required:"email is required",
                  pattern:{
                    value:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                     message:"invalid email"
                  }
                })}
                onKeyUp={()=>{
                  trigger("email")
                }}

                
                />
               
               {errors.email && (<small style={{color:"red"}} >{errors.email.message}</small>)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={password}
                  {...register("password",{required:"password is required ",
                  minLength:{
                    value :6,
                    message:"minimum required 6 charactor"

                  }
                })}
                  onKeyUp ={()=>{
                    trigger("password")
                  }}
                />
                
                {errors.password && (<small style={{color:"red"}} >{errors.password.message}</small>)}
              </Grid>
              <Grid item xs={12}>
                <TextField
                
                  fullWidth
                  name="passwordAgain"
                  label="confirm password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordAgain}
                  {...register("passwordAgain",{required:"confirm password is required",

                  minLength:{
                    value:6,
                    message:"minimum length six charactor"
                  }
                
                })}
                  onKeyUp ={()=>{
                    trigger("passwordAgain")
                  }}
                />
                {errors.passwordAgain && (<small style={{color:"red"}} >{errors.passwordAgain.message}</small>)}
                
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          </form>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}