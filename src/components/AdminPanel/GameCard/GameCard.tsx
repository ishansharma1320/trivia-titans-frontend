import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GameCard = (props) => {
  const { game } = props;
  const [intervalValue, setIntervalValue] = React.useState(game.interval);
  const navigate = useNavigate();

  React.useEffect(() => {
    let intervalId;
    if (intervalValue > 0) {
      intervalId = setInterval(() => {
        setIntervalValue((prevValue) => prevValue - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [intervalValue]);

  const getDateStringFromDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleViewClick = () => {
    navigate("/home/admin/games/view", { state: { game } });
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Stack
            direction="column"
            alignItems="stretch"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              sx={{ width: "100%", marginBottom: 2 }}
              justifyContent="space-between"
            >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {game.difficulty}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {game.category}
              </Typography>
            </Stack>

            <Typography variant="h5" component="div">
              {game.gameName}
            </Typography>

            <Stack
              direction="row"
              sx={{ width: "100%", marginTop: 2 }}
              justifyContent="space-between"
            >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {game.numberOfQuestions}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {intervalValue > 0 ? (
                  `Time to start: ${intervalValue}`
                ) : (
                  <span style={{ color: "red" }}>Game has already started</span>
                )}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleViewClick}>
            View
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default GameCard;
