import {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, Avatar, FormControl, InputLabel, Select, MenuItem, Box, Button, IconButton, Grid, Paper, Badge } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deepOrange } from '@mui/material/colors';
import { MuiFileInput } from "mui-file-input";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../shared/css/DatePickerCustom.css';
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordion: {
    marginBottom: '16px',
    borderRadius: '8px', // Increase the border radius for a rounded appearance
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a box shadow for depth
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },
}));
const achievements = [
  {
    name: 'First Victory',
    description: 'Win your first game',
    icon: '🏆',
    unlocked: true,
  },
  {
    name: 'Master Explorer',
    description: 'Visit all game locations',
    icon: '🌍',
    unlocked: false,
  },
  {
    name: 'Legendary Warrior',
    description: 'Defeat the final boss',
    icon: '⚔️',
    unlocked: false,
  },
  // Add more achievements as needed
];

const AchievementCard = ({ name, description, icon, unlocked }) => {
  const classes = useStyles();
  return (
  
    <Grid item xs={6} sm={4} md={3}>
      <Paper
        elevation={3}
        style={{
          padding: '1rem',
          textAlign: 'center',
          backgroundColor: unlocked ? '#f1f1f1' : '#ccc',
          cursor: 'pointer',
        }}
      >
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        <Typography variant="body1">{description}</Typography>
      </Paper>
    </Grid>
  );
}

