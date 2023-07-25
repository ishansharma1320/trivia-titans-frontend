import { useState,useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Container, Stack, Avatar, FormControl, InputLabel, MenuItem, Select, Typography, Box, Accordion, AccordionSummary, AccordionDetails, IconButton, FormGroup, FormControlLabel, Checkbox, RadioGroup, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questionsData } from '../interfaces/Question.interface';
import QuestionDetail from '../shared/QuestionDetail';
const steps = ['Game Metadata', 'Select Questions']; // Add your desired steps here

const GameStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const [formData, setFormData] = useState({}); // Store form data
  const [questions, setQuestions] = useState(questionsData);
  
  

  const handleNext = () => {
   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckChangeFormData = () => {
    
    let selectedQuestions = questions.filter(item=>item.checked);
    console.log(selectedQuestions);
    let event = {target: {name: "questions", value: selectedQuestions}};
    handleFormChange(event);
     // Log form data on submission
};

const handleStepSubmit = () =>{
    console.log(formData);
}



  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    
  };

  const handleCheckChange = (index) =>{
    let previousQuestionsData = [...questionsData];
    previousQuestionsData[index].checked = !previousQuestionsData[index].checked;
    setQuestions(previousQuestionsData)
    handleCheckChangeFormData();
  }
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          // repeated
          <Stack spacing={2}>
            <TextField onChange={(event) => {
              handleFormChange(event);
            }} value={formData['gameName'] || ''} fullWidth label="Game Name" id="gameName" name="gameName" />
            <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData['category'] || ''}
                label="Category"
                name="category"
                onChange={(event) => {

                  handleFormChange(event);
                }}
              >
                <MenuItem value={"option 1"}>option 1</MenuItem>
                <MenuItem value={"option 2"}>option 2</MenuItem>
                <MenuItem value={"option 3"}>option 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={formData['difficulty'] || ''}
                label="Difficulty"
                name="difficulty"
                onChange={(event) => {

                  handleFormChange(event);
                }}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
              </Select>
            </FormControl>
            </Stack>
            <TextField onChange={(event) => {

              handleFormChange(event);
            }} value={formData['questionsCount'] || ''} fullWidth label="No. of Questions" id="questionsCount" name="questionsCount" type='number' />
            

          </Stack>

        );
      case 1:
        return (
          
            <FormGroup>
                <Stack spacing={2}>
                    {questions.map((item,index) => {
                        return (
                            <Accordion key={item.questionId}>

                                <Box sx={{ display: "flex" }} >
                                    <Box sx={{ alignSelf: 'center', marginRight: 2 }}>
                                        <Checkbox checked={item.checked} onChange={()=>{
                                            handleCheckChange(index);
                                        }}/>
                                    </Box>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ marginLeft: 2 }} />} sx={{ flexGrow: 1 }} >

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                                            <Typography variant="h6">{item.questionText}</Typography>
                                            <Typography variant='body1'>{item.difficulty}</Typography>

                                        </Box>
                                    </AccordionSummary>

                                </Box>
                                <AccordionDetails>
                                    <QuestionDetail row={item}></QuestionDetail>
                                </AccordionDetails>
                            </Accordion>

                        )
                    })}

                </Stack>
            </FormGroup>
      
            
   
        );

      default:
        return null;
    }
  };

  return (
    <Container fixed>
      <>
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '2em 0' }}>
      {renderStepContent(activeStep)}
</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Button onClick={()=>{
            if(activeStep > 0){
              handleBack()
            } 
          }} disabled={activeStep === 0}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext} >
              Next
            </Button>) : (
            <Button variant="contained" color="primary" onClick={handleStepSubmit} 
            disabled={
                formData["questions"] === undefined || formData["questions"] === null || 
                (formData["questionsCount"] === undefined) ||
                (Array.isArray(formData["questions"]) && formData["questions"].length < parseInt(formData["questionsCount"], 10))
              } data-condition={Array.isArray(formData["questions"]) && formData["questions"].length < parseInt(formData["questionsCount"], 10)}>
              Submit
            </Button>
          )}

        </div>
      </div>
      </>
    </Container>
  );
};

export default GameStepperForm;
