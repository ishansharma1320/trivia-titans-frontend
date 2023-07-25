
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import GameCard from '../GameCard/GameCard';
import Game from '../interfaces/Game.interface';
import { useNavigate } from 'react-router-dom';
import CreateGameModal from '../modals/CreateGameModal';
import { useState } from 'react';



const games: Game[]= [
    {
        gameId: "game123",
        difficulty: "Medium",
        category: "Science",
        gameName: "Science Quiz",
        questionsCount: 10,
        createdAt: new Date("2023-07-25"),
      },
      {
        gameId: "game456",
        difficulty: "Hard",
        category: "History",
        gameName: "History Challenge",
        questionsCount: 15,
        createdAt: new Date("2023-07-20"),
      }
]

export default function GamePanel() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({questionAnswers: [{answerText: null, isCorrect: false},{answerText: null, isCorrect: false},{answerText: null, isCorrect: false},{answerText: null, isCorrect: false}]});
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const navigate = useNavigate();
    const componentsArray = [<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>,<GameCard game={games[0]}/>, <GameCard game={games[1]}/>]
    return (
        <Stack spacing={4}>

            <Stack direction="row" justifyContent="space-between">
                <Button variant='contained' onClick={()=>navigate("/home/admin/questions")}> View Questions </Button>
                <div>
                <Button variant='contained' onClick={()=>{handleOpen()}}> Create Game </Button>
                <CreateGameModal open={modalOpen} handleClose={handleClose} formData={formData}/>
                </div>
            </Stack>
            <Stack>
                <Grid container spacing={2}>
                    {componentsArray.map((component, index) => (
                        <Grid key={`component-${index}`} item xs={12} sm={6} md={4} lg={3}>

                            {component}

                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Stack>

    )
}
