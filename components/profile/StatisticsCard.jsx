import { Card, CardContent, Typography } from "@mui/material";

const StatisticsCard = ({ value, label }) => {
  return (
    <Card sx={{borderRadius:"4px"}}>
      <CardContent>
        <Typography variant="h4" color="primary.dark" textAlign="center">
          {value}
        </Typography>
        <Typography color="secondary.dark" textAlign="center">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
