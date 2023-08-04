import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Button, Grid, Paper, LinearProgress, Typography } from '@mui/material';


interface Answer {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  questionAnswers: Answer[];
  tags: string[];
}

const QuizGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30); // 30 seconds
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const location = useLocation<{ gameName: string }>();
  const gameName = location.state?.gameName;
  useEffect(() => {
    const apiUrl = 'https://q821rm5zx5.execute-api.us-east-1.amazonaws.com/prod/getgamedata';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: gameId }),
    })
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('An error occurred while fetching questions:', error));
  }, [gameId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        if (selectedOption && questions[questionIndex].questionAnswers.find((ans) => ans.answerText === selectedOption)?.isCorrect) {
          setIsAnswerCorrect(true);
        } else {
          setIsAnswerCorrect(false);
        }
        setTimer(30); // Reset the timer for the next question
      }
    }, 1000);

    if (questionIndex >= questions.length && questions.length > 0) {
      clearInterval(interval);
      setIsGameFinished(true);
    }

    return () => clearInterval(interval);
  }, [timer, questionIndex, questions, selectedOption]);

  const handleAnswerClick = (option: string, isCorrect: boolean) => {
    setSelectedOption(option);
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 100);
    }
  };

  useEffect(() => {
    if (isAnswerCorrect !== null) {
      const timeout = setTimeout(() => {
        setSelectedOption(null);
        setIsAnswerCorrect(null);
        setQuestionIndex((prevIndex) => prevIndex + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isAnswerCorrect]);

  if (isGameFinished) {
    return (
      <Box textAlign="center">
        <Typography variant="h4">Game Over!</Typography>
        <Typography variant="h5">Your final score is: {score}</Typography>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box textAlign="center">
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 1 ,width: '100vw', height: '100vh', overflow: 'auto' }}>
    <Typography variant="h4"> {gameName}</Typography>
    <Typography variant="h5">Timer: {timer} seconds</Typography>
    <LinearProgress variant="determinate" value={(30 - timer) * (100 / 30)} style={{ width: '100%', marginBottom: '20px' }} />
    
    <Typography variant="h6" gutterBottom component="div">
      Question
    </Typography>
    <Typography variant="body1" gutterBottom component="div">
      {questions[questionIndex]?.questionText}
    </Typography>
    <Box sx={{ display: 'inline-flex', gap: 1, marginBottom: 2 }}>
      {questions[questionIndex]?.tags.map((label, index) => (
        <Paper key={`tag-${index}`} elevation={3} style={{ padding: '0.5em', height: 'fit-content', backgroundColor: '#ffabab' }}>
          <Typography variant='body1' sx={{ fontSize: '12px' }}> {label} </Typography>
        </Paper>
      ))}
    </Box>
    <Grid container spacing={2}>
      {questions[questionIndex]?.questionAnswers.map((answer, index) => (
        <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              backgroundColor: selectedOption === answer.answerText
                ? isAnswerCorrect
                  ? '#adffad' // Green if correct
                  : 'red' // Red if incorrect
                : 'inherit',
              color: 'black' // Font color black
            }}>
            <Button variant="text" disabled={selectedOption !== null} onClick={() => handleAnswerClick(answer.answerText, answer.isCorrect)}>
              
              <Typography>{answer.answerText}</Typography>
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Typography variant="h6">Score: {score}</Typography>
  </Box>
  );
};

export default QuizGame;

