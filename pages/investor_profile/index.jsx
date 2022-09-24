import { Backdrop, Box, CircularProgress, Container, Grid } from "@mui/material";
import { useQuery } from "react-query";
import { Investments } from "../../components/profile";
import axiosInstance from "../../services/axiosWithAuth";
import { apiRoutes } from "../../utils/constants";
import investmentData from "../../data/investments.json";
import { useAuth } from "../../hooks";
import { InvestmentProfileCompleted  , InvestmentProfileInCompleted} from "../../components/investor";


const InvestorProfile = () => {
  const auth = useAuth();

  const getInvestmentStatistic = async () => {
    const { data } = await axiosInstance.get(apiRoutes.investmentStatistic);
    return data;
  };
  const investmentStatistic = useQuery(
    "investmentStatistic",
    getInvestmentStatistic
  );

  // if (auth?.userProfileQuery?.isLoading) {
  //   return (
  //     <Grid container sx={{ minHeight: "100vh" }}>
  //       <Grid item>
  //         <Backdrop open>
  //           <CircularProgress />
  //         </Backdrop>
  //       </Grid>
  //     </Grid>
  //   );
  // }
  // if (auth?.userProfileQuery?.data?.data?.hasInvestmentProfile) {
  //   return (
  //     <Container maxWidth="xl">
  //       <Grid container spacing={3} pt={20} justifyContent={"center"}>
  //         <Grid item md={12} xs={12}>
  //           <InvestmentProfileCompleted />
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   );
  // }
  console.log("auth" , auth)
  return (
    <Box>
      <Investments
        // statistics={investmentData.statistics}
        statistics={
          investmentStatistic?.data ? investmentStatistic?.data : false
        }
        chartData={investmentData.investedProjectsChart}
        // investedProjects={investmentData.investedProjects}
        //   investedProjects={investmentRelatedCompany?.data?.results}
      />
      <Box>
        {auth?.userProfileQuery?.isLoading && (
          <Grid container sx={{ minHeight: "100vh" }}>
            <Grid item>
              <Backdrop open>
                <CircularProgress />
              </Backdrop>
            </Grid>
          </Grid>
        )}
        { auth?.userProfileQuery?.data?.data?.hasInvestmentProfile ? (
          <Container maxWidth="xl">
            <Grid container spacing={3} pt={5} justifyContent={"center"}>
              <Grid item md={12} xs={12}>
                <InvestmentProfileCompleted />
              </Grid>
            </Grid>
          </Container>
        ) : 
        <Container maxWidth="xl">
            <Grid container spacing={3} pt={5} justifyContent={"center"}>
              <Grid item md={12} xs={12}>
                <InvestmentProfileInCompleted />
              </Grid>
            </Grid>
          </Container>
        }
      </Box>
    </Box>
  );
};
export default InvestorProfile;
