import { Box } from "@mui/material";

import { useAppTheme } from "../../hooks";

const VerticalDivider = () => {
  const theme = useAppTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: 5,
          border: `5px solid ${theme.palette.primary.dark}`,
          borderRadius: "50%",
          my: 0.5,
        }}
      ></Box>
      <Box
        sx={{
          height: 200,
          borderLeft: `3px dotted ${theme.palette.primary.main}`,
        }}
      ></Box>
      <Box
        sx={{
          height: 5,
          border: `5px solid ${theme.palette.primary.dark}`,
          borderRadius: "50%",
          my: 0.5,
        }}
      ></Box>
    </Box>
  );
};

export default VerticalDivider;
