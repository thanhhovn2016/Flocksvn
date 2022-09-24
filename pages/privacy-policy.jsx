import React from "react";

import Head from "next/head";

import { Box, Container, Typography } from "@mui/material";

import { useTranslation, useMediaBreakpoints } from "../hooks";

const PrivacyPolicy = () => {
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
            display: "grid",
            // justifyItems:"center",
            alignItems: "center",
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
            Privacy Policy
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Typography variant="h6" mt={10}>
            Flocks Ai Crowdfunding, Inc. ("Flocks Ai") Provides An Intermediary
            Technology Platform Located At Www.flocks.vn (“Platform” Or “Site”)
            For Prospective Investors To Independently Search And Invest In
            Securities Offerings On The Site. Unless Indicated Otherwise, All
            Securities-Related Activity On This Site Is Conducted By Flocks Ai
            Capital, LLC ("Flocks Ai Capital”), An Affiliate Of Flocks Ai And A
            SEC-Registered Funding Portal And Member Of FINRA, Or Flocks Ai
            Primary, LLC (" Flocks Ai Primary”), An Affiliate Of Flocks Ai And A
            SEC-Registered Broker-Dealer And A Member Of FINRA/SIPC. This
            Privacy Policy Explains How Flocks Ai Crowdfunding, Inc., And Its
            Subsidiaries And Affiliates, Including Flocks Ai Capital LLC And
            Flocks Ai Primary LLC, (Collectively Flocks Ai , “We” Or “Us”)
            Collect, Use, Share And Protect Your Information.
          </Typography>
          <Typography variant="h6" mb={10} pt={2}>
            As explained below, we collect information from users (“you”,
            “your”, or “User”) in various ways when you interact with our Site.
            By using our Site, you consent to our collection and use of
            information as explained in this Privacy Notice and agree to be
            bound by our Terms of Use. Please note that if you choose to invest
            in any prospect, project, or offering advertised on our Site, you
            may be required to agree to a separate agreement, including, but not
            limited to, new or additional privacy notices or terms of use. Our
            privacy policy will apply even if you are no longer a customer of
            Flocks Ai.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
