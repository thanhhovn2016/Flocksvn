import { Box, Typography } from "@mui/material";

import { useMediaBreakpoints } from "../../hooks";

const ContactItem = ({ icon: Icon, text }) => {
  const { isMobile } = useMediaBreakpoints();

  return (
    <Box
      sx={{
        padding: 2,
        width: isMobile ? "100%" : "50%",
        ":hover": {
          backgroundColor: "#fff",
          borderRadius: 3,
        },
      }}
    >
      <Typography>
        <Box component="span" sx={{ marginRight: 5 }}>
          <Icon />
        </Box>
        {text}
      </Typography>
    </Box>
  );
};

export default ContactItem;
