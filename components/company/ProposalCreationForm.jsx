import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  List,
  ListItem,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";

import { useMediaBreakpoints, useTranslation, useAuth } from "../../hooks";
import {
  MediaUploader,
  MediaMultipleUploader,
  ErrorStack,
  RichTextEditor,
} from "../common";
import { ProposalFormInput, EditorInput, FormSection, TeamMemberForm } from ".";
import { TeamMemberCard } from "../about";
import { PersonPlusIcon, RemoveIcon, PlusIcon, EditIcon } from "../icons";
import { createProject, getProjectCategories } from "../../services";

import { mediaBaseURL } from "../../utils/constants";
import { updateProject } from "../../services/fundRaising";
import { useState } from "react";

const ProposalCreationForm = (props) => {
  const { isMobile, isLargeDesktop } = useMediaBreakpoints();
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [detailSections, setDetailSections] = React.useState( props?.id ? props?.companyData?.presentDetails : [
    {
      title: "Overview",
      titleErr: "",
      details: "",
      detailsErr: "",
      isNew: false,
    },
    {
      title: "Problem",
      titleErr: "",
      details: "",
      detailsErr: "",
      isNew: false,
    },
    {
      title: "Solution",
      titleErr: "",
      details: "",
      detailsErr: "",
      isNew: false,
    },
  ]);
  const [logo, setLogo] = React.useState();
  const [logoErr, setLogoErr] = React.useState(null);
  const [coverPhoto, setCoverPhoto] = React.useState();
  const [coverPhotoErr, setCoverPhotoErr] = React.useState(null);
  const [coverPhoto1, setCoverPhoto1] = React.useState();
  const [coverPhotoErr1, setCoverPhotoErr1] = React.useState(null);
  const [coverPhoto2, setCoverPhoto2] = React.useState();
  const [coverPhotoErr2, setCoverPhotoErr2] = React.useState(null);
  const [documents, setDocuments] = React.useState([]);
  const [deleteDocuments , setDeleteDocuments] = useState([])
  const [documentNames, setDocumentNames] = React.useState([]);
  const [teamMembers, setTeamMembers] = React.useState(props?.id ? props?.companyData?.companyPresentTeamMember : []);
  const [createTeamMember  , setCreateTeamMember] = useState([])
  const [updateTeamMember  , setUpdateTeamMember] = useState([])
  const [deleteTeamMember  , setDeleteTeamMember] = useState([])
  const [deleteDetailsSection , setDeleteDetailsSection] = useState([])
  const [teamMembersErr, setTeamMembersErr] = React.useState(null);
  const [editingMember, setEditingMember] = React.useState(null);
  const [errors, setErrors] = React.useState(null);
  const id = React.useId();
  const { data: projectCategoryList, isLoading } = useQuery(
    "projectCategories",
    getProjectCategories
  );
  const mutation = useMutation(createProject, {
    onSuccess: (data) => {
      router.push("/company_profile/presentation_projects");
    },
    onError: (err) => {
      setErrors(err?.response?.data);
    },
  });

  const validationSchema = Yup.object({
    projectName: Yup.string()
      .min(3, t.name_invalid_length_message)
      .required(t.project_name_required_message),
    projectSubtitle: Yup.string().required(t.project_subtitle_required_message),
    youtubeUrl: Yup.string().required(t.project_subtitle_required_message),
    projectAbstract: Yup.string().required(t.project_abstract_required_message),
    founded: Yup.date().required(t.founded_required_message),
    employees: Yup.number().required(t.employees_required_message),
    website: Yup.string().url().required(t.website_required_message),
    email: Yup.string().email().required(t.email_required_message),
    phoneNumber: Yup.string().required(t.phone_number_required_message),
    location: Yup.string().required(t.location_required_message),
    facebook: Yup.string()
      .url(t.invalid_url_message)
      .required(t.facebook_required_message),
    twitter: Yup.string()
      .url(t.invalid_url_message)
      .required(t.twitter_required_message),
    youtube: Yup.string()
      .url(t.invalid_url_message)
      .required(t.youtube_required_message),
    linkedin: Yup.string()
      .url(t.invalid_url_message)
      .required(t.linkedin_required_message),
    instagram: Yup.string()
      .url(t.invalid_url_message)
      .required(t.instagram_required_message),
    category: Yup.string().required(t.category_required_message),
    targetInvestment: Yup.number()
      .positive()
      .required(t.target_investment_required_message),
    minimumInvestment: Yup.number()
      .positive()
      .required(t.minimum_investment_required_message),
    pricePerShare: Yup.number()
      .positive()
      .required(t.price_per_share_required_message),
    closingDate: Yup.date().required(t.closing_date_required_message),
  });

  const addEditorInput = () => {
    const data = [...detailSections];
    data.push({
      title: "",
      titleErr: "",
      details: "",
      detailsErr: "",
      isNew: true,
    });
    setDetailSections(data);
  };

  const removeEditorInput = (index) => {
    const data = [...detailSections];
    setDeleteDetailsSection((prevState) => ([
      ...prevState,
      ...(data?.[index]?.id ? data?.[index]?.id : [])
    ]))
    data.splice(index, 1);
    setDetailSections(data);
  };

  const addTeamMember = (values) => {
    setOpen(false);
    setTeamMembersErr(null);
    const data = [...teamMembers];
    if (editingMember) {
      const newData = data.map((item) =>
        item.id === editingMember.id ? values : item
      );
      setTeamMembers(newData);
      setUpdateTeamMember(newData)
      setEditingMember(null);
    } else {
      setCreateTeamMember((prevState) => ([
        ...prevState,
        values
      ]))
      data.push(values);
      setTeamMembers(data);
    }
  };

  const removeTeamMember = (index) => {
    const data = [...teamMembers];
    setDeleteTeamMember((prevState) => ([
      ...prevState,
      ...(data?.[index]?.id ? data?.[index]?.id : {})
    ]))
    data.splice(index, 1);
    setTeamMembers(data);
  };

  const editTeamMember = (record) => {
    setEditingMember(record);
    setOpen(true);
  };

  const handleTeamMemberClose = () => {
    setOpen(false);
    setEditingMember(null);
  };

  const handleTitleChange = (event, index) => {
    const data = [...detailSections];
    data[index].title = event.target.value;
    data[index].titleErr = "";
    setDetailSections(data);
  };

  const handleContentChange = (content, index) => {
    const data = [...detailSections];
    data[index].details = content;
    data[index].detailsErr = "";
    setDetailSections(data);
  };
const  mutationUpdate = useMutation(updateProject,{
  onSuccess: (data) => {
    router.push("/profile");
  },
  onError: (err) => {
    setErrors(err?.response?.data);
  },
})
  const handleSubmit = async (values, actions) => {
    setLogoErr(null);
    setCoverPhotoErr(null);
    setCoverPhotoErr1(null);
    setCoverPhotoErr2(null);
    
    detailSections.map((section) => {
      if (section.title === "" || section.title.length === 0) {
        section.titleErr = t.title_required_message;
      }
      if (section.details === "" || section.details.length === 0) {
        section.detailsErr = t.details_required_message;
      }
    });

    if (teamMembers.length === 0) {
      setTeamMembersErr(t.team_required_message);
    }
    if (!logo && !props?.id) {
      setLogoErr(t.logo_required_message);
    }
    if (!coverPhoto && !props?.id) {
      setCoverPhotoErr(t.cover_photo_required_message);
    }
    if (!coverPhoto1 && !props?.id) {
      setCoverPhotoErr1(t.cover_photo_required_message);
    }
    if (!coverPhoto2 && !props?.id) {
      setCoverPhotoErr2(t.cover_photo_required_message);
    }
    // if (
    //   detailSections.every(
    //     (section) => section.titleErr !== "" || section.detailsErr !== ""
    //   ) ||
    //   logoErr !== null ||
    //   coverPhotoErr !== null ||
    //   teamMembers.length === 0
    // ) {
    //   return;
    // }

    let createDetailsSection = []
    let updateDetailsSection = []
    if (props?.id) {
      //TODO if user update the name or other text not image i don't have id image for update section 
      // i should handle this case later 
      updateDetailsSection = detailSections?.filter((item) =>{
        if (!item?.id)
        createDetailsSection?.push(item)
      return item?.id 
      } )
    }

    let updateDocument = []
     let createDocument = []
     if (props?.id ){
      updateDocument =  documents?.filter((item) => {
        if (item?.documents?.id){
          createDocument.push({
            file: item?.documents?.id,
        fileName:item?.fileName,
          })
        }
        return !item?.documents?.id
      })
     }
     console.log("documents state" , documents)
    let newValues = {
      companyName: values.projectName,
      companySubTitle: values.projectSubtitle,
      youtubeUrl : values.youtubeUrl,
      founded: values.founded,
      abstract: values.projectAbstract,
      investmentMin: values.minimumInvestment,
      investmentTarget: values.targetInvestment,
      pricePerShare: values.pricePerShare,
      presentTeamMember: props?.id ? {
        ...(deleteTeamMember?.length > 0 ? {deleteItems:deleteTeamMember} : {}),
        ...(createTeamMember?.length > 0 ? {createdItems:createTeamMember} : {}),
        ...(updateTeamMember?.length > 0 ? {updateItems:updateTeamMember} : {})
      } : teamMembers,
      presentDetails: props?.id ? {
        ...(deleteDetailsSection?.length > 0 ? {deleteItems:deleteDetailsSection} :{} ),
        ...(createDetailsSection?.length > 0 ? {createdItems:createDetailsSection} : {}),
        ...(updateDetailsSection?.length > 0 ? {updateItems:updateDetailsSection} : {})
      } : detailSections,
      ...(logo?.id ? {logoImage: logo?.id}:{}),
      ...(coverPhoto ? {coverImage: coverPhoto?.id} : {}),
      ...(coverPhoto1 ? {coverImage1: coverPhoto1?.id} : {}),
      ...(coverPhoto2 ? {coverImage2: coverPhoto2?.id} : {}),
      presentDocument: props?.id ? {
        // deleteItems:[],
        ...(createDocument?.length > 0 ? {createItems:createDocument} : {}),
        // updateItems:[]
      } :
       documents?.map((document, index) => ({
        file: document?.documents?.id,
        fileName:document?.fileName,
      })),
      employees: values.employees,
      website: values.website,
      email: values.email,
      phoneNumber: values.phoneNumber,
      location: values.location,
      facebook: values.facebook,
      twitter: values.twitter,
      linkedin: values.linkedin,
      instagram: values.instagram,
      youtube: values.youtube,
      closingDate: values.closingDate,
      company: auth.companyId,
      companyCategory: values.category,
    };
    console.log("variables" , newValues)
    if(props?.id){
      newValues = {
        ...newValues,
        id:props?.id
      }

      // call update function
      mutationUpdate.mutate(newValues)
    }else{

      mutation.mutate(newValues);
    }
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  }, []);
React.useEffect(() => {
  if (documents?.length === 0 ){
    const doc = props?.companyData?.presentDocuments?.map((item) => {
      return {
        documents: item?.file,
        fileName:item?.fileName
      }
    })
    setDocuments(doc)
  }
},[props?.companyData?.presentDocuments?.length])

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        projectName: props?.id ? props?.companyData?.companyName : "",
        projectSubtitle: props?.id ? props?.companyData?.companySubTitle : "",
        youtubeUrl: props?.id ? props?.companyData?.youtubeUrl : "",
        projectAbstract: props?.id ? props?.companyData?.abstract : "",
        founded: props?.id ? props?.companyData?.founded : "",
        employees: props?.id ? props?.companyData?.employees : "",
        website: props?.id ? props?.companyData?.website : "",
        email:  props?.id ? props?.companyData?.email : "",
        phoneNumber: props?.id ? props?.companyData?.phoneNumber : "",
        location: props?.id ? props?.companyData?.location : "",
        facebook: props?.id ? props?.companyData?.facebook : "",
        twitter: props?.id ? props?.companyData?.twitter : "",
        linkedin: props?.id ? props?.companyData?.linkedin : "",
        instagram: props?.id ? props?.companyData?.instagram : "",
        youtube: props?.id ? props?.companyData?.youtube : "",
        category: props?.id ? props?.companyData?.category?.name : "",
        targetInvestment: props?.id ? props?.companyData?.investmentTarget : "",
        minimumInvestment: props?.id ? props?.companyData?.investmentMin :  "",
        closingDate: props?.id ? props?.companyData?.closingDate : "",
        pricePerShare: props?.id ? props?.companyData?.pricePerShare : "",
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Paper sx={{ py: 5, px: isMobile ? 2 : 10 }}>
            <Backdrop open={mutation.isLoading || mutationUpdate.isLoading}>
              <CircularProgress />
            </Backdrop>
            <Typography mb={5} textAlign="center" variant="h4" color="primary">
            {props?.id ? t?.update_project : t?.create_project}
            </Typography>
            {errors && <ErrorStack errors={errors} setErrors={setErrors} />}
            <FormSection
              headerSection={
                <Typography color="secondary.dark" fontWeight="bold" mb={3}>
                  Project Basic Information
                </Typography>
              }
            >
              <Box>
                <ProposalFormInput
                  labelTxt={t?.project_name}
                  name="projectName"
                  defaultValue={props?.companyData?.companyName || ""}
                  {...formik.getFieldProps("projectName")}
                />
                <ProposalFormInput
                  labelTxt={t?.project_subtitle}
                  name="projectSubtitle"
                  defaultValue={props?.companyData?.companySubTitle || ""}
                  {...formik.getFieldProps("projectSubtitle")}
                />
                <ProposalFormInput
                  labelTxt={t?.project_abstract}
                  name="projectAbstract"
                  defaultValue={props?.companyData?.abstract || ""}
                  {...formik.getFieldProps("projectAbstract")}
                  // multiline={true}
                  // rows={5}
                  // id="filled-multiline-static"
                />
                <ProposalFormInput
                  labelTxt={t?.project_subtitle}
                  name="youtubeUrl"
                  defaultValue={props?.companyData?.youtubeUrl || ""}
                  {...formik.getFieldProps("youtubeUrl")}
                />
                <Grid item md={12} xs={12} my={3}>
                  <Grid container spacing={10}>
                    <Grid item md={3} xs={12}>
                      <InputLabel htmlFor="logo" shrink>
                        {t?.logo}
                      </InputLabel>
                      <MediaUploader
                        id="logo"
                        fileType="image"
                        fileUrl={mediaBaseURL + props?.companyData?.logoImage?.url }
                        setEntry={setLogo}
                      />
                      <FormHelperText error>{logoErr}</FormHelperText>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel htmlFor="cover-photo" shrink>
                        {t?.cover_photo}
                      </InputLabel>
                      <MediaUploader
                        id="cover-photo"
                        fileType="image"
                        width={"100%"}
                        fileUrl={mediaBaseURL + props?.companyData?.coverImage?.url}
                        setEntry={setCoverPhoto}
                      />
                      <FormHelperText error>{coverPhotoErr}</FormHelperText>
                      <InputLabel htmlFor="cover-photo1" shrink>
                        {t?.cover_photo}
                      </InputLabel>
                      <MediaUploader
                        id="cover-photo1"
                        fileType="image"
                        width={"100%"}
                        fileUrl={mediaBaseURL + props?.companyData?.coverImage1?.url}
                        setEntry={setCoverPhoto1}
                      />
                      <FormHelperText error>{coverPhotoErr1}</FormHelperText>
                      <InputLabel htmlFor="cover-photo2" shrink>
                        {t?.cover_photo}
                      </InputLabel>
                      <MediaUploader
                        id="cover-photo2"
                        fileType="image"
                        width={"100%"}
                        fileUrl={mediaBaseURL + props?.companyData?.coverImage2?.url}
                        setEntry={setCoverPhoto2}
                      />
                      <FormHelperText error>{coverPhotoErr2}</FormHelperText>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </FormSection>
            <FormSection
              headerSection={
                <Typography color="secondary.dark" fontWeight="bold" mb={3}>
                  {t?.company_information}
                </Typography>
              }
            >
              <ProposalFormInput
                type="date"
                labelTxt={t?.founded}
                name="founded"
                defaultValue={props?.companyData?.founded || ""}
                {...formik.getFieldProps("founded")}
              />
              <ProposalFormInput
                type="number"
                labelTxt={t?.employees}
                name="employees"
                defaultValue={props?.companyData?.employees || ""}
                {...formik.getFieldProps("employees")}
              />
              <ProposalFormInput
                labelTxt={t?.website}
                name="website"
                defaultValue={props?.companyData?.website || ""}
                {...formik.getFieldProps("website")}
              />
              <ProposalFormInput
                name="email"
                labelTxt={t?.email}
                defaultValue={props?.companyData?.email || ""}
                {...formik.getFieldProps("email")}
              />
              <ProposalFormInput
                name="phoneNumber"
                labelTxt={t?.phone_number}
                defaultValue={props?.companyData?.phoneNumber || ""}
                {...formik.getFieldProps("phoneNumber")}
              />
              <ProposalFormInput
                name="location"
                labelTxt={t?.location}
                defaultValue={props?.companyData?.location || ""}
                {...formik.getFieldProps("location")}
              />
              <ProposalFormInput
                name="facebook"
                labelTxt={t?.facebook}
                defaultValue={props?.companyData?.facebook || ""}
                {...formik.getFieldProps("facebook")}
              />
              <ProposalFormInput
                name="twitter"
                defaultValue={props?.companyData?.twitter || ""}
                labelTxt={t?.twitter}
                {...formik.getFieldProps("twitter")}
              />
              <ProposalFormInput
                name="linkedin"
                labelTxt={t?.linkedin}
                defaultValue={props?.companyData?.linkedin || ""}
                {...formik.getFieldProps("linkedin")}
              />
              <ProposalFormInput
                name="instagram"
                labelTxt={t?.instagram}
                defaultValue={props?.companyData?.instagram || "" }
                {...formik.getFieldProps("instagram")}
              />
              <ProposalFormInput
                name="youtube"
                labelTxt={t?.youtube}
                defaultValue={props?.companyData?.youtube || ""}
                {...formik.getFieldProps("youtube")}
              />
            </FormSection>
            <FormSection
              headerSection={
                <Typography color="secondary.dark" fontWeight="bold" mb={3}>
                  Project Investment Information
                </Typography>
              }
            >
              <Grid item md={12} xs={12} mb={3}>
                <Grid container>
                  <Grid item md={3} xs={12} py={2}>
                    <InputLabel htmlFor={"category"}>{t?.category}</InputLabel>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    {projectCategoryList?.length > 0  && <Select
                      {...formik.getFieldProps("category")}
                      fullWidth
                      sx={{ height: "42px" }}
                      defaultOpen={{id:props?.companyData?.companyCategory?.id,
                      name:props?.companyData?.companyCategory?.name
                      }}
                    >
                      {projectCategoryList?.map((category) => (
                        <MenuItem key={category?.id} value={category?.id}>
                          {category?.name}
                        </MenuItem>
                      ))}
                    </Select>}
                    <FormHelperText error>
                      <ErrorMessage name={"category"} />
                    </FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
              <ProposalFormInput
                type="number"
                name="targetInvestment"
                labelTxt={t?.target_investment}
                defaultValue={props?.companyData?.investmentTarget || ""}
                {...formik.getFieldProps("targetInvestment")}
              />
              <ProposalFormInput
                type="number"
                name="minimumInvestment"
                labelTxt={t?.minimum_investment}
                defaultValue={props?.companyData?.investmentMin || ""}
                {...formik.getFieldProps("minimumInvestment")}
              />
              <ProposalFormInput
                type="number"
                name="pricePerShare"
                labelTxt={t?.price_per_share}
                defaultValue={props?.companyData?.pricePerShare || ""}
                {...formik.getFieldProps("pricePerShare")}
              />
              <ProposalFormInput
                type="date"
                name="closingDate"
                labelTxt={t?.closing_date}
                defaultValue={props?.companyData?.closingDate || ""}
                {...formik.getFieldProps("closingDate")}
              />
            </FormSection>
            <FormSection
              headerSection={
                <Typography color="secondary.dark" fontWeight="bold" mb={3}>
                  Project Documents
                </Typography>
              }
            >
              <Grid item md={12} xs={12} mb={3}>
                <Grid container spacing={10}>
                  <Grid item md={2} xs={12} mt={5}>
                    <InputLabel htmlFor="document">{t?.documents}</InputLabel>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <MediaMultipleUploader
                      id="document"
                      fileType="doc"
                      width="100%"
                      height="150px"
                      setEntries={setDocuments}
                      setFileNames={setDocumentNames}
                    />
                  </Grid>
                  <Grid item md={7} xs={12} pl={2}>
                    <List>
                      {documents?.length > 0 &&
                        documents?.map((document, index) => {
                          return(<ListItem key={index}>
                            <Link
                              href={`${mediaBaseURL}${document?.documents?.url}`}
                              color="secondary.dark"
                              target="_blank"
                            >
                              {/* {index + 1}. {documentNames[index]} */}
                              {index + 1}. {document?.fileName}
                            </Link>
                          </ListItem>)
                        })}
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </FormSection>
            <Box py={3}>
              {detailSections?.map((input, index) => (
                <Box key={index}>
                  <EditorInput
                    label={input.title}
                    isRequired
                    defaultValue={input?.details}
                    isNew={input.isNew}
                    titleErr={input.titleErr}
                    detailErr={input.detailsErr}
                    onTitleChange={(event) => handleTitleChange(event, index)}
                    onContentChange={(content) =>
                      handleContentChange(content, index)
                    }
                  />
                  <ErrorMessage name={`presentDetails[${index}].details`} />
                  {input.isNew && (
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        onClick={() => removeEditorInput(index)}
                        sx={{
                          backgroundColor: "red",
                          px: 3.5,
                          boxShadow: "none !important",
                          ":hover": {
                            backgroundColor: "red",
                          },
                        }}
                      >
                        {t?.remove_section}
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
              <Box textAlign="center" py={2}>
                <Button
                  variant="contained"
                  onClick={addEditorInput}
                  sx={{
                    backgroundColor: "#EAEAEA",
                    color: "#000",
                    px: 3.5,
                    boxShadow: "none !important",
                    ":hover": {
                      backgroundColor: "#EAEAEA",
                    },
                  }}
                >
                  <PlusIcon color="#000" width={14} height={14} /> &nbsp;{" "}
                  {t?.add_section}
                </Button>
              </Box>
              <Divider />
            </Box>
            <Typography pt={2} color="secondary.dark" fontWeight="bold">
              {t?.team}
            </Typography>
            <FormHelperText error>{teamMembersErr}</FormHelperText>
            <Grid container spacing={2} pt={5}>
              {teamMembers.length > 0 &&
                teamMembers.map((member, index) => (
                  <Grid key={index} item md={4} xs={12} mb={1} position="relative">
                    <TeamMemberCard
                      name={member.name}
                      position={member.position}
                      imgSrc={`${mediaBaseURL}${member?.imageUrl?.url}`}
                      linkedIn={member.linkedIn}
                      facebook={member.facebook}
                      twitter={member.twitter}
                    />
                    <Box 
                    sx={{
                      display:"grid",
                      gridTemplateColumns:"auto auto",
                      justifyContent:"space-between",
                      position:"absolute",
                      width: "100%",
                      top:" 56px",
                      padding:"2px 10px"
                    }}
                    >
                    
                    <Button
                      onClick={() => editTeamMember(member)}
                      sx={{
                        // position: "relative",
                        // bottom: 150,
                        color: "#000",
                        // right: isLargeDesktop ? 45 : 55,
                        ":hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <EditIcon color="#8A8A8A" />
                    </Button>
                    <Button
                      onClick={() => removeTeamMember(index)}
                      sx={{
                        // position: "relative",
                        // bottom: 150,
                        // left: isLargeDesktop ? 210 : isMobile ? 270 : 170,
                        ":hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                    </Box>
                  </Grid>
                ))}
            </Grid>
            <Box py={3}>
              <Button
                variant="text"
                onClick={() => setOpen(true)}
                sx={{
                  backgroundColor: "#EAEAEA",

                  width: "106px",
                  height: "106px",
                  borderRadius: "50%",
                  ":hover": {
                    backgroundColor: "#EAEAEA",
                  },
                }}
              >
                <PersonPlusIcon />
              </Button>

              <Dialog
                open={open}
                fullWidth
                maxWidth="lg"
                onClose={handleTeamMemberClose}
                PaperProps={{
                  style: {
                    padding: isMobile ? 10 : 30,
                  },
                }}
              >
                <DialogTitle>
                  {editingMember ? t?.edit_team_member : t?.add_team_member}
                </DialogTitle>
                <DialogContent>
                  <TeamMemberForm
                    onSubmit={addTeamMember}
                    onCancelClick={handleTeamMemberClose}
                    record={editingMember}
                  />
                </DialogContent>
              </Dialog>
            </Box>
            <Box textAlign="center">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "primary.dark",
                  ":hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {t?.submit}
              </Button>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default ProposalCreationForm;
