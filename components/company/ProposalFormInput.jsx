import { Grid, InputLabel, TextField, FormHelperText } from "@mui/material";
import { ErrorMessage } from "formik";

const ProposalFormInput = ({
  type = "text",
  labelTxt,
  name,
  value,
  defaultValue,
  ...props
}) => {
  return (
    <Grid item md={12} xs={12} mb={3}>
      <Grid container>
        <Grid item md={3} xs={12} py={2}>
          <InputLabel htmlFor={name}>{labelTxt}</InputLabel>
        </Grid>
        <Grid item md={9} xs={12}>
          <TextField
            type={type}
            id={name}
            InputProps={{ style: { height: "42px" } }}
            {...props}
            defaultValue={defaultValue}
          />
          <FormHelperText error>
            <ErrorMessage name={name} />
          </FormHelperText>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProposalFormInput;
