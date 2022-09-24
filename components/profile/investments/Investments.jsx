import { Box, Container, Card, Grid, Typography } from "@mui/material";
import Link from 'next/link'

import {
  StatisticsCard,
  InvestedProjectCard,
  InvestedProjectsChart,
} from "../";
import { useMediaBreakpoints, useTranslation } from "../../../hooks";

const Investments = ({ statistics, chartData, investedProjects }) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();
  return (
    <Box>
      <Grid container spacing={5} py={5}>
        {statistics  && Object?.keys(statistics)?.map((item) => 
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
            <InvestedProjectsChart data={chartData} />
          </Grid>
        </Grid>
      {/* )} */}

      <Grid container spacing={3} py={5}>
       {investedProjects?.length > 0 && <Grid item md={12}>
          <Typography>{t?.participated_projects}</Typography>
        </Grid>}
        {investedProjects?.map((project) => (
          <Grid key={project.id} item md={12} xs={12}>
            {/* <Link href={`/project/?${project?.id}`} > */}
            <InvestedProjectCard
            id={project?.id}
              // projectTitle={project.projectTitle}
              projectTitle={project.companyName}
              category={project?.companyCategory?.name}
              logo={project?.logoImage?.url}
              cover={project?.coverImage?.url}
              investors={project?.numberInvestors}
              targetAmount={project.investmentTarget}
              investedAmount={project.collectedBudget}
              investedDate={project?.createdAt}
              closingDate={project.closingDate}
            />
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Investments;
