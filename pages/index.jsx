import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Typography, Grid, Box, Container, Card } from "@mui/material";
import { InvestButton } from "../components/icons";

import { useTranslation, useMediaBreakpoints, useAuth } from "../hooks";
import styles from "../styles/Home.module.css";
import { setUserType, getUserType } from "../utils/storage";
import { getTrendProjects } from "../services";
import { apiRoutes, dong } from "../utils/constants";
import axiosInstance from "../services/axiosWithApikey";
import Project from "../components/projects";
import ErrorServer from "../components/error_server";

export default function Home(props) {
  const { t } = useTranslation();
  const { isMobile, isLargeDesktop } = useMediaBreakpoints();
  const auth = useAuth();
  const locale = useRouter().locale;
  const userType = getUserType();
  const router = useRouter();
  const [isMore, setIsMore] = React.useState(false);

  const handleInvestorClick = () => {
    setUserType("investor");
    if (auth.token == null) {
      router.push("/sign-in");
    } else if (userType === "investor") {
      router.push(userType);
    } else {
      router.push("/investor");
    }
  };

  const handleFundRaiserClick = () => {
    setUserType("company");
    if (auth.token == null) {
      router.push("/sign-in");
    } else if (userType === "company") {
      router.push(userType);
    } else {
      router.push("/company");
    }
  };

  const moreToggler = () => {
    setIsMore(!isMore);
  };
  // return <div>
  //   <Head>
  //       <title>
  //         {t.app_name} | {t.home}
  //       </title>
  //       <meta name="description" content="Flocks AI Home page" />
  //       <link rel="icon" href="/logo.png" />
  //     </Head>
  //     <ErrorServer />
  // </div>
  return (
    <div>
      <Head>
        <title>
          {t.app_name} | {t.home}
        </title>
        <meta name="description" content="Flocks AI Home page" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Box className={styles.banner_container}>
        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="flex-end"
            pb={10}
            pt={isMobile ? 5 : 20}
          >
            {isMobile ? (
              <Grid item md={12} xs={12} pt={0}>
                <Image
                  src="/images/flacksLogo.png"
                  alt="logo"
                  width={120}
                  height={130}
                />
              </Grid>
            ) : null}
            <Grid item md={6} xs={12} pt={2}>
              <Typography
                variant={isMobile ? "h3" : "h2"}
                color="secondary.dark"
                fontWeight="bold"
                lineHeight={1}
              >
                {t.app_name}
              </Typography>
              <Typography
                variant={isMobile ? "h4" : "h4"}
                textAlign={"left"}
                color="secondary.dark"
              >
                {t.app_slogan}
              </Typography>
              <div
                style={{ color: "secondary.dark", lineHeight: 2 }}
                dangerouslySetInnerHTML={{ __html: t.more_text_p1 }}
              />
              {/* {isMore && (
                <Box>
                
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p2}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p3}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p4}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p5}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p6}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p7}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p8}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p9}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p10}} />
                <div style={{color:"secondary.dark" , lineHeight:2}}  dangerouslySetInnerHTML={{__html: t.more_text_p11}} />

                </Box>
              )} */}
              {/* <Button
                sx={{
                  // backgroundColor: "primary.light",
                  backgroundColor: "#FFF",
                  color: "secondary.dark",
                  ":hover": {
                    // backgroundColor: isMobile ? "primary.dark" : "transparent",
                    // backgroundColor : isMobile ? "#FFF" : "transparent"
                    backgroundColor: "#FFF",
                    // color: "secondary.dark",
                    // border:"5px solid primary.dark"
                    border: "3px solid #d9fd0080",
                    color: "secondary.dark",
                  },
                }}
                variant="outlined"
                className={styles.join_now_btn}
                onClick={moreToggler}
              >
                {isMore ? t.less : t.learn_more}
              </Button> */}
            </Grid>
            <Grid item md={6} xs={12} textAlign="right" position={"relative"}>
              <Image
                src="/images/parrot.svg"
                alt="parot"
                width={500}
                height={500}
              />

              {/* <img
                src="/images/join-us-spinner.svg"
                height={130}
                width={130}
                alt="join us spinner"
                className={styles.join_us_spinner}
                style={{
                  // right: isLargeDesktop ? "350px" : isMobile ? "50px" : "100px",
                  // top: isMobile ? "250px" : "350px",
                  bottom:isMobile ? "-25%" : "0%",
                  right: isMobile ? "-30px" :"100px",
                  // bottom:"0%"
                }}
              /> */}
            </Grid>
            <Grid xs={12} pt={0}>
              {isMore && (
                <Box>
                  <Typography
                    variant={"h4"}
                    style={{ color: "secondary.dark", lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p2 }}
                  />
                  1:{" "}
                  <div
                    style={{
                      color: "secondary.dark",
                      lineHeight: 2,
                      display: "inline-block",
                    }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p3 }}
                  />
                  <br />
                  2:{" "}
                  <div
                    style={{
                      color: "secondary.dark",
                      lineHeight: 2,
                      display: "inline-block",
                    }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p4 }}
                  />
                  <br />
                  3:{" "}
                  <div
                    style={{
                      color: "secondary.dark",
                      lineHeight: 2,
                      display: "inline-block",
                    }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p5 }}
                  />
                  <br />
                  <div
                    style={{
                      color: "secondary.dark",
                      lineHeight: 2,
                      marginTop: "1rem",
                    }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p6 }}
                  />
                  <div
                    style={{ color: "secondary.dark", lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p7 }}
                  />
                  <div
                    style={{ color: "secondary.dark", lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p8 }}
                  />
                  <div
                    style={{ color: "secondary.dark", lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p9 }}
                  />
                  <div
                    style={{ color: "secondary.dark", lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p10 }}
                  />
                  <div
                    style={{ color: "secondary.dark", lineHeight: 2 }}
                    dangerouslySetInnerHTML={{ __html: t.more_text_p11 }}
                  />
                </Box>
              )}
            </Grid>
            <Grid xs={12} pt={0}>
              <Button
                sx={{
                  // backgroundColor: "primary.light",
                  backgroundColor: "#FFF",
                  color: "secondary.dark",
                  ":hover": {
                    // backgroundColor: isMobile ? "primary.dark" : "transparent",
                    // backgroundColor : isMobile ? "#FFF" : "transparent"
                    backgroundColor: "#FFF",
                    // color: "secondary.dark",
                    // border:"5px solid primary.dark"
                    border: "3px solid #d9fd0080",
                    color: "secondary.dark",
                  },
                }}
                variant="outlined"
                className={styles.join_now_btn}
                onClick={moreToggler}
              >
                {isMore ? t.less : t.learn_more}
              </Button>
            </Grid>
          </Grid>
          {/* <img
            src="/images/join-us-spinner.svg"
            height={130}
            width={130}
            alt="join us spinner"
            className={styles.join_us_spinner}
            style={{
              right: isLargeDesktop ? "350px" : isMobile ? "50px" : "100px",
              top: isMobile ? "850px" : "600px",
              // bottom:isMobile ? "" : ""
            }}
          /> */}
        </Container>
      </Box>

      <Box className={styles.which_way_container} py={0}>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              padding: "2rem 0",
            }}
          >
            <Grid item md={6} xs={12}>
              <Box
                onClick={handleInvestorClick}
                position="relative"
                display="grid"
                justifyContent={"center"}

                // style={{backgroundImage:"url(/images/invest.svg)", height:"300px" , width:"350px" , backgroundSize:"cover"}}
              >
                <Image
                  // src="/images/invest-btn.svg"
                  src="/images/triangle.svg"
                  width={400}
                  height={350}
                  alt="invest button"
                  className={styles.which_way_link}
                  onClick={handleInvestorClick}
                />
                <Box
                  // variant="body1"
                  color="#FFF"
                  position={"absolute"}
                  top="60%"
                  display={"grid"}
                  textAlign="center"
                  fontFamily={"Chrismas"}
                  // left="39%"
                  // left= {isMobile ? "30vw" : "39%" }
                  fontSize="2.2rem"
                  fontWeight="900"
                  paddingLeft="6px"
                  sx={{ cursor: "pointer" }}
                  onClick={handleInvestorClick}
                  // display="grid"
                  justifySelf={"center"}
                  // fontFamily="gilory-black"
                >
                  {t?.invest?.toUpperCase()}
                </Box>
                {/* <InvestButton text={"INVEST"}/> */}
              </Box>
            </Grid>
            <Grid item md={6} xs={12} textAlign="right">
              <Box
                onClick={handleFundRaiserClick}
                position="relative"
                display="grid"
                justifyContent={"center"}
              >
                <Image
                  // src="/images/raise-btn.svg"
                  src="/images/triangle.svg"
                  width={400}
                  height={350}
                  alt="raise button"
                  className={styles.which_way_link}
                  onClick={handleFundRaiserClick}
                />

                <Box
                  // variant="body1"
                  color="#FFF"
                  position={"absolute"}
                  top="54%"
                  display={"grid"}
                  textAlign="center"
                  fontFamily={"Chrismas"}
                  // left="39%"
                  fontSize="2.2rem"
                  fontWeight="900"
                  paddingLeft="15px"
                  sx={{ cursor: "pointer" }}
                  justifySelf="center"
                  onClick={handleFundRaiserClick}
                >
                  {t?.raise?.toUpperCase()}
                </Box>
                <Box
                  // variant="body1"
                  sx={{ cursor: "pointer" }}
                  color="#FFF"
                  position={"absolute"}
                  top="64%"
                  display={"grid"}
                  textAlign="center"
                  fontFamily={"Chrismas"}
                  // left="37%"
                  fontSize="2.2rem"
                  fontWeight="900"
                  paddingLeft="6px"
                  justifySelf={"center"}
                  onClick={handleFundRaiserClick}
                >
                  {t?.capital?.toUpperCase()}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Grid
        container
        justifyContent="center"
        alignItems={"center"}
        textAlign="center"
        style={{ backgroundColor: "#8080801f" }}
      >
        <Grid item xs={12} pt={3}>
          <Typography textAlign={"center"} fontWeight="bold">
            {t.backed_by}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}   pt={3} pb={3}>
          <Link href={"https://www.binance.com/en"}>
            <Image
              src="/images/binance.png"
              width={90}
              height={60}
              alt="Binance"
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
        </Grid>
        <Grid item xs={12} md={2}   pt={3} pb={3}>
          <Link href={"https://momo.vn/"}>
            <Image
              src="/images/momoLogo.svg"
              // width={82}
              // height={58}
              width={100}
              height={80}
              alt="MOMO"
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
        </Grid>
      </Grid>
   
      <Box className={styles.statistics_container} py={5}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={1} xs={0}></Grid>
            <Grid item md={10} xs={12} className={styles.statistics} py={4}>
              <Grid container spacing={10}>
                <Grid
                  item
                  md={4}
                  xs={12}
                  textAlign={isMobile ? "center" : "left"}
                >
                  <Card
                    style={{
                      backgroundColor: "#A8C301",
                      padding: "2rem 0 ",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="#FFF"
                      textAlign={"center"}
                      fontWeight="700"
                      fontSize="2.6rem"
                    >
                      {dong} 700 M
                    </Typography>
                    <Typography color="#FFF" textAlign={"center"}>
                      {t?.invested}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item md={4} xs={12} textAlign="center">
                  <Card
                    style={{
                      backgroundColor: "#A8C301",
                      padding: "2rem 0 ",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="#FFF"
                      textAlign={"center"}
                      fontWeight="700"
                      fontSize="2.6rem"
                    >
                      500 K
                    </Typography>
                    <Typography color="#FFF" textAlign={"center"}>
                      {t?.members}
                    </Typography>
                  </Card>
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                  textAlign={isMobile ? "center" : "right"}
                >
                  <Card
                    style={{
                      backgroundColor: "#A8C301",
                      padding: "2rem 0 ",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="#FFF"
                      textAlign={"center"}
                      fontWeight="700"
                      fontSize="2.6rem"
                    >
                      +600
                    </Typography>
                    <Typography color="#FFF" textAlign={"center"}>
                      {t?.deals_done}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={1} xs={0}></Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Typography
          color="primary.dark"
          variant="h4"
          textAlign="center"
          py={5}
          fontWeight={"600"}
          sx={{
            fontFamily: "Chrismas !important",
          }}
        >
          {t?.trending_projects_title}
        </Typography>
        <Container maxWidth="lg">
          <Grid container spacing={2} pt={2} pb={10}>
            {props?.trendingProjects?.results?.map((project) => (
              <Grid key={project?.id} item md={4} xs={12}>
                <Project company={project} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export async function getStaticProps(context) {
  const trendingProjects = await getTrendProjects();
  return {
    props: {
      trendingProjects,
    },
    revalidate: 60,
  };
}
