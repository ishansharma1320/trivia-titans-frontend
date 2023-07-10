import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useRef, useCallback } from "react";
import sharedCSSModule from '../shared/css/shared.module.css';
// https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd

export default function ForgotPasswordForm() {

  const passwordInputElementReference: any = useRef(null);
  const confirmPasswordInputElementReference: any = useRef(null);
  
  const formHandler = useCallback(
    () => (event: any) => {
      event.preventDefault();

      const data = {
        
        
        password: passwordInputElementReference.current?.value,
        confirmPassword: confirmPasswordInputElementReference.current?.value,
        
      };

      console.log(data);
    },
    []
  );
  
  return (
    
      <>
       <form onSubmit={formHandler()} className={sharedCSSModule.login_form}>
        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Password" id="fullWidth" />
        <TextField inputRef={confirmPasswordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Confirm Password" id="fullWidth" />
        <Button  sx={{mb: 2,py:1}} type='submit' variant="contained">Submit Password</Button>
       </form>
       </>
      
    );
  }