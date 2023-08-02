import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import GameCard from "../GameCard/GameCard";
import Game from "../interfaces/Game.interface";
import { useNavigate } from "react-router-dom";
import CreateGameModal from "../modals/CreateGameModal";

const GamePanel: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    questionAnswers: [
      { answerText: null, isCorrect: false },
      { answerText: null, isCorrect: false },
      { answerText: null, isCorrect: false },
      { answerText: null, isCorrect: false },
    ],
  });
  const [games, setGames] = useState<Game[]>([]); // Add games state

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();
  //   const componentsArray = [<GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />, <GameCard game={games[0]} />, <GameCard game={games[1]} />];

  // Function to fetch data from API and update games state
  const fetchGamesData = async () => {
    try {
      const response = await fetch(
        "https://4lqzs6o57b.execute-api.us-east-1.amazonaws.com/prod/getgamelist"
      ); // Replace with your actual API endpoint
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Call fetchGamesData function when the component mounts for the first time
    fetchGamesData();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => navigate("/home/admin/questions")}
        >
          {" "}
          View Questions{" "}
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/home/admin/dashboard")}
        >
          {" "}
          Game Dashboard{" "}
        </Button>
        <div>
          <Button variant="contained" onClick={handleOpen}>
            {" "}
            Create Game{" "}
          </Button>

          <CreateGameModal
            open={modalOpen}
            handleClose={handleClose}
            formData={formData}
          />
        </div>
      </Stack>
      <Stack>
        <Grid container spacing={2}>
          {games.map((game, index) => (
            <Grid key={`game-${index}`} item xs={12} sm={6} md={4} lg={3}>
              <GameCard game={game} />
            </Grid>
          ))}

          {/* {componentsArray.map((component, index) => (
            <Grid key={`component-${index}`} item xs={12} sm={6} md={4} lg={3}>
              {component}
            </Grid>
          ))} */}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default GamePanel;
