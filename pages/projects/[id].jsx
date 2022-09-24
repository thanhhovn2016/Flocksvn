import Head from "next/head";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { Container, Backdrop, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { ContentProjectDetails } from "../../components/projects/projectDetails";
import { getProjectDetails, getProjects } from "../../services/projects";
import { useTranslation } from "../../hooks";
import axiosInstance from "../../services/axiosLocalServer";

const ProjectDetailsPage = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const projectId = router.query.id;
  const { isLoading, data: project } = useQuery(
    ["project", projectId],
    async () => {
      const { data } = await axiosInstance.get(`/project/${projectId}`);
      return data;
    }
  );

  return (
    <>
      <Head>
        <title>
          {t.title} | {props?.event?.companyName}
        </title>
        <meta name="description" content={props?.event?.companyName} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box style={{ background: "#e5e5e59e" }} py={15}>
        <Container maxWidth="lg">
          {isLoading ? (
            <Backdrop open>
              <CircularProgress />
            </Backdrop>
          ) : (
            <ContentProjectDetails companyData={project} />
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetailsPage;

// export async function getStaticPaths(context) {
//   const ids = await getProjects();

//   const paths = ids?.results?.map((item) => ({
//     params: { id: item?.id?.toString() },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   const event = await getProjectDetails(params?.id);

//   return {
//     props: {
//       event: event,
//     },
//     revalidate: 60,
//   };
// }