const ProfilePage = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState({profileInfo: false, demographicInfo: false});
  const [value, setValue] = useState(null);
  const [defaultAvatarContent, setDefaultAvatarContent] = useState({ fInitial: 'N', lInitial: 'A' });
  const [expandAccordion, setExpandAccordion] = useState({profileInfo: false, demographicInfo: false});
  const [affiliations,setAffiliations] = useState([1, 2, 3]);
  const location = useLocation();
  const { claim, email, token, uid } = location.state || {};
  const [formData, setFormData] = useState({
    username: 'john.doe',
    fname: 'John',
    lname: 'Doe',
    email: 'johndoe@example.com',
    password: '12345678',
    gender: 'M',
    dob: new Date(),
    city: 'Halifax',
    country: 'Canada'
  });

  useEffect(() => {


  }, []);

  const removeTeamAffiliations = (element) => {
    const updatedArray = affiliations.filter((item) => item !== element);
    setAffiliations(updatedArray);
  };

  const toggleAccordion = (key: string, value: boolean) => {
    setExpandAccordion((prevExpandAccordion) => ({
      ...prevExpandAccordion,
      [key]: value,
    }));
  };
  
  const handleEditClick = (key: string, value: boolean) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [key]: value,
    }));
    if(isEditing[key] === false){
      console.log(formData);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  return (

    <Stack sx={{
      width: '100%'
    }}>

<Typography variant="h4" component="h1" gutterBottom>
        My Achievements
      </Typography>
      <Stack direction='row' >
      <Grid container spacing={3} style={{marginBottom: '16px'}}>
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} {...achievement} />
        ))}
      </Grid>
      </Stack>
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4">User Information</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <Accordion className={classes.accordion} expanded={expandAccordion.profileInfo}>
            <Box sx={{ display: "flex" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ flexGrow: 1 }} onClick={()=>{toggleAccordion("profileInfo",!expandAccordion.profileInfo)}}>
                <Typography variant="h4">Profile Info</Typography>
              </AccordionSummary>
              <Box sx={{ alignSelf: 'center', marginRight: 2 }}>
                <IconButton sx={{color: '#6400fa'}} disabled={isEditing.profileInfo === false}> <SaveOutlinedIcon /> </IconButton>
                <IconButton onClick={() => {
                    handleEditClick("profileInfo", !isEditing.profileInfo);
                }} sx={{color: 'red'}}> <EditOutlinedIcon /> </IconButton>
              </Box>
            </Box>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField onChange={(event) => {
                    handleFormChange(event);
                }} value={formData['username'] || ''} fullWidth label="Username" id="email" name="username" 
                disabled={isEditing.profileInfo === false}/>
                <Stack direction="row" spacing={2}>
                  <TextField onChange={(event) => {

                    handleFormChange(event);
                    handleAvatarContentChange(event);
                  }} type="text" value={formData['fname'] || ''} fullWidth label="First Name" id="fname" name="fname"
                    onBlur={(event) => {
                        handleAvatarContentChange(event)
                    }}
                    disabled={isEditing.profileInfo === false}
                  />
                  <TextField onChange={(event) => {

                    handleFormChange(event);
                    handleAvatarContentChange(event);
                  }} value={formData['lname'] || ''} fullWidth label="Last Name" id="lname" name="lname"
                    onBlur={(event) => {
                        handleAvatarContentChange(event)
                    }} 
                    disabled={isEditing.profileInfo === false}
                    />
                </Stack>
                <TextField onChange={(event) => {

                    handleFormChange(event);
                }} value={formData['email'] || ''} fullWidth label="Email Address" id="email" name="email" 
                disabled={true}/>
                <TextField onChange={(event) => {

                    handleFormChange(event);
                }} type="password" value={formData['password'] || ''} fullWidth label="Password" id="password" name="password" 
                disabled={isEditing.profileInfo === false}/>

                <Stack direction="row" spacing={2} alignItems="center">
                  {value === null ? <Avatar sx={{ bgcolor: deepOrange[500] }}>{Object.values(defaultAvatarContent).join('')}</Avatar> : <Avatar src={value} alt="Profile Pic" />}
                  <MuiFileInput
                    placeholder='Insert an image'
                    value={value}
                    onChange={(event) => {
                        handleChange(event);
                    }}
                    style={{
                      flex: 1
                    }}
                    getInputText={(value) => value !== null ? 'Inserted. Click Again to Change' : ''}
                    inputProps={{
                      accept: "image/png, image/gif, image/jpeg"
                    }}
                    disabled={isEditing.profileInfo === false}
                  />
                </Stack>

              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion} expanded={expandAccordion.demographicInfo}>
          <Box sx={{ display: "flex" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ flexGrow: 1 }} onClick={()=>{toggleAccordion("demographicInfo",!expandAccordion.demographicInfo)}}>
              <Typography variant="h4">Demographic Info</Typography>
            </AccordionSummary>
            <Box sx={{ alignSelf: 'center', marginRight: 2 }}>
                <IconButton sx={{color: '#6400fa'}} disabled={isEditing.demographicInfo === false}> <SaveOutlinedIcon /> </IconButton>
                <IconButton onClick={() => {
                    handleEditClick("demographicInfo", !isEditing.demographicInfo);
                }} 
                sx={{color: 'red'}}> <EditOutlinedIcon /> </IconButton>
              </Box>
            </Box>
            <AccordionDetails>
              <Stack spacing={2}>
                <FormControl fullWidth disabled={isEditing.demographicInfo === false}>
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
                  }} value={formData['dob'] || ''} disabled={isEditing.demographicInfo === false}/>
                </Stack>
                <TextField onChange={(event) => {
                    handleFormChange(event);
                }} value={formData['city'] || ''} fullWidth label="City" id="city" name="city" disabled={isEditing.demographicInfo === false}/>

                <TextField onChange={(event) => {
                    handleFormChange(event);
                }} value={formData['country'] || ''} fullWidth label="Country" id="country" name="country" disabled={isEditing.demographicInfo === false}/>

              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4">Team Affiliations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {affiliations.map(item => (<Accordion className={classes.accordion} key={item}>
            <Box sx={{ display: "flex" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Team {item}</Typography>
              </AccordionSummary>
              <Box sx={{ alignSelf: 'center', marginRight: 2 }}>
                <IconButton onClick={() => removeTeamAffiliations(item)} sx={{color: '#f04462'}}> <DeleteOutlineOutlinedIcon /> </IconButton>
              </Box>
            </Box>
            <AccordionDetails>
              <Stack spacing={2}>
                <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
                  <Typography variant="body1">username1</Typography>
                </Box>
                <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
                  <Typography variant="body1">username2</Typography>
                </Box>
                <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
                  <Typography variant="body1">username3</Typography>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>))}

        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ProfilePage;
