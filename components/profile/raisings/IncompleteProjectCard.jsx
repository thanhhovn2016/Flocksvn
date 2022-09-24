import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../../hooks";

const IncompleteProjectCard = ({
  companyName,
  status,
  createdDate,
  onAddProjectClick,
}) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();

  return (
    <Card sx={{ px: 4, backgroundColor: "#f6ed99" }}>
      <CardContent>
        <Grid container>
          <Grid item md={9} xs={12}>
            <Box>
              <Typography fontWeight="bold" color="secondary.dark">
                {companyName} ({status})
              </Typography>
              <Typography color="secondary.dark" pr={1.5}>
                {status == "approved"
                  ? t.project_approved_message
                  : status === "pending"
                  ? t.project_pending_message
                  : status == "rejected"
                  ? t.project_rejected_message
                  : null}
              </Typography>
              <Box pt={3}>
                <Typography lineHeight={1} color="secondary.dark">
                  {t?.closing_date}
                </Typography>
                <Typography color="secondary.dark">{createdDate}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} xs={12} py={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={onAddProjectClick}
              sx={{
                backgroundColor: "primary.dark",
              }}
              disabled={status == "pending" || status == "rejected"}
            >
              {t?.add_project}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IncompleteProjectCard;
