import Link from "next/link";
import {
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Lottie from "react-lottie";

import { Verified } from "../../lotties";
import { useMediaBreakpoints, useTranslation } from "../../hooks";

const defaultOption = {
  autoPlay: true,
  loop: true,
  animationData: Verified,
};
const VerifySuccessMessageBox = ({ loading }) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();
  return (
    <Box>
      <Grid container justifyContent="center" py={isMobile ? 15 : 10}>
        <Grid item md={6} xs={12} p={5} mt={5}>
          {loading ? (
            <Backdrop open={true}>
              <CircularProgress />
            </Backdrop>
          ) : (
            <Paper>
              <Lottie options={defaultOption} height={200} width={200} />
              <Typography
                variant="h5"
                color="secondary.dark"
                gutterBottom
                px={5}
                textAlign="center"
              >
                {t?.email_verified}
              </Typography>
              <Typography
                color="secondary.dark"
                gutterBottom
                px={5}
                textAlign="center"
              >
                {t?.email_comfirmation_thank_you}
              </Typography>
              <Box py={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Link href="/sign-in" passHref>
                  <Button color="primary" size="large" variant="contained">
                    {t?.continue_to_login}
                  </Button>
                </Link>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VerifySuccessMessageBox;
