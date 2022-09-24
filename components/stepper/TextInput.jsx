import {
  Grid,
  TextField,
  InputLabel,
  InputProps,
  StandardTextFieldProps,
  OutlinedTextFieldProps,
} from "@mui/material";
import { FieldConfig, useField } from "formik";

const TextInput = ({ label, placeholder, autoFocus, ...other }) => {
  const [field, meta] = useField(other);

  const props = {
    id: other.name,
    fullWidth: true,
    placeholder: placeholder,
  };
  return (
    <Grid item xs={12}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <TextField
        fullWidth
        id={props.name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        sx={{
          mb: 3,
        }}
      />
    </Grid>
  );
};

export default TextInput;
