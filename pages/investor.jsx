import React from "react";
import Head from "next/head";
import { Container, Grid, Backdrop, CircularProgress } from "@mui/material";

import { useTranslation, useAuth } from "../hooks";
import {
  InvestorProfile,
  Review,
  InvestmentProfileCompleted,
} from "../components/investor";

import { getInvestmentQuestions } from "../services";

const Investor = (props) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleReviewComplete = () => {
    setActiveStep(1);
  };

  const handleInvestorProfileComplete = () => {
    setActiveStep(2);
  };

  if (auth?.userProfileQuery?.isLoading) {
    return (
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </Grid>
      </Grid>
    );
  }
  if (auth?.userProfileQuery?.data?.data?.hasInvestmentProfile) {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3} pt={20} justifyContent={"center"}>
          <Grid item md={12} xs={12}>
            <InvestmentProfileCompleted />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.investor}
        </title>
        <meta
          name="description"
          content="Flocks AI investor profile creation"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        <Grid item md={6} xs={12}>
          {activeStep === 0 ? (
            <Review onReviewComplete={handleReviewComplete} />
          ) : activeStep === 1 ? (
            <InvestorProfile
              questions={props.questions}
              onInvestorProfileComplete={handleInvestorProfileComplete}
            />
          ) : activeStep === 2 ? (
            <InvestmentProfileCompleted />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Investor;

Investor.requireAuth = true;

export async function getStaticProps(context) {
  const questions = await getInvestmentQuestions();

  return {
    props: {
      questions,
    },
    revalidate: 60,
  };
}
