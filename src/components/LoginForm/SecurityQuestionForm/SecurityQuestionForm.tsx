import TextField from '@mui/material/TextField';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import sharedCSSModule from '../../shared/css/shared.module.css';
import { useRef, useCallback, useState } from "react";
// https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd

export default function SecurityQuestionForm() {
  const [secQuestion,setSecQuestion] = useState("What is your name?");
  const securityQuestionAnswerRef: any = useRef(null);
  const passwordInputElementReference: any = useRef(null);
  
  const formHandler = useCallback(
    () => (event: any) => {
      event.preventDefault();

      const data = {
        
        securityQuestionAnswer: securityQuestionAnswerRef.current?.value,
        
      };

      console.log(data);
    },
    []
  );
  
  return (
    
      <>
      <form onSubmit={formHandler()} className={sharedCSSModule.login_form}>
      
            <Stack spacing={1}>
            <TextField disabled value={secQuestion} fullWidth label="Security Question" id="sec_q" name="sec_q"></TextField>

            <TextField inputRef={securityQuestionAnswerRef} fullWidth label="Security Question Answer" id="sec_q_ans" name="sec_q_ans" type="password"></TextField>

            <Button  sx={{mb: 2,py:1}} type='submit' variant="contained">Submit</Button>
            </Stack>
      </form>

       </>
      
    );
  }