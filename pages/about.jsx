import Image from "next/image";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";

import { useTranslation, useAppTheme, useMediaBreakpoints } from "../hooks";
import styles from "../styles/About.module.css";
import { TeamMemberCard, VerticalDivider } from "../components/about";
import { MissionIcon } from "../components/icons";

const members = [
  {
    name: "Janifer Peters",
    position: "Head of Deal Flow",
    imgSrc: "/images/member1.png",
  },
  {
    name: "Harriet Watson",
    position: "Graphic Artist",
    imgSrc: "/images/member1.png",
  },
  {
    name: "Shawn Worboys",
    position: "Marketing/PR director",
    imgSrc: "/images/member1.png",
  },
  {
    name: "Emily Peters",
    position: "Developers",
    imgSrc: "/images/member1.png",
  },
];

const About = () => {
  const { t } = useTranslation();
  const { isMobile, isLargeDesktop } = useMediaBreakpoints();
  const theme = useAppTheme();
  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.about}
        </title>
        <meta name="description" content="Flocks AI about" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box>
        <Box className={styles.about_banner}>
          <Box pt={25} pb={10}>
            <Container maxWidth="lg">
              <Grid container spacing={12} className={styles.banner_container}>
                <Grid item md={6} sm={12}>
                  <Typography variant="h2" color="primary" fontSize={60} fontWeight="700">
                    <Box component="span" sx={{ marginRight: 3 }}>
                      <MissionIcon />
                    </Box>
                    {t.mission}
                  </Typography>
                  <Typography
                    variant="body1"
                    color={"primary"}
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: "8px",
                      padding: 2,
                    }}
                  >
                    {t.mission_message}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box className={styles.how_work_container} pt={10} pb={15}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              color="primary.dark"
              textAlign="center"
              my={isMobile ? 2 : 0}
              fontWeight="700"
            >
              {t?.how_flocks_ai_works}
            </Typography>
            {isMobile ? (
              <Box textAlign="center">
                <Box>
                  <Typography color="primary" fontWeight="bold">
                    1
                  </Typography>
                  <Image
                    src="/images/step1.svg"
                    width={240}
                    height={240}
                    alt="step 1"
                  />
                  <Typography color="primary">
                    {t?.how_works_step_1_text}
                  </Typography>
                </Box>
                <VerticalDivider />
                <Box>
                  <Typography color="primary" fontWeight="bold">
                    2
                  </Typography>
                  <Image
                    src="/images/step2.svg"
                    width={240}
                    height={240}
                    alt="step 1"
                  />
                  <Typography color="primary">
                    {t?.how_works_step_2_text}
                  </Typography>
                </Box>
                <VerticalDivider />
                <Box>
                  <Typography color="primary" fontWeight="bold">
                    3
                  </Typography>
                  {/* <Image
                    src="/images/step3.svg"
                    width={240}
                    height={240}
                    alt="step 3"
                  /> */}
                  <Image
                    src="/images/step4.svg"
                    width={240}
                    height={240}
                    alt="step 4"
                  />
                  <Typography color="primary">
                    {t?.how_works_step_3_text}
                  </Typography>
                </Box>
                <VerticalDivider />
                <Box>
                  <Typography color="primary" fontWeight="bold">
                    4
                  </Typography>
                  {/* <Image
                    src="/images/step4.svg"
                    width={240}
                    height={240}
                    alt="step 4"
                  /> */}
                  <Image
                    src="/images/step3.svg"
                    width={240}
                    height={240}
                    alt="step 3"
                  />
                  <Typography color="primary">
                    {t?.how_works_step_4_text}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box py={10}>
                <img
                  src="/images/curve.svg"
                  width={isLargeDesktop ? 1000 : 850}
                  height={650}
                  alt="timeline"
                  style={{
                    position: "relative",
                    left: 220,
                  }}
                />
                <Box className={styles.timeline_step1}>
                  <Typography color="primary" fontWeight="bold">
                    1
                  </Typography>
                  <Image
                    src="/images/step1.svg"
                    width={240}
                    height={240}
                    alt="step 1"
                  />
                  <Typography color="primary">
                    {t?.how_works_step_1_text}
                  </Typography>
                </Box>
                <Box className={styles.timeline_step2}>
                  <Typography color="primary" fontWeight="bold">
                    2
                  </Typography>
                  <Image
                    src="/images/step2.svg"
                    width={240}
                    height={240}
                    alt="step 1"
                  />
                  <Typography color="primary">
                    {t?.how_works_step_2_text}
                  </Typography>
                </Box>
                <Box className={styles.timeline_step3}>
                  <Typography color="primary" fontWeight="bold">
                    3
                  </Typography>
                  <Image
                    src="/images/step4.svg"
                    width={240}
                    height={240}
                    alt="step 4"
                  />
                  {/* <Image
                    src="/images/step3.svg"
                    width={240}
                    height={240}
                    alt="step 3"
                  /> */}
                  <Typography color="primary">
                    {t?.how_works_step_3_text}
                  </Typography>
                </Box>
                <Box className={styles.timeline_step4}>
                  <Typography color="primary" fontWeight="bold">
                    4
                  </Typography>
                  <Image
                    src="/images/step3.svg"
                    width={240}
                    height={240}
                    alt="step 3"
                  />
                  {/* <Image
                    src="/images/step4.svg"
                    width={240}
                    height={240}
                    alt="step 4"
                  /> */}
                  <Typography color="primary">
                    {t?.how_works_step_4_text}
                  </Typography>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
        <Box className={styles.backed_by_container} py={5}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              color="secondary.dark"
              py={2}
            >
              {t?.backed_by}
            </Typography>
            <Grid container className={styles.backed_logos_container} py={5}>
              <Grid item md={3} xs={6} textAlign="right">
                <Image
                  src="/images/1.svg"
                  width={175}
                  height={45}
                  alt="backed logo"
                />
              </Grid>
              <Grid item md={3} xs={6} textAlign="right">
                <Image
                  src="/images/2.svg"
                  width={175}
                  height={45}
                  alt="backed logo"
                />
              </Grid>
              <Grid item md={3} xs={6} textAlign="right">
                <Image
                  src="/images/3.svg"
                  width={175}
                  height={45}
                  alt="backed logo"
                />
              </Grid>
              <Grid item md={3} xs={6} textAlign="left">
                <Image
                  src="/images/4.svg"
                  width={175}
                  height={45}
                  alt="backed logo"
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box className={styles.members_container} py={5}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              color="primary.dark"
              textAlign="center"
              fontWeight={700}
              py={2}
              mb={5}
            >
              {t?.our_team}
            </Typography>
            <Grid container spacing={2}>
              {members.map((member) => (
                <Grid item md={3} xs={12} key={member.name} my={3}>
                  <TeamMemberCard
                    name={member.name}
                    position={member.position}
                    imgSrc={member.imgSrc}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box>
          <img
            src="/images/about-img.svg"
            alt="about"
            className={styles.about_bottom_img}
          />
        </Box>
      </Box>
    </>
  );
};

export default About;
