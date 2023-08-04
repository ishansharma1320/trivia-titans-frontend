import React, { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Grid, Box,  Typography } from '@mui/material';

export default function TeamForm() {
  // const adminEmail = localStorage.getItem('adminEmail');
  const adminEmail = "pranay@gmail.com";

  const [members, setMembers] = useState(['']);

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const addMemberField = () => {
    if (members.length < 3) {
      setMembers([...members, '']);
    }
  };

  const formHandler = useCallback((event) => {
    event.preventDefault();

    const data = {
      admin: adminEmail,
      members: members.filter((member) => member !== ''), // Filter out any empty members
    };
    console.log(JSON.stringify(data));

    fetch('https://scstzow4wc.execute-api.us-east-1.amazonaws.com/dev/app/team/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Team added successfully:', data);
      })
      .catch((error) => {
        console.error('An error occurred while adding the team:', error);
      });
  }, [adminEmail, members]);

  return (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}
  >
     <Grid item xs={3}>
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
    <Typography variant="h6" gutterBottom>
          Create a Team
        </Typography>
        <form onSubmit={formHandler}>
          {members.map((email, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Member ${index + 1} Email`}
              value={email}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}
          {members.length < 3 && (
            <Button onClick={addMemberField} variant="outlined" sx={{ mb: 2 }}>
              Add Team Member
            </Button>
          )}
          <Button sx={{ mb: 2, py: 1 }} type="submit" variant="contained" fullWidth>
            Create Team
          </Button>
        </form>
     </Box>
    </Grid>
  </Grid>

    // <Container maxWidth="xs">
    //   <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', mt: 5 }}>
        
    //   </Paper>
    // </Container>
  );
}
