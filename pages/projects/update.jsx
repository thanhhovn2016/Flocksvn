import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress, Container, Grid } from "@mui/material";

import { useTranslation, useAppTheme, useAuth } from "../../hooks";
import { ProposalCreationForm } from "../../components/company";
import { useQuery } from "react-query";
import axiosInstance from "../../services/axiosLocalServer";
// import axiosInstance from "../../services/axiosWithAuth";
import { apiRoutes } from "../../utils/constants";
// import { getProject } from "../../services/fundRaising";

const CreateProject = (props) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  let id = router?.query?.id
  const [handleLoadApi , setHandleLoadApi] = React.useState(true)
//   React.useEffect(() => {
//     if (!auth.companyId) {
//       router.push("/profile");
//     }
//   }, [auth.companyId]);

const getProject = async () => {
    const {data} = await axiosInstance.get(`${apiRoutes.project}${id}/`);
    return data;
}

const {isError , error ,isLoading , data} = useQuery("getProjectDetails", getProject,{enabled:handleLoadApi,
refetchOnWindowFocus:false})


  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.update_project}
        </title>
        <meta name="description" content="Flocks AI create new project" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Backdrop open={isLoading}>
              <CircularProgress />
            </Backdrop>
      { data?.id && <Grid container spacing={3} py={5} pt={15} justifyContent={"center"}>
        <Grid item md={10} xs={12}>
          <ProposalCreationForm id={data?.id} companyData={data} />
        </Grid>
      </Grid>}
    </Container>
  );
};

export default CreateProject;
