import { Box, Card, CardContent, Icon, Typography } from "@mui/material";

const FaqCategoryItem = ({ icon: Icon, text }) => {
  return (
    <Card>
      <CardContent>
        <Box textAlign="center">
          <Icon />
          <Typography color="secondary.dark" pt={2} fontWeight="bold">
            {text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FaqCategoryItem;
