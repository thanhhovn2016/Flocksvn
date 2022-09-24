import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  
} from "@mui/material";

import { useTranslation, useMediaBreakpoints } from "../hooks";

const WhyInvest = () => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();
 

  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.faq}
        </title>
        <meta
          name="description"
          content="Flocks AI Frequently Asked Questions"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box>
        <Box
          sx={{
            backgroundImage: isMobile ? "none" : "url(/images/event-bg.png)",
            backgroundColor: isMobile ? "#AECB00" : "transparent",
            backgroundSize: "cover",
            backgroundPosition: "100% 100%",
            backgroundRepeat: "no-repeat",
            minHeight: 400,
            textAlign: "center",
            pt: 10,
            borderRadius: isMobile ? "0px 0px 40px 40px" : "0px",
            display:"grid",
            // justifyItems:"center",
            alignItems:"center"
            // margin:"auto 0"
          }}
        >
         
          <Typography
            variant={isMobile ? "h5" : "h4"}
            color="#fff"
            fontWeight="bold"
            // pt={10}
            // pb={3}
          >
            {/* {t?.frequently_asked_questions} */}
            {t?.why_invest}
          </Typography>
          
        </Box>
        <Container maxWidth="md">
          <Typography variant="h6" mt={10} >
            
          </Typography>
          <Typography variant="h6"  pt={2} display="inline">
            {t.find_your_flock}
          </Typography>
          <Typography variant="body1"  pt={1} display="inline">
            {t.find_your_flock_p1}
          </Typography>
          <Typography variant="body1"  pt={1} pb={5}>
            {t.find_your_flock_p2}
          </Typography>
          <Typography variant="h6" mt={10} display="inline">
            {t?.design_the_future}
          </Typography>
          <Typography variant="body1" pt={1} display="inline" mb={5}>
          {t?.design_the_future_p1}
          </Typography>
          <Typography pt={4}></Typography>
          <Typography variant="h6" mt={10} display="inline">
            {t?.reap_the_benifits}
          </Typography>
          <Typography variant="body1" pt={1} display="inline" mb={5}>
          {t?.reap_the_benifits_p1}
          </Typography>
          <Typography pt={4}></Typography>
          <Typography variant="h6" mt={10} display="inline">
            {t?.be_your_own_boss}
          </Typography>
          <Typography variant="body1" pt={1} display="inline" mb={5}>
          {t?.be_your_own_boss_p1}
          </Typography>
          <Typography pt={4}></Typography>
          <Typography variant="h6" mt={10} display="inline">
            {t?.cost_you_nothing}
          </Typography>
          <Typography variant="body1" pt={1} display="inline" mb={5}>
          {t?.cost_you_nothing_p1}
          </Typography>
          <Typography pt={4}></Typography>
          <Typography variant="h6" mt={10} display="inline">
            {t?.everyone_wins}
          </Typography>
          <Typography variant="body1" pt={1} display="inline" mb={5}>
          {t?.everyone_wins_p1}
          </Typography>
          <Typography pt={4}></Typography>
          <Typography variant="h6" mt={10} display="inline">
            {t?.every_little_counts}
          </Typography>
          <Typography variant="body1" pt={1} display="inline" mb={5}>
          {t?.every_little_counts_p1}
          </Typography>
          <Typography pt={5}></Typography>
        </Container>
      </Box>
    </>
  );
};

export default WhyInvest;
