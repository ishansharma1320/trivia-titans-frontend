import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Typography, Container, Box } from '@mui/material';

interface GamePlayProps {
  gameId: string;
  gameName: string;
}
export const GamePlay = ({ gameId, gameName }: GamePlayProps) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10); // 10 seconds
  const [progress, setProgress] = useState(0);
  const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        setProgress((prevProgress) => prevProgress + 100 / 10);
      } else {
        clearInterval(interval);
        navigate('/home/quizgame/' + gameId, { state: { gameName } }); 
      }
    }, 1000);
  
 
  }, [timer, navigate, gameId, gameName]);

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Game Name: {gameName}</Typography>
        <Typography variant="h5">Starting in: {timer} seconds</Typography>
        <LinearProgress variant="determinate" value={progress} style={{ width: '100%', marginBottom: '20px' }} />
        <Typography variant="body1">Please wait. The game will start soon.</Typography>
        <Typography variant="h6">Team Members:</Typography>
        <ul>
          {teamMembers.map((member: string, index: number) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};
