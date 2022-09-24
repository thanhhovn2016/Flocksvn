import React from "react";
import Head from "next/head";
import { Container, Grid } from "@mui/material";

import { useTranslation, useAppTheme } from "../hooks";
import {
  CompanyProfile,
  CompanyProfileCompleted,
  ProposalCreationForm,
} from "../components/company";

import { getCompanyQuestions } from "../services";

const Company = (props) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleCompanyProfileComplete = () => {
    setActiveStep(1);
  };

  const handleProjectCreation = () => {
    setActiveStep(2);
  };

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.company}
        </title>
        <meta name="description" content="Flocks AI company profile creation" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        {activeStep === 0 ? (
          <Grid item md={6} xs={12}>
            <CompanyProfile
              questions={props.questions}
              onComplete={handleCompanyProfileComplete}
            />
          </Grid>
        ) : activeStep === 1 ? (
          <Grid item md={10} xs={12}>
            <CompanyProfileCompleted
              onAddProjectClick={handleProjectCreation}
            />
          </Grid>
        ) : activeStep === 2 ? (
          <Grid item md={10} xs={12}>
            <ProposalCreationForm />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};

export default Company;

Company.requireAuth = true;

export async function getStaticProps(context) {
  const questions = await getCompanyQuestions();

  return {
    props: {
      questions,
    },
    revalidate: 60,
  };
}
