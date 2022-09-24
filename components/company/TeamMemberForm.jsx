import React from "react";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Paper,
  Box,
  Grid,
  InputLabel,
  TextField,
  FormHelperText,
  Typography,
  Divider,
  Button,
} from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../hooks";
import { MediaUploader, ErrorStack, RichTextEditor } from "../common";
import { mediaBaseURL } from "../../utils/constants";

const TeamMemberForm = ({ onSubmit, onCancelClick, record }) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();
  const [image, setImage] = React.useState(
    record?.image ? { id: record?.image, url: record?.image?.url } : null
  );
  const [imageErr, setImageErr] = React.useState("");
  const id = React.useId();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t.name_invalid_length_message)
      .required(t.name_required_message),
    position: Yup.string()
      .min(3, t.position_invalid_length)
      .required(t.position_required_message),
    about: Yup.string().required(t.about_required_message),
    facebook: Yup.string()
      .url(t.invalid_url_message)
      .required(t.facebook_required_message),
    twitter: Yup.string()
      .url(t.invalid_url_message)
      .required(t.twitter_required_message),
    linkedin: Yup.string()
      .url(t.invalid_url_message)
      .required(t.linkedIn_required_message),
  });

  const handleSubmit = (values, actions) => {
    if (!image) {
      return setImageErr(t.image_required_message);
    }
    setImageErr("");
    console.log("value team members" , values)
    return onSubmit({ ...values, image: image?.id, imageUrl: {url:image.url} });
  };

  return (
    <Formik
      initialValues={{
        name: record?.name,
        position: record?.position,
        about: record?.about,
        facebook: record?.facebook,
        twitter: record?.twitter,
        linkedin: record?.linkedin,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Box>
                <InputLabel>{t.name}</InputLabel>
                <TextField {...formik.getFieldProps("name")} />
                <FormHelperText error>
                  <ErrorMessage name="name" />
                </FormHelperText>
              </Box>
              <Grid container spacing={4} mt={1}>
                <Grid item md={4} xs={12} mt={1}>
                  <InputLabel htmlFor="image">{t.image}</InputLabel>
                  {record ? (
                    <MediaUploader
                      id="image"
                      fileType="image"
                      fileUrl={`${mediaBaseURL}${record?.image?.url}`}
                      setEntry={setImage}
                    />
                  ) : (
                    <MediaUploader
                      id="image"
                      fileType="image"
                      setEntry={setImage}
                    />
                  )}
                  <FormHelperText error>{imageErr}</FormHelperText>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Box my={1}>
                    <InputLabel>{t.position}</InputLabel>
                    <TextField {...formik.getFieldProps("position")} />
                    <FormHelperText error>
                      <ErrorMessage name="position" />
                    </FormHelperText>
                  </Box>
                  <Box mt={2}>
                    {isMobile ? (
                      <>
                        <InputLabel>{t.about}</InputLabel>
                        <TextField
                          multiline
                          rows={2.1}
                          {...formik.getFieldProps("about")}
                          InputProps={{
                            style: {
                              height: "100%",
                            },
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="about" />
                        </FormHelperText>
                      </>
                    ) : (
                      <>
                        <InputLabel>{t.facebook}</InputLabel>
                        <TextField {...formik.getFieldProps("facebook")} />
                        <FormHelperText error>
                          <ErrorMessage name="facebook" />
                        </FormHelperText>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                {isMobile ? (
                  <>
                    <InputLabel>{t.facebook}</InputLabel>
                    <TextField {...formik.getFieldProps("facebook")} />
                    <FormHelperText error>
                      <ErrorMessage name="facebook" />
                    </FormHelperText>
                  </>
                ) : (
                  <>
                    <InputLabel>{t.about}</InputLabel>
                    <TextField
                      multiline
                      rows={2.1}
                      {...formik.getFieldProps("about")}
                      InputProps={{
                        style: {
                          height: "100%",
                        },
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="about" />
                    </FormHelperText>
                  </>
                )}
              </Box>
              <Box my={2}>
                <InputLabel>{t.twitter}</InputLabel>
                <TextField {...formik.getFieldProps("twitter")} />
                <FormHelperText error>
                  <ErrorMessage name="twitter" />
                </FormHelperText>
              </Box>
              <Box>
                <InputLabel>{t.linkedin}</InputLabel>
                <TextField {...formik.getFieldProps("linkedin")} />
                <FormHelperText error>
                  <ErrorMessage name="linkedin" />
                </FormHelperText>
              </Box>
            </Grid>
          </Grid>
          <Box
            mt={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={onCancelClick}
              sx={{
                color: "#fff",
                mr: 1,
                ":hover": {
                  backgroundColor: "#ed6c02",
                },
              }}
            >
              {t.cancel}
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "primary.dark",
                px: 3,
                ":hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {t.save}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TeamMemberForm;
