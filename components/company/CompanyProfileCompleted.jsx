import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../hooks";
import { CongratulationsIcon } from "../icons";

const CompanyProfileCompleted = ({ onAddProjectClick }) => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const router = useRouter();

  const handleSkip = () => {
    router.push("/profile");
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
              fontWeight="bold"
              py={1}
            >
              {t?.congratulations}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              mb={2}
              px={4}
              textAlign="center"
              color="secondary.dark"
            >
              {t?.company_profile_created}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                onClick={onAddProjectClick}
                sx={{ px: 4 }}
                variant="contained"
              >
                {t?.add_project}
              </Button>
              <Button onClick={handleSkip} variant="outlined">
                {t?.skip}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CompanyProfileCompleted;
