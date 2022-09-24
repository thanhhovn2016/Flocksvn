import { useRouter } from "next/router";
import {
  Box,
  Container,
  Card,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";

import {
  StatisticsCard,
  RaisedProjectCard,
  IncompleteProjectCard,
  RaisedProjectChart,
} from "../";
import { useMediaBreakpoints, useAuth, useTranslation } from "../../../hooks";
import { getAllProjects, getAllCompanies } from "../../../services";
import { mediaBaseURL } from "../../../utils/constants";
import { formatedDate } from "../../../utils/functions";

const Raisings = ({ statistics, chartData }) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  const { data: raisedProjects, isLoading } = useQuery(
    "userCreatedProjects",
    getAllProjects
  );
  const { data: createdCompanies, isLoading: companyLoading } = useQuery(
    "userCreatedCompanies",
    getAllCompanies
  );

  const handleAddProject = (companyId) => {
    auth.setCompanyId(companyId);
   
    router.push("/projects/create/");
  };
 
  return (
    <Box>
      <Grid container spacing={5} py={5}>
        {statistics &&  Object?.keys(statistics)?.map((item) => 
        (
          <Grid key={item} item md={4} xs={12}>
            <StatisticsCard value={statistics[item]} label={t?.[item]} />
          </Grid>
        )
        )}
      </Grid>

      {/* {!isMobile && ( */}
        <Grid container>
          <Grid item md={12} xs={12}>
           { chartData && <RaisedProjectChart data={chartData} />}
          </Grid>
        </Grid>
      {/* )} */}
{/* 
      <Grid container spacing={3} py={5}>
        {raisedProjects?.length > 0 && <Grid item md={12}>
          <Typography color="secondary.dark" fontWeight="bold">
            {t?.created_projects}
          </Typography>
        </Grid>}
        {isLoading ? (
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        ) : (
          raisedProjects?.results?.map((project) => (
            <Grid key={project.id} item md={12} xs={12}>
              <RaisedProjectCard
              id={project?.id}
                projectTitle={project.companyName}
                category={project.companyCategory}
                logo={`${mediaBaseURL}${project?.logoImage?.url}`}
                cover={`${mediaBaseURL}${project?.coverImage?.url}`}
                investors={project.numberInvestors}
                targetAmount={project.investmentTarget}
                raisedAmount={project?.collectedBudget}
                createdDate={formatedDate(project?.createdAt)}
                closingDate={project?.closingDate}
                minimumAmount={project?.investmentMin}
              />
            </Grid>
          ))
        )}
      </Grid> */}
      {/* <Grid container spacing={3} py={5}>
        {createdCompanies?.length > 0 && <Grid item md={12}>
          <Typography color="secondary.dark" fontWeight="bold">
            {t?.created_companies}
          </Typography>
        </Grid>}
        {isLoading ? (
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        ) : (
          createdCompanies?.results
            ?.filter((company) => company.hasCompanyPresent == false)
            .map((company) => (
              <Grid key={company.id} item md={12} xs={12}>
                <IncompleteProjectCard
                  companyName={company?.companyName}
                  status={company?.status}
                  createdDate={formatedDate(company?.createdAt)}
                  onAddProjectClick={() => handleAddProject(company.id)}
                />
              </Grid>
            ))
        )}
      </Grid> */}
    </Box>
  );
};

export default Raisings;
