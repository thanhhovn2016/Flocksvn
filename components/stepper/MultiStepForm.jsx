import React from "react";
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from "formik";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepButton,
  Paper,
} from "@mui/material";

import StepperNavigator from "./StepperNavigator";
import { useMediaBreakpoints } from "../../hooks";

const MultiStepForm = ({ initialValues, onSubmit, children }) => {
  const { isMobile } = useMediaBreakpoints();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [snapshot, setSnapshot] = React.useState(initialValues);
  const steps = React.Children.toArray(children);
  const step = steps[activeStep];
  const totalSteps = steps.length;
  const isLastStep = activeStep === totalSteps - 1;

  React.useEffect(() => {
    window.scrollTo({ top: isMobile ? 20 : 100, left: 0, behavior: "smooth" });
  }, [activeStep, isMobile]);

  const handleNext = (values) => {
    setActiveStep(activeStep + 1);
    setSnapshot(values);
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handlePrevious = (values) => {
    setActiveStep(activeStep - 1);
    setSnapshot(values);
  };

  const handleStep = (step) => {
    if (completed.hasOwnProperty(step)) {
      setActiveStep(step);
    }
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      setActiveStep(0);
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      handleNext(values);
    }
  };

  return (
    <Formik
      initialValues={{ ...snapshot }}
      validationSchema={step.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((currentStep, index) => (
              <Step key={currentStep.props.stepName}>
                <StepLabel
                  onClick={() => handleStep(index)}
                  sx={{
                    cursor: completed.hasOwnProperty(index)
                      ? "pointer"
                      : "default",
                  }}
                >
                  {currentStep?.props?.stepName?.toUpperCase()}
                </StepLabel>
                <StepContent>
                  <Paper sx={{ p: 3 }}>
                    {step}
                    <StepperNavigator
                      hasPrevious={activeStep > 0}
                      isLastStep={isLastStep}
                      onBackClick={() => handlePrevious(formik.values)}
                    />
                  </Paper>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {/* {step} */}
        </Form>
      )}
    </Formik>
  );
};

export const FormStep = ({ stepName = "", children }) => children;

export default MultiStepForm;
