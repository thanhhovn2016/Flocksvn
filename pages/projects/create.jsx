import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Grid } from "@mui/material";

import { useTranslation, useAppTheme, useAuth } from "../../hooks";
import { ProposalCreationForm } from "../../components/company";

const CreateProject = (props) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!auth.companyId) {
      router.push("/profile");
    }
  }, [auth.companyId]);

  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.create_project}
        </title>
        <meta name="description" content="Flocks AI create new project" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={3} py={0} pt={0} justifyContent={"center"}>
        <Grid item md={10} xs={12}>
          <ProposalCreationForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProject;
