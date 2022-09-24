import { Box, Typography } from "@mui/material";

const EventMetaItem = ({ icon: Icon, label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        py: 1,
      }}
    >
      <Icon />
      <Box pl={2}>
        <Typography color="primary.dark" lineHeight={1.5} fontSize={12}>
          {label}
        </Typography>
        <Typography color="primary.dark" lineHeight={1.5} fontSize={12}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default EventMetaItem;
