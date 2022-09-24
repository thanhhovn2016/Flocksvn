import React from "react";
import {
  FormControl,
  OutlinedInput,
  TextField,
  FormHelperText,
  Paper,
  Container,
  Box,
  Grid,
  Button,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";

import { useAppTheme, useTranslation } from "../../hooks/";
import { AppPapper, ErrorStack } from "../common";
import { sendContactForm } from "../../services";

const ContactForm = () => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const [errors, setErrors] = React.useState(null);
  const mutation = useMutation(sendContactForm, {
    onSuccess: (data) => console.log(data),
    onError: (err) => setErrors(err.response.data),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t.name_invalid_length_message)
        .required(t.name_required_message),
      email: Yup.string()
        .email(t.email_invalid_format_message)
        .required(t.email_required_message),
      subject: Yup.string()
        .min(3, t.subject_invalid_length_message)
        .required(t.subject_required_message),
      message: Yup.string()
        .min(3, t.message_invalid_length_message)
        .required(t.message_required_message),
    }),
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });

  return (
    <>
      {mutation.isSuccess && (
        <Alert
          sx={{ mb: 2 }}
          onClose={() => console.log("lll")}
          severity="success"
        >
          {t?.contact_sent_success}
        </Alert>
      )}
      {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
      <AppPapper>
        <Backdrop open={mutation.isLoading}>
          <CircularProgress />
        </Backdrop>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          py={5}
          px={2}
        >
          <Grid container spacing={5}>
            <Grid item md={6} xs={12}>
              <TextField
                id="name"
                name="name"
                {...formik.getFieldProps("name")}
                variant="outlined"
                placeholder={t.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="email"
                name="email"
                {...formik.getFieldProps("email")}
                variant="outlined"
                placeholder={t.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id="subject"
                name="subject"
                {...formik.getFieldProps("subject")}
                variant="outlined"
                placeholder={t.subject}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <FormHelperText error>{formik.errors.subject}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id="message"
                name="message"
                {...formik.getFieldProps("message")}
                variant="outlined"
                multiline
                rows={2}
                placeholder={t.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <FormHelperText error>{formik.errors.message}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item md={12} xs={12}>
              <Button type="submit" color="primary" variant="contained">
                {t.send_message}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </AppPapper>
    </>
  );
};

export default ContactForm;
