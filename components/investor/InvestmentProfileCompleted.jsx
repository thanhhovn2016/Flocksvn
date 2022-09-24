import { useRouter } from "next/router";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../hooks";
import { CongratulationsIcon } from "../icons";

const InvestmentProfileCompleted = () => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleExploreProjects = () => {
    router.push("/projects");
  };
  return (
    <Grid container justifyContent="center" pb={11}>
      <Grid item md={6} xs={12}>
        <Paper>
          <Box py={5} textAlign="center">
            <CongratulationsIcon />
            <Typography
              variant={isMobile ? "h6" : "h4"}
              gutterBottom
              textAlign="center"
              color="primary.dark"
              py={1}
            >
              {t?.investor_profile_completed}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              mb={2}
              px={5}
              textAlign="center"
              color="secondary.dark"
            >
              {t?.investor_profile_success_message}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="contained" onClick={handleBackToHome}>
                {t?.back_to_home}
              </Button>
              <Button variant="outlined" onClick={handleExploreProjects}>
                {t?.explore_projects}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InvestmentProfileCompleted;
