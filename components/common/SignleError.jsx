import { Stack, Alert } from "@mui/material";

const SingleError = ({ error, setError }) => {
  return (
    <Stack spacing={2} mb={2}>
      <Alert
        onClose={() => {
          setError(null);
        }}
        severity="error"
        variant="outlined"
      >
        {error}
      </Alert>
    </Stack>
  );
};

export default SingleError;
