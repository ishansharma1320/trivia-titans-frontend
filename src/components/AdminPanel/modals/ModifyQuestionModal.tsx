import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import QuestionsContext from "../contexts/Questions.context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

export default function ModifyQuestionModal(props) {
  const { modalOpen, handleClose, formData, handleFormChange } =
    React.useContext(QuestionsContext);

  const [options, setOptions] = React.useState([]);
  const [correctanswer, setCorrectanswer] = React.useState("");

  const questions = [
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
      difficulty: "",
      category: "",
    },
  ];

  const [requestbody, setRequestbody] = React.useState({ questions: [] });
  const [makeapicall, setMakeapicall] = React.useState(false);

  const handleSubmit = () => {
    console.log("Options: ", options);
    console.log("Correct Answer: ", correctanswer);
    console.log(formData);
    setOptions([
      formData.answer1,
      formData.answer2,
      formData.answer3,
      formData.answer4,
    ]);

    // Add any additional logic you want to perform on submit
  };

  React.useEffect(() => {
    console.log("Inside Useeffect 1");
    console.log(options[formData.correctAnswerRadio - 1]);

    setCorrectanswer(options[formData.correctAnswerRadio - 1]);

  }, [options]);

  React.useEffect(() => {


    console.log("Inside Useeffect 2");
    setRequestbody({ // Make sure to wrap the object with {}
      questions: [{
        question: formData.questionText,
        options: options,
        answer: correctanswer,
        difficulty: formData.difficulty,
        category: formData.category,
      }],
    });

  }, [correctanswer]);

  React.useEffect(() => {
    // Function to make the API call
    console.log("Inside Useeffect 3");

    console.log("Requestbody"+requestbody.questions);
    setMakeapicall(true);

  }, [requestbody]);

  // React.useEffect(() => {
  //   console.log("Inside Useeffect 4");

  //   const makeAPICall = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://j76ywowcl2.execute-api.us-east-1.amazonaws.com/prod/question",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(requestbody),
  //         }
  //       );

  //       if (!response.ok) {
  //         // Handle non-2xx responses
  //         console.error("API call failed:", response.status, response.statusText);
  //         return;
  //       }

  //       // console.log("requestbody.questions",requestbody.questions);
  //       const data = await response.json();
  //       console.log("API response:", data);
  //       alert("Questions added successfully");
  //     } catch (error) {
  //       // Handle fetch errors
  //       console.error("Error making API call:", error);
  //       console.log("Requestbody "+requestbody);
  //     }
  //   };

  //   // Call the function to make the API call when requestBody changes
  //   if (Object.keys(requestbody).length > 0) {
  //     makeAPICall();
  //   }
  //   // Log the updated requestbody whenever it changes
  //   console.log("Updated Requestbody:", requestbody);
  // }, [makeapicall]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <TextField
            onChange={(event) => {
              handleFormChange(event);
            }}
            value={formData["questionText"] || ""}
            fullWidth
            label="Question Text"
            id="questionText"
            name="questionText"
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData["category"] || ""}
              label="category"
              name="category"
              onChange={(event) => {
                handleFormChange(event);
              }}
            >
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"General Knowledge"}>General Knowledge</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={formData["difficulty"] || ""}
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
              value={formData["correctAnswerRadio"] || ""}
              onChange={(event) => {
                handleFormChange(event);
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="1" control={<Radio />} label="" />
                    <TextField
                      onChange={(event) => {
                        handleFormChange(event);
                      }}
                      type="text"
                      value={formData["answer1"] || ""}
                      fullWidth
                      label="Answer 1"
                      id="answer1"
                      name="answer1"
                    />
                  </Box>

                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="2" control={<Radio />} label="" />
                    <TextField
                      onChange={(event) => {
                        handleFormChange(event);
                      }}
                      type="text"
                      value={formData["answer2"] || ""}
                      fullWidth
                      label="Answer 2"
                      id="answer2"
                      name="answer2"
                    />
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="3" control={<Radio />} label="" />
                    <TextField
                      onChange={(event) => {
                        handleFormChange(event);
                      }}
                      type="text"
                      value={formData["answer3"] || ""}
                      fullWidth
                      label="Answer 3"
                      id="answer3"
                      name="answer3"
                    />
                  </Box>

                  <Box sx={{ display: "flex", flex: 1 }}>
                    <FormControlLabel value="4" control={<Radio />} label="" />
                    <TextField
                      onChange={(event) => {
                        handleFormChange(event);
                      }}
                      type="text"
                      value={formData["answer4"] || ""}
                      fullWidth
                      label="Answer 4"
                      id="answer4"
                      name="answer4"
                    />
                  </Box>
                </Stack>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {" "}
            Submit{" "}
          </Button>

          {/* <Button variant='contained' fullWidth onClick={()=>{
                    console.log(formData);
                    console.log(formData.answer1);
                    console.log(formData.answer2);
                    console.log(formData.answer3);
                    console.log(formData.answer4);
                    console.log(formData.category);
                    console.log(formData.difficulty);
                    console.log(formData.correctAnswerRadio);
                    console.log(formData);
                    console.log(formData);
                }}> Submit </Button> */}
        </Stack>
      </Box>
    </Modal>
  );
}
