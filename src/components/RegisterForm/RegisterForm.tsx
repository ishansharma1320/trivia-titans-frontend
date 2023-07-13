// import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import sharedCSSModule from '../shared/css/shared.module.css';
// import loginCSSModule from '../LoginForm/LoginForm.module.css';
// import { useRef, useCallback } from "react";

// // https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd

// export default function RegisterForm() {

//   const emailInputElementReference: any = useRef(null);
//   const passwordInputElementReference: any = useRef(null);

//   const formHandler = useCallback(
//     () => (event: any) => {
//       event.preventDefault();

//       const data = {

//         email: emailInputElementReference.current?.value,
//         password: passwordInputElementReference.current?.value,

//       };

//       console.log(data);
//     },
//     []
//   );

//   return (

//       <>
//        <form onSubmit={formHandler()} className={sharedCSSModule.login_form}>
//        <TextField inputRef={emailInputElementReference} sx={{mb: 2}}fullWidth label="Username" id="Email Address" />
//        <TextField inputRef={emailInputElementReference} sx={{mb: 2}}fullWidth label="Email Address" id="Email Address" />
//        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Password" id="fullWidth" />
//        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Gender" id="fullWidth" /> // dropdown
//        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Date of Birth" id="fullWidth" /> // calendar
//        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="City" id="fullWidth" /> 
//        <TextField inputRef={passwordInputElementReference} sx={{mb: 2}} type='password' fullWidth label="Country" id="fullWidth" /> // dropdown
//         <Button component={NavLink} to='/forgotPassword' sx={{alignSelf: 'end', fontSize: '12px'}}> Forgot Password</Button>
//         <Button  sx={{mb: 2,py:1}} type='submit' variant="contained">Login</Button>
//        </form>
//        <div className={loginCSSModule.social_media_button_container}>
//         <FacebookSignUpButton onClick={() => console.log("Facebook Login Button")} />
//         <GoogleSignUpButton onClick={() => console.log("Google Login Button")} />
//        </div>
//        </>

//     );
//   }

