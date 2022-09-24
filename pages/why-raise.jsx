import React from "react";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";

import { useTranslation, useMediaBreakpoints } from "../hooks";

const WhyRaise = () => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();

  return (
    <Box>
      <Head>
        <title>
          {t?.title}
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
            Why Raise
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Typography variant="h6" mt={10} pb={10}>
            A Flocks Ai campaign is much more than fundraising. Our companies
            tripled user bases, sold millions worth of product, gained press
            coverage, connected with VCs, and raised follow on rounds at great
            terms—all because of their Flocks Ai campaigns.
          </Typography>
          {/* <Typography variant="h6" mb={10} pt={2}>
            Unicorns are startups that reach the valuation of over $1B. If you
            find and invest in one at an early stage, you could earn a
            significant return on investment. While no one can predict which
            companies will become unicorns, Republic gives you access to
            companies who have the potential to become one.
          </Typography> */}
        </Container>
      </Box>
    </Box>
  );
};

export default WhyRaise;
