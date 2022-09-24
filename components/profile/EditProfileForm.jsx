import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Snackbar,
  Avatar,
  InputLabel,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useFormik, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";

import { useAppTheme, useTranslation, useAuth } from "../../hooks/";
import { AppPapper, ErrorStack, SingleError, MediaUploader } from "../common";
import { PersonIcon, SmsIcon } from "../icons";
import { editUserProfile } from "../../services/";
import { mediaBaseURL } from "../../utils/constants";
import { useState } from "react";
import { changePasswordUser } from "../../services/user";

const EditProfileForm = () => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const router = useRouter();
  const locale = router.locale;
  const redirectTo = locale == "en" ? "/en/profile" : "/profile";
  const [avatar, setAvatar] = React.useState(user?.avatar);
  const [coverPhoto, setCoverPhoto] = React.useState(user?.coverPhoto);
  const [errors, setErrors] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [changePasswordState, setChangePasswordState] = useState(false);
  const mutation = useMutation(editUserProfile, {
    onError: (err) => {
      setErrorMsg(err.message);
      setErrors(err.response.data);
    },
    onSuccess: (data) => {
      setOpen(true);
      setUser((prev) => ({
        ...prev,
        ...data?.data,
        avatar: avatar,
        coverPhoto: coverPhoto,
      }));
      router.push(redirectTo);
    },
  });
  const mutationChangePassword = useMutation(changePasswordUser, {
    onError: (err) => {
      setErrorMsg(err.message);
      setErrors(err.response.data);
    },
    onSuccess: (data) => {
      setOpen(true);
      setChangePasswordState(false)
      // setUser((prev) => ({
      //   ...prev,
      //   ...data?.data,
      //   avatar: avatar,
      //   coverPhoto: coverPhoto,
      // }));
      router.push(redirectTo);
    },
  });
  // const formikChangePassword = useFormik({
  //   validationSchema: Yup.object({
  //     initialValues: {
  //       currentPassword: "",
  //       newPassword: "",
  //     },
  //     currentPassword: Yup.string().min(5, "fd gfdg").required(" sadfd sd "),
  //     newPassword: Yup.string().min(5, "").required(""),
  //   }),
  //   onSubmit: (value) => {
  //     console.log("value ", value);
  //   },
  // });
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, t.first_name_invalid_length_message)
        .required(t.first_name_required_message),
      lastName: Yup.string()
        .min(3, t.last_name_invalid_length_message)
        .required(t.last_name_required_message),
      email: Yup.string()
        .email(t.email_invalid_format_message)
        .required(t.email_required_message),
      currentPassword:Yup.string().
      min(8, t?.password_invalid_length_message),

    }),
    onSubmit: async (values) => {
      console.log("values", values);
      if (changePasswordState){
        if (values?.newPassword !== values?.confirmPassword){
          // setErrorMsg("Network Error");
          return setErrors([t?.confirm_password_error]);
           
        }
        mutationChangePassword.mutate({
          currentPassword:values?.currentPassword,
          newPassword:values?.newPassword
        })
      }else{
        await mutation.mutate({
          ...values,
          ...(avatar?.id ? { avatar: avatar.id } : { avatar: null }),
          ...(coverPhoto?.id
            ? { coverPhoto: coverPhoto.id }
            : { coverPhoto: null }),
        });

      }
    },
  });

  const handleClose = () => {
    setChangePasswordState(!changePasswordState);
  };
  return (
    <>
      {errorMsg && errorMsg == "Network Error" && (
        <SingleError error={errorMsg} setError={setErrorMsg} />
      )}
      {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
      {(mutation.isLoading || mutationChangePassword.isLoading )&& (
        <Backdrop open>
          <CircularProgress />
        </Backdrop>
      )}

      {/* <Dialog
        open={changePasswordState}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{t?.change_password}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Form onSubmit={formikChangePassword.onSubmit}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <InputLabel>{t?.current_password}</InputLabel>
                  <TextField
                    id="currentPassword"
                    name="currentPassword"
                    variant="outlined"
                    placeholder={t.current_password}
                    {...formikChangePassword.getFieldProps("currentPassword")}
                    autoFocus
                  />
                  {formikChangePassword?.touched?.currentPassword &&
                  formik?.errors?.currentPassword ? (
                    <FormHelperText error>
                      {formik?.errors?.currentPassword}{" "}
                    </FormHelperText>
                  ) : null}
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputLabel>{t?.new_password}</InputLabel>
                  <TextField
                    id="newPassword"
                    name="newPassword"
                    variant="outlined"
                    placeholder={t.new_password}
                    {...formikChangePassword.getFieldProps("newPassword")}
                    autoFocus
                  />
                  {formikChangePassword.touched.newPassword &&
                  formik.errors.newPassword ? (
                    <FormHelperText error>
                      {formikChangePassword.errors.newPassword}{" "}
                    </FormHelperText>
                  ) : null}
                </Grid>
              </Grid>
            </Form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit">{t?.save}</Button>
        </DialogActions>
      </Dialog> */}
      <AppPapper 
      
      >
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" variant="filled" elevation={6}>
            {t?.profile_edited_success}
          </Alert>
        </Snackbar>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          px={2}
          sx={{
            marginTop: changePasswordState ? "5rem":"0"
          }}
        >
          <Grid container spacing={3} pb={5}>
            {changePasswordState && <Typography variant="h6" pt={3}>{t?.change_password}</Typography>}
           { !changePasswordState && <Grid item md={6} xs={12}>
              {avatar ? (
                <>
                  <InputLabel>{t.avatar}</InputLabel>
                  {avatar ? (
                    <MediaUploader
                      id="avatar"
                      fileType="image"
                      setEntry={setAvatar}
                      fileUrl={`${mediaBaseURL}${avatar?.url}`}
                    />
                  ) : (
                    <MediaUploader
                      id="avatar"
                      fileType="image"
                      setEntry={setAvatar}
                      fileUrl={``}
                    />
                  )}
                  <Button
                    onClick={() => {
                      setUser((prevState) => ({
                        ...prevState,
                        avatar: null,
                      }));
                      setAvatar(null);
                    }}
                    sx={{ marginTop: "1rem" }}
                  >
                    {t?.delete}
                  </Button>
                </>
              ) : (
                <>
                  <InputLabel>{t.avatar}</InputLabel>
                  <MediaUploader
                    id="avatar"
                    fileType="image"
                    setEntry={setAvatar}
                  />
                  {/* <Button>delete</Button> */}
                </>
              )}
            </Grid>}
            {!changePasswordState && <Grid item md={6} xs={12}>
              {coverPhoto ? (
                <>
                  <InputLabel>{t.cover_photo}</InputLabel>
                  <MediaUploader
                    id="cover-photo"
                    fileType="image"
                    setEntry={setCoverPhoto}
                    fileUrl={`${mediaBaseURL}${coverPhoto?.url}`}
                  />
                  <Button
                    onClick={() => {
                      setUser((prevState) => ({
                        ...prevState,
                        coverPhoto: null,
                      }));
                      setCoverPhoto(false);
                    }}
                    sx={{ marginTop: "1rem" }}
                  >
                    {t?.delete}
                  </Button>
                </>
              ) : (
                <>
                  <InputLabel>{t.cover_photo}</InputLabel>
                  <MediaUploader
                    id="cover-photo"
                    fileType="image"
                    setEntry={setCoverPhoto}
                  />
                </>
              )}
            </Grid>}
           {!changePasswordState && <Grid item md={12} xs={12}>
              <TextField
                id="firstName"
                name="firstName"
                variant="outlined"
                placeholder={t.first_name}
                {...formik.getFieldProps("firstName")}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText error>
                  {formik.errors.firstName}{" "}
                </FormHelperText>
              ) : null}
            </Grid>}
            {!changePasswordState && <Grid item md={12} xs={12}>
              <TextField
                id="lastName"
                name="lastName"
                variant="outlined"
                placeholder={t.last_name}
                {...formik.getFieldProps("lastName")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText error>{formik.errors.lastName} </FormHelperText>
              ) : null}
            </Grid>}
            { !changePasswordState && <Grid item md={12} xs={12}>
              <TextField
                id="email"
                name="email"
                variant="outlined"
                placeholder={t.email}
                disabled
                {...formik.getFieldProps("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SmsIcon color="#adb4b7" />
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email} </FormHelperText>
              ) : null}
            </Grid>}
            {
              changePasswordState &&
              <Grid item md={12} xs={12}>
              <TextField
                id="currentPassword"
                name="currentPassword"
                variant="outlined"
                placeholder={t.current_password}
              
                {...formik.getFieldProps("currentPassword")}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <SmsIcon color="#adb4b7" />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {formik.touched.currentPassword && formik.errors.currentPassword ? (
                <FormHelperText error>{formik.errors.currentPassword} </FormHelperText>
              ) : null}
            </Grid>
            }
{
              changePasswordState &&
              <Grid item md={12} xs={12}>
              <TextField
                id="newPassword"
                name="newPassword"
                variant="outlined"
                placeholder={t.new_password}
               
                {...formik.getFieldProps("newPassword")}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <SmsIcon color="#adb4b7" />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <FormHelperText error>{formik.errors.newPassword} </FormHelperText>
              ) : null}
            </Grid>
            }
            {
              changePasswordState &&
              <Grid item md={12} xs={12}>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                variant="outlined"
                placeholder={t.confirm_password}
               
                {...formik.getFieldProps("confirmPassword")}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <SmsIcon color="#adb4b7" />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <FormHelperText error>{formik.errors.confirmPassword} </FormHelperText>
              ) : null}
            </Grid>
            }
            <Grid item md={12} xs={12}>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                type="submit"
                disabled={mutation.isLoading}
              >
                {t?.submit}
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button onClick={handleClose}>{changePasswordState ? t?.back: t.change_password}</Button>
            </Grid>
          </Grid>
        </Box>
      </AppPapper>
    </>
  );
};

export default EditProfileForm;
