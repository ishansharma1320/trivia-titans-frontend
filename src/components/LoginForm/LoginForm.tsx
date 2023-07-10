import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import classes from './LoginForm.module.css';
import { useRef, useCallback } from "react";
// https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd

export default function LoginForm() {

  const emailInputElementReference: any = useRef(null);
  const passwordInputElementReference: any = useRef(null);
  
  const formHandler = useCallback(
    () => (event: any) => {
      event.preventDefault();

      const data = {
        
        email: emailInputElementReference.current?.value,
        password: passwordInputElementReference.current?.value,
        
      };

      console.log(data);
    },
    []
  );
  
  return (
      <Box
        sx={{
          width: 500,
          py: 20,
          px: 10,
          maxWidth: '100%',
          boxShadow: 12,
          border: "1px solid grey",
        }}
      >
       <form onSubmit={formHandler()} className={classes.login_form}>
       <TextField inputRef={emailInputElementReference} sx={{mb: 2}}fullWidth label="Email Address" id="Email Address" />
        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Password" id="fullWidth" />
        <Button component={NavLink} to='/forgotPassword' sx={{alignSelf: 'end', fontSize: '12px'}}> Forgot Password</Button>
        <Button  sx={{mb: 2,py:1}} type='submit' variant="contained">Login</Button>
       </form>
       <div className={classes.social_media_button_container}>
        <FacebookLoginButton onClick={() => console.log("Facebook Login Button")} />
        <GoogleLoginButton onClick={() => console.log("Google Login Button")} />
       </div>
      </Box>
    );
  }