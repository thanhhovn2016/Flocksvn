import Head from "next/head";
import { Container, Grid, Backdrop, CircularProgress } from "@mui/material";

import { useTranslation, useAuth } from "../../hooks";
import { EditProfileForm } from "../../components/profile";

const EditProfile = () => {
  const { t } = useTranslation();
  const { userProfileQuery } = useAuth();

  if (userProfileQuery.isLoading) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <>
      <Head>
        <title>
          {t.title} | {t?.edit_profile}
        </title>
        <meta name="description" content={"Edit user profile"} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Container maxWidth="xl">
        <Grid container justifyContent="center" py={0} mt={0}>
          <Grid item md={6}>
            <EditProfileForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditProfile;

EditProfile.requireAuth = true;
