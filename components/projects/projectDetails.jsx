import { Button, Grid, Link, Slider, Typography } from "@mui/material";
import styles from "../../styles/ProjectDetails.module.css";
import { dong, mediaBaseURL } from "../../utils/constants";
import { Box, typography } from "@mui/system";
import { renderRawHTML } from "../../utils/functions";

// import styled from "@emotion/styled";
import {
  Language,
  Email,
  LocalPhone,
  FacebookOutlined,
  LinkedIn,
  Twitter,
  LocationOn,
  MonetizationOnOutlined,
  IosShareOutlined,
  AccountCircleOutlined,
  AccessTimeOutlined,
  InsertDriveFile,
  ArrowDownward,
} from "@mui/icons-material";
import OurTeam from "./ourTeam";
import { useTranslation } from "../../hooks";
import { useState } from "react";
import Moment from "react-moment";
import {useRouter} from 'next/router'

import {getAccessToken} from '../../utils/storage'
import axiosInstance from "../../services/axiosWithAuth";
import { useQuery } from "react-query";


const HeaderFirst = (props) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.headerFirstGrid}>
      <Box className={styles.headerFirstLogoContent}>
        <Box>
          <img 
            className={styles.logoFirstHeader}
            src={`${mediaBaseURL + props?.logo?.url}`}
            srcSet={`${mediaBaseURL + props?.logo?.url}`}
            alt={"logo"}
            loading="lazy"
          />
        </Box>
        <Box>
          <Typography variant="h5">{props?.name}</Typography>
          <Typography variant="body2">{props?.subTitle}</Typography>
        </Box>
      </Box>
      <Box>
        {" "}
        {t?.started}: <Moment format="DD/MMM/YYYY">{props?.createdAt}</Moment>
      </Box>
    </Box>
  );
};
const ContentProjectDetails = (props) => {
  //slider
  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  
  const rightArrowStyles = {
    position: "absolute",
    top: "600%",
    transform: "translate(0, -50%)",
    right: "252px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const leftArrowStyles = {
    position: "absolute",
    top: "600%",
    transform: "translate(0, -50%)",
    left: "22px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const sliderStyles = {
    position: "relative",
    height: "100%",
  };
  
  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };
  
  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };
  
  const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
    const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
      ...slideStyles,
      //backgroundImage: `url(${slides[currentIndex].url})`,
      backgroundImage: ``,
    };
  
    return (
      <div style={sliderStyles}>
        <div>
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
        </div>
        <div style={slideStylesWidthBackground}></div>
      <div> 
      <Box className={styles.headerFirstGrid}>
        <Box className={styles.headerFirstLogoContent}>
          <Box>        
            {slides[currentIndex].isyoutubeurl ? (
              <iframe src={`https://www.youtube.com/embed/${slides[currentIndex].url}`}
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video'
                width= "763"
                height= "429"
              />
            ) : (
              
                <img
                  width= "763"
                  src={`${slides[currentIndex].url}`}
                  srcSet={`${slides[currentIndex].url}`}
                  alt={"logo"}
                  loading="lazy"
                />
              
            )}
          </Box>
          <Box>
            <Typography variant="h5">{props?.name}</Typography>
            <Typography variant="body2">{props?.subTitle}</Typography>
          </Box>
        </Box>
        <Box>
        {" "}
        {t?.started}: <Moment format="DD/MMM/YYYY">{props?.createdAt}</Moment>
      </Box>
      </Box>      		
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            {slides[slideIndex].isyoutubeurl ? (
			        <img width="90" src={`https://img.youtube.com/vi/${slides[slideIndex].url}/0.jpg`}/>
            ) : (
              <img width="120" src={`${slides[slideIndex].url}`}/>
            )}
          </div>
        ))}
      </div>
      </div>
    );
  };
  const ytubeurl = props?.companyData.youtube;
  const ytubeid = ytubeurl.replace("https://www.youtube.com/watch?v=","");
  const slides = [
    { url: ytubeid, title: "beach", isyoutubeurl: true },
    { url: mediaBaseURL + props?.companyData?.coverImage.url, title: "boat", isyoutubeurl: false },
    { url: mediaBaseURL + props?.companyData?.coverImage1.url, title: "boat",isyoutubeurl: false },
    { url: mediaBaseURL + props?.companyData?.coverImage2.url, title: "boat",isyoutubeurl: false },
  ];
  const containerStyles = {
    width: "980px",
    height: "40px",
    margin: "0 auto",
  };
  //end slider
  

  console.log(props?.companyData?.coverImage);
  console.log(props?.companyData.coverImage1);
  console.log(props?.companyData.coverImage2);
  console.log(props?.companyData.youtube);
  const [linkDocument, setLinkDocument] = useState(null);
  const { t } = useTranslation();

  const handleClickLinkFunction = (event) => {
    const id = event.target.id;
    setLinkDocument(id);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <HeaderFirst
            logo={props?.companyData?.logoImage}
            name={props?.companyData?.companyName}
            subTitle={props?.companyData?.companySubTitle}
            createdAt={props?.companyData?.createdAt}
          />

          <div style={containerStyles}>
            <ImageSlider slides={slides} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <SiteBarDetails company={props?.companyData} />
        </Grid>
      </Grid>
      <Grid className={styles.imageTitlePageFooter} container>
        <Grid className={styles.itemsFooter} item xs={12} lg={2}>
          <Language className={styles.imageTitlePageFooterIcons} />
          <a href={props?.companyData?.website}>
            {props?.companyData?.website?.split("/")?.[2]}
          </a>
        </Grid>
        <Grid className={styles.itemsFooter} item xs={12} lg={2}>
          <Email className={styles.imageTitlePageFooterIcons} />
          {props?.companyData?.email}
        </Grid>
        <Grid className={styles.itemsFooter} item xs={12} lg={3}>
          <LocalPhone className={styles.imageTitlePageFooterIcons} />
          {props?.companyData?.phoneNumber}
        </Grid>
        <Grid className={styles.itemsFooter} item xs={12} lg={1}>
          <a href={props?.companyData?.facebook}>
            <FacebookOutlined className={styles.imageTitlePageFooterIcons} />
          </a>
          <a href={props?.companyData?.linkedin}>
            {" "}
            <LinkedIn className={styles.imageTitlePageFooterIcons} />
          </a>
          <a href={props?.companyData?.twitter}>
            <Twitter className={styles.imageTitlePageFooterIcons} />
          </a>
        </Grid>
        <Grid className={styles.itemsFooter} item xs={12} lg={2}>
          <LocationOn className={styles.imageTitlePageFooterIcons} />
          {props?.companyData?.location}
        </Grid>
      </Grid>
      <Typography variant="body1" margin="1rem 0">
        {props?.companyData?.abstract}
      </Typography>

      <Box className={styles.tabLinkGrid}>
        {props?.companyData?.presentDetails?.map((item) => {
          return (
            <Box
              onClick={handleClickLinkFunction}
              id={item?.title + item?.id}
              key={item?.id }
              style={{
                background: linkDocument === item?.title ? "#D9FD00" : "",
                cursor: "pointer",
              }}
              padding="0.7rem 1.5rem"
              borderRadius="1.2rem"
            >
              <a href={`#${item?.title}`} _blank>
                {item?.title}
              </a>
            </Box>
          );
        })}
        {/* <Box
          onClick={handleClickLinkFunction}
          id="vision"
          style={{
            background: linkDocument === "vision" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Vision
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="overview"
          style={{
            background: linkDocument === "overview" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          {" "}
          Overview{" "}
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="problem"
          style={{
            background: linkDocument === "problem" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Problem
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="solutions"
          style={{
            background: linkDocument === "solutions" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Solutions
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="businessModel"
          style={{
            background: linkDocument === "businessModel" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
          minWidth={"fit-content"}
        >
          Business Model
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="whyInvest"
          style={{
            background: linkDocument === "whyInvest" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
          minWidth={"fit-content"}
        >
          Why Invest?
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="ourTeam"
          style={{
            background: linkDocument === "ourTeam" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
          minWidth={"fit-content"}
        >
          Our Team
        </Box> */}
      </Box>
      {props?.companyData?.presentDetails?.map((item) => {
        return (
          <>
            <Box className={styles.contentLink}>
              <Box id={item?.title} style={{paddingBottom:"10rem"}}></Box>
              <Link href={`#${item?.title}`}   style={{color:"#a7c300"}}>{item?.title}</Link>
            </Box>
            
            <Box overflow={"hidden"} >{renderRawHTML(item?.details)}</Box>
          </>
        );
      })}

      {/* <Typography variant="h5">
        become the largest Merlino Agent platform to trade home equity
      </Typography> */}
      {/* <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography> */}
      {/* <Box>
        <img
          className={styles.imageTitleProject}
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAU`}
          srcSet={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAUdpr=2 2x`}
          alt={"image Header"}
          loading="lazy"
        />
      </Box> */}
      {/* <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography> */}
      {/* <Box className={styles.contentLink}>
        <Link href="#">Overview</Link>
      </Box> */}
      {/* <Typography variant="h5">Merlino Agent title</Typography> */}
      {/* <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. of Lorem Ipsum.
      </Typography>
      <Typography variant="body2">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, content here, making it look
        like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search
        for lorem ipsum will uncover many web sites still in their infancy.
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </Typography> */}

      {/* <Box className={styles.contentLink}>
        <Link href="#">Problem</Link>
      </Box> */}
      {/* <Typography variant="h5">We have a big Problem</Typography>
      <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Problem 1: It is a long established fact that a reader will be
        distracted by the readable content of a page when looking layout. The
        point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using Content here, content here,
        making it look like readable English. Many desktop publishing packages
        and web page editors now use Lorem Ipsum as their default model text,
        and a search for lorem ipsum will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like). Problem
        2: It is a long established fact that a reader will be distracted by the
        readable content of a page when looking layout. The point of using Lorem
        Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using Content here, content here, making it look like
        readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for lorem
        ipsum will uncover many web sites still in their infancy. Various
        versions have evolved over the years, sometimes by accident, sometimes
        on purpose (injected humour and the like).
      </Typography> */}
      {/* <Box>
        <img
          className={styles.imageTitleProject}
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAU`}
          srcSet={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAUdpr=2 2x`}
          alt={"image Header"}
          loading="lazy"
        />
      </Box> */}
      {/* <Box className={styles.contentLink}>
        <Link href="#">Our Team</Link>
      </Box> */}
      {/* <Typography variant="h5">Merlino Agent Team</Typography>
      <Typography variant="body2">
        Everyone helping build Merlino Agent, not limited to employees.
      </Typography> */}

      {props?.companyData?.companyPresentTeamMember?.length > 0 && (
        <Box>
          <OurTeam person={props?.companyData?.companyPresentTeamMember?.[0]} />
        </Box>
      )}
      <Grid container>
        {props?.companyData?.companyPresentTeamMember?.map((item, index) => {
          if (index === 1) {
            return "";
          }
          return (
            <Grid key={item?.id} item xs={12} md={3} id={item?.id}>
              <OurTeam person={item} />
            </Grid>
          );
        })}
        {/* <Grid item xs={12} md={3}>
          <OurTeam />
        </Grid>
        <Grid item xs={12} md={3}>
          <OurTeam />
        </Grid>
        <Grid item xs={12} md={3}>
          <OurTeam />
        </Grid>
        <Grid item xs={12} md={3}>
          <OurTeam />
        </Grid> */}
      </Grid>

      <Grid container spacing={3}>
        {/* <Grid
          item
          xs={12}
          md={6}
          marginY={2}
          display={"flex"}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            // disabled
            startIcon={<MonetizationOnOutlined />}
          >
            {props?.companyData?.investmentMin} {t?.min}.
          </Button>
        </Grid> */}
        {/* <Grid
          xs={12}
          md={6}
          marginY={2}
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Button
            variant="contained"
            style={{ height: "2.5rem", alignSelf: "center" }}
          >
            Invest in Merlino Agent
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};

const SiteBarDetails = (props) => {
  const { t } = useTranslation();
  const router = useRouter()
console.log("router" , router?.query)
  const hasUserInvested =  async () => {
    const {data} = await axiosInstance.get(`company/company/presentation/${router?.query?.id}/hase_user_invested/`)
    console.log(data);
    return data
  }

  const hasInvested = useQuery("hase_user_invested", hasUserInvested)
  console.log("hasInvested " , hasInvested)
  const handleInvestFunction = (event) => {
    const token = getAccessToken()
    const id = event?.target?.id
    // console.log("token" , token)
    if (token){
      // redirect to payment page 
      router.push({
        pathname: '/invest',
        query: {id:id },
      })
    }else {
      //redirect to login page 
      router.push("/sign-in")
    }
  }
  // console.log("props.company" , props?.company)
  return (
    <Box>
      <Box
        display="flex"
        justifyContent={"end"}
        alignItems="center"
        height={"80px"}
      >
        {/* <IosShareOutlined /> */}
      </Box>
      <Box
        style={{
          backgroundColor: "#e5e5e5",
          padding: "1rem",
          marginTop: "2rem",
        }}
        borderRadius="1rem"
      >
        <Box className={styles.textSliderValue}>
          <Box className={styles.textSliderValuePrimary}>
            {" "}
            {props?.company?.collectedBudget}{dong} 
            <span style={{ fontWeight: "normal", fontSize: "1rem"  , paddingLeft:"5px"}}>
              {t?.raised}
            </span>
          </Box>
          <Box>
            <span>{t?.of} </span> {props?.company?.investmentTarget} {dong}
          </Box>
        </Box>
        <Box>
          <Slider
            aria-label="Temperature"
            value={props?.company?.collectedBudget}
            // getAriaValueText={valuetext}
            color="primary"
            // track={false}
            className={styles.slider}
            size="1rem"
            // disabled={true}
            min={1}
            max={props?.company?.investmentTarget}
            sx={{
              "& .MuiSlider-thumb": {
                display: "none",
              },
            }}
          />
        </Box>
        <Box
          display="flex"
          gap="0.5rem"
          justifyItems={"center"}
          marginTop="1rem"
        >
          <AccountCircleOutlined />
          <span style={{ fontWeight: "bold" }}>
            {props?.company?.numberInvestors}
          </span>
          <span>{t?.investors}</span>
        </Box>
        <Box
          display="flex"
          gap="0.5rem"
          justifyItems={"center"}
          marginTop="0.5rem"
        >
          <AccessTimeOutlined />
          <span style={{ fontWeight: "bold" }}>
            <Moment format="DD">{props?.company?.createdAt}</Moment>
          </span>
          <span>{t?.days}</span>
        </Box>
        <Box marginTop={"5rem"}>
          <Typography variant="body2" textAlign={"center"}>
            {dong} {props?.company?.investmentMin} {t?.minimum_investment}
          </Typography>
        </Box>
        <Box margin="1rem 0 ">
          <Button variant="contained" fullWidth={true} onClick={handleInvestFunction} id={props?.company?.company} disabled={ hasInvested?.data}>
            {t?.invest}
          </Button>
        </Box>
      </Box>
      <Box
        style={{ backgroundColor: "#FFF" }}
        padding="1.5rem"
        marginTop={"1rem"}
        borderRadius="1rem"
      >
        <Typography variant="h5">{t?.documents}</Typography>
        {props?.company?.presentDocuments?.map((item) => {
          return (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
              marginTop="2rem"
              id={item?.id}
              key={item?.id}
            >
              <Box display={"flex"} alignItems="center" gap="0.5rem">
                <InsertDriveFile />
                <span>{item?.fileName}</span>
              </Box>
              <a href={mediaBaseURL + item?.file?.url} download>
                <ArrowDownward color="primary" />
              </a>
            </Box>
          );
        })}

        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginTop="2rem"
        >
          <Box display={"flex"} alignItems="center" gap="0.5rem">
            <InsertDriveFile />
            <span>Merlino Agent document.docx</span>
          </Box>
          <ArrowDownward color="primary" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginTop="2rem"
        >
          <Box display={"flex"} alignItems="center" gap="0.5rem">
            <InsertDriveFile />
            <span>Merlino Agent form.pptx</span>
          </Box>
          <ArrowDownward color="primary" />
        </Box> */}
      </Box>
    </Box>
  );
};

const ProjectDetails = () => {
  return <Box>ProjectDetails</Box>;
};

export { ProjectDetails, HeaderFirst, SiteBarDetails, ContentProjectDetails };
