import { Stack, Alert } from "@mui/material";

const ArrayErrorStack = (props) => {
  return (
    <Stack spacing={2} mb={2}>
      {props.errors.map((error) => (
        <Alert key={error.code} severity="error" variant="outlined">
          {error.message}
        </Alert>
      ))}
    </Stack>
  );
};

export default ArrayErrorStack;
