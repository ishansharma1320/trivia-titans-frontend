import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import QuestionsContext from '../contexts/Questions.context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
};

export default function ModifyQuestionModal(props) {
    const { modalOpen, handleClose,formData, handleFormChange } = React.useContext(QuestionsContext);
    

  return (
    
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack spacing={2}>
            <TextField onChange={(event) => {
              handleFormChange(event);
            }} value={formData['questionText'] || ''} fullWidth label="Question Text" id="questionText" name="questionText" />
             <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData['category'] || ''}
                  label="category"
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
                  label="difficulty"
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

                  <FormControl>
                
                      <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="correctAnswerRadio"
                          value={formData["correctAnswerRadio"] || ''}
                          onChange={(event)=>{
                            handleFormChange(event);
                          }}
                      >

                         <Stack spacing={2}>
                         <Stack direction="row" spacing={2}>
                            <Box sx={{display: 'flex', flex: 1}}>
                            <FormControlLabel value="1" control={<Radio />} label="" />
                                  <TextField onChange={(event) => {

                                        handleFormChange(event)
                                  }} type="text" value={formData['answer1'] || ''} fullWidth label="Answer 1" id="answer1" name="answer1"
                                  />
                            </Box>
                             
                            <Box  sx={{display: 'flex', flex: 1}}>
                            <FormControlLabel value="2" control={<Radio />} label="" />
                                  <TextField onChange={(event) => {

                                    handleFormChange(event);
                                  }} type="text" value={formData['answer2'] || ''} fullWidth label="Answer 2" id="answer2" name="answer2"
                                    
                                  />
                            </Box>
                          </Stack>
                        
                          <Stack direction="row" spacing={2}>
                            <Box sx={{display: 'flex', flex: 1}}>
                            <FormControlLabel value="3" control={<Radio />} label="" />
                                  <TextField onChange={(event) => {

                                        handleFormChange(event)
                                  }} type="text" value={formData['answer3'] || ''} fullWidth label="Answer 3" id="answer3" name="answer3"
                                      
                                  />
                            </Box>
                             
                            <Box  sx={{display: 'flex', flex: 1}}>
                            <FormControlLabel value="4" control={<Radio />} label="" />
                                  <TextField onChange={(event) => {
                                    handleFormChange(event)

                                  }} type="text" value={formData['answer4'] || ''} fullWidth label="Answer 4" id="answer4" name="answer4"
                                      
                                  />
                            </Box>
                          </Stack>
                         </Stack>
                          
                      </RadioGroup>
                  </FormControl>
           
                <Button variant='contained' fullWidth onClick={()=>{
                    console.log(formData);
                }}> Submit </Button>

          </Stack>
        </Box>
      </Modal>
      
    
  );
}