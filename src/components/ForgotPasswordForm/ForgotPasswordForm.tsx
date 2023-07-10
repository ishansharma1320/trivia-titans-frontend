import { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';

const steps = ['Step 1', 'Step 2', 'Step 3']; // Add your desired steps here

const ForgotPasswordForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({}); // Store form data

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepSubmit = () => {
    console.log(formData); // Log form data on submission
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <input
            type="text"
            name="field1"
            value={formData['field1'] || ''}
            onChange={handleFormChange}
            placeholder="Field 1"
          />
        );
      case 1:
        return (
          <input
            type="text"
            name="field2"
            value={formData['field2'] || ''}
            onChange={handleFormChange}
            placeholder="Field 2"
          />
        );
      case 2:
        return (
          <input
            type="text"
            name="field3"
            value={formData['field3'] || ''}
            onChange={handleFormChange}
            placeholder="Field 3"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        <div>{renderStepContent(activeStep)}</div>

        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
             Next
          </Button>): (
          <Button variant="contained" color="primary" onClick={handleStepSubmit}>
              Submit
            </Button>
            )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
