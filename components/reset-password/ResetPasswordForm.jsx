import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  TextField,
  FormHelperText,
  Box,
  Grid,
  Button,
  InputAdornment,
  Typography,
  Divider,
  IconButton,
  Alert,
  Stack,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";

import { useTranslation, useAuth } from "../../hooks/";
import { ErrorStack, SingleError } from "../common";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";
import { confirmPasswordReset } from "../../services";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  const token = router.query.token;
  const [errors, setErrors] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const confirmPassworMutation = useMutation(confirmPasswordReset, {
    onError: (err) => {
      setErrorMsg(err.message);
      setErrors(err.response.data);
    },
    onSuccess: (data) => {
      setOpen(true);
      router.push("/sign-in");
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(7, t.new_password_invalid_length_message)
        .required(t.new_password_required_message),
        confirmPassword:Yup.string()
        .min(7, t.confirm_password_invalid_length_message)
        .required(t.confirm_password_required_message),
    }),
    onSubmit: async (values) => {
      if (values?.password !== values.confirmPassword){
        return setErrors([t?.confirm_password_error])
      }
      confirmPassworMutation.mutate({
        password: values.password,
        token: token,
      });
    },
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };
const handleClickShowConfirmPassword = () => {
  formik.setFieldValue("showConfirmPassword" , !formik.values.showConfirmPassword)
}
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setErrors({});
  }, []);

  return (
    <Box pt={5}>
      <Typography
        variant="h4"
        textAlign="center"
        color={"primary.dark"}
        gutterBottom
      >
        {t?.reset_password}
      </Typography>
      {auth.errorMsg && auth.errorMsg == "Network Error" && (
        <SingleError error={auth.errorMsg} setError={auth.setErrorMsg} />
      )}

      <>
        <Backdrop open={confirmPassworMutation.isLoading}>
          <CircularProgress />
        </Backdrop>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" variant="filled" elevation={6}>
            {t?.password_reset_success}
          </Alert>
        </Snackbar>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          px={1}
          mt={2}
        >
          <Grid container spacing={2} pb={5}>
            <Grid item md={12} xs={12}>
              {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
            </Grid>
            <Grid item md={12} xs={12} textAlign="center">
              <TextField
                id="password"
                variant="outlined"
                placeholder={t.new_password}
                error={
                  formik.errors.password && formik.touched.password
                    ? true
                    : false
                }
                {...formik.getFieldProps("password")}
                name="password"
                type={formik.values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {formik.values.showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password} </FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={12} xs={12} textAlign="center">
              <TextField
                id="confirmPassword"
                variant="outlined"
                placeholder={t.confirm_password}
                error={
                  formik.errors.confirmPassword && formik.touched.confirmPassword
                    ? true
                    : false
                }
                {...formik.getFieldProps("confirmPassword")}
                name="confirmPassword"
                type={formik.values.showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {formik.values.showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <FormHelperText error>{formik.errors.confirmPassword} </FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={12} xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ py: 2, color: "#fff", borderRadius: "10px" }}
              >
                {t?.submit}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    </Box>
  );
};

export default ResetPasswordForm;