import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Container, Stack, Avatar, FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { MuiFileInput } from "mui-file-input";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './DatePickerCustom.css';
import { FacebookSignUpButton,GoogleSignUpButton } from '../socials/customButtons';
const steps = ['Profile Info', 'Demographic Info', 'Security Questions']; // Add your desired steps here

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [signUpWithEmailStepper, setSignUpWithEmailStepper] = useState(false);
  const [formData, setFormData] = useState({}); // Store form data
  const [defaultAvatarContent, setDefaultAvatarContent] = useState({ fInitial: 'N', lInitial: 'A' });
  const [value, setValue] = useState(null);

  const handleChange = (file) => {

    let reader = new FileReader();
    reader.onload = () => {
      setValue(reader.result);
      formData['profile_pic'] = reader.result;
      setFormData(formData);
    }

    if (file) {
      reader.readAsDataURL(file);
    }

    // setValue(newValue);
  };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepSubmit = () => {
    console.log(formData); // Log form data on submission
  };


  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAvatarContentChange = (event) => {
    let key = event.target.name;
    let keyExists = formData[key] !== null && formData[key] !== undefined;
    let validValue = keyExists && formData[key].length > 0 && isNaN(parseFloat(formData[key]))
    if (validValue) {
      if (key === 'fname') {
        let value = event.target.value;
        defaultAvatarContent.fInitial = value[0];
      }
      if (key === 'lname') {
        let value = event.target.value;
        defaultAvatarContent.lInitial = value[0];
      }
      setDefaultAvatarContent(defaultAvatarContent);
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <TextField onChange={(event) => {
              handleFormChange(event);
            }} value={formData['username'] || ''} fullWidth label="Username" id="email" name="username" />
            <Stack direction="row" spacing={2}>
              <TextField onChange={(event) => {

                handleFormChange(event);
                handleAvatarContentChange(event);
              }} type="text" value={formData['fname'] || ''} fullWidth label="First Name" id="fname" name="fname"
                onBlur={(event) => {
                  handleAvatarContentChange(event)
                }}
              />
              <TextField onChange={(event) => {

                handleFormChange(event);
                handleAvatarContentChange(event);
              }} value={formData['lname'] || ''} fullWidth label="Last Name" id="lname" name="lname"
                onBlur={(event) => {
                  handleAvatarContentChange(event)
                }} />
            </Stack>
            <TextField onChange={(event) => {

              handleFormChange(event);
            }} value={formData['email'] || ''} fullWidth label="Email Address" id="email" name="email" />
            <TextField onChange={(event) => {

              handleFormChange(event);
            }} type="password" value={formData['password'] || ''} fullWidth label="Password" id="password" name="password" />

            <Stack direction="row" spacing={2} alignItems="center">
              {value === null ? <Avatar sx={{ bgcolor: deepOrange[500] }}>{Object.values(defaultAvatarContent).join('')}</Avatar> : <Avatar src={value} alt="Profile Pic" />}
              <MuiFileInput
                placeholder='Insert an image'
                value={value}
                onChange={(event) => {
                  handleChange(event);
                }}
                getInputText={(value) => value !== null ? 'Inserted. Click Again to Change' : ''}
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg"
                }}
              />
            </Stack>

          </Stack>

        );
      case 1:
        return (
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData['gender'] || ''}
                label="Gender"
                name="gender"
                onChange={(event) => {

                  handleFormChange(event);
                }}
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} alignItems="center">

              <Typography variant="button" gutterBottom> DOB</Typography>
              <DatePicker onChange={(event) => {
                let passingEvent = { target: { name: "dob", value: event } }
                handleFormChange(passingEvent);
              }} value={formData['dob'] || ''} />
            </Stack>
            <TextField onChange={(event) => {
              handleFormChange(event);
            }} value={formData['city'] || ''} fullWidth label="City" id="city" name="city" />

            <TextField onChange={(event) => {
              handleFormChange(event);
            }} value={formData['country'] || ''} fullWidth label="Country" id="country" name="country" />

          </Stack>
        );
      case 2:
        return (<Stack spacing={2}>
          <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
            <Stack spacing={1}>
              <FormControl fullWidth>
                <InputLabel>Security Question 1</InputLabel>
                <Select
                  value={formData['sec_q1'] || ''}
                  label="Security Question 1"
                  name="sec_q1"
                  onChange={(event) => {
                    handleFormChange(event);
                  }}
                >
                  <MenuItem value={"option 1"}>option 1</MenuItem>
                  <MenuItem value={"option 2"}>option 2</MenuItem>
                  <MenuItem value={"option 3"}>option 3</MenuItem>
                </Select>
              </FormControl>
              <TextField onChange={(event) => {
                handleFormChange(event);
              }} value={formData['sec_q1_ans'] || ''} fullWidth label="Security Question 1 Answer" id="sec_q1_ans" name="sec_q1_ans"></TextField>

            </Stack>
          </Box>
          <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
            <Stack spacing={1}>
              <FormControl fullWidth>
                <InputLabel>Security Question 2</InputLabel>
                <Select
                  value={formData['sec_q2'] || ''}
                  label="Security Question 2"
                  name="sec_q2"
                  onChange={(event) => {
                    handleFormChange(event);
                  }}
                >
                  <MenuItem value={"option 1"}>option 1</MenuItem>
                  <MenuItem value={"option 2"}>option 2</MenuItem>
                  <MenuItem value={"option 3"}>option 3</MenuItem>
                </Select>
              </FormControl>
              <TextField onChange={(event) => {
                handleFormChange(event);
              }} value={formData['sec_q2_ans'] || ''} fullWidth label="Security Question 2 Answer" id="sec_q2_ans" name="sec_q2_ans"></TextField>

            </Stack>
          </Box>
          <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
            <Stack spacing={1}>
              <FormControl fullWidth>
                <InputLabel>Security Question 3</InputLabel>
                <Select
                  value={formData['sec_q3'] || ''}
                  label="Security Question 3"
                  name="sec_q3"
                  onChange={(event) => {
                    handleFormChange(event);
                  }}
                >
                  <MenuItem value={"option 1"}>option 1</MenuItem>
                  <MenuItem value={"option 2"}>option 2</MenuItem>
                  <MenuItem value={"option 3"}>option 3</MenuItem>
                </Select>
              </FormControl>
              <TextField onChange={(event) => {
                handleFormChange(event);
              }} value={formData['sec_q3_ans'] || ''} fullWidth label="Security Question 3 Answer" id="sec_q3_ans" name="sec_q3_ans"></TextField>

            </Stack>
          </Box>
        </Stack>)
      default:
        return null;
    }
  };

  return (
    <Container fixed>
      

      
      {signUpWithEmailStepper ? (<>
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2em 0'
        }}>{renderStepContent(activeStep)}</div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Button onClick={()=>{
            if(activeStep > 0){
              handleBack()
            } else {
              setSignUpWithEmailStepper(false)
            }
          }}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>) : (
            <Button variant="contained" color="primary" onClick={handleStepSubmit}>
              Submit
            </Button>
          )}

        </div>
      </div>
      </>): <>
      <Stack spacing={2}>
        <Button variant="contained" color="primary" onClick={()=>{
          setSignUpWithEmailStepper(!signUpWithEmailStepper)
        }} style={{marginLeft: 5, marginRight: 5}}>
          Sign Up with Email
        </Button>
      <Stack direction="row" spacing={2}>
         <FacebookSignUpButton onClick={() => console.log("Facebook Login Button")} />
         <GoogleSignUpButton onClick={() => console.log("Google Login Button")} />
         </Stack>
      </Stack>
      </>}
    </Container>
  );
};

export default RegisterForm;
