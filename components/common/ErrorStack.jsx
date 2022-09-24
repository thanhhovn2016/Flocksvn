import { Stack, Alert } from "@mui/material";

const ErrorStack = (props) => {
  return (
    <Stack spacing={2} mb={2}>
      {Object.keys(props.errors).map(
        (key) =>
          key != "code" &&
          props.errors[key] != null && (
            <Alert
              onClose={() => {
                const newErrors = { ...props.errors };
                newErrors[key] = null;
                props.setErrors(newErrors);
              }}
              key={key}
              severity="error"
              variant="outlined"
            >
              {props.errors[key]}
            </Alert>
          )
      )}
    </Stack>
  );
};

export default ErrorStack;
