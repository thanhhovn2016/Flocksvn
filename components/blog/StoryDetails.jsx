import Image from "next/image";
import { Box, Avatar, Typography, Container } from "@mui/material";

import { useMediaBreakpoints } from "../../hooks";
import { mediaBaseURL } from "../../utils/constants";
import { renderRawHTML, formatedDate } from "../../utils/functions";

const StoryDetails = ({ story }) => {
  const { isMobile } = useMediaBreakpoints();
  console.log(story);
  return (
    <Container maxWidth="md">
      <Box pt={15} pb={5}>
        <Typography color="primary.dark" variant="h5">
          {story?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }} my={2}>
          <Avatar src={`${mediaBaseURL}${story?.author?.avatar?.url}`} />
          <Typography color="secondary.dark" px={2}>
            {story?.author?.fullName} | {formatedDate(story?.createdAt)}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: isMobile ? 200 : 400,
            position: "relative",
            borderRadius: "30px",
          }}
        >
          <Image
            src={`${mediaBaseURL}${story?.headerImage?.url}`}
            layout="fill"
            objectFit="cover"
            alt="cover photo"
            style={{
              borderRadius: "10px",
            }}
          />
        </Box>
        <Typography color="secondary.dark" py={5}>
          {renderRawHTML(story?.content)}
        </Typography>
      </Box>
    </Container>
  );
};

export default StoryDetails;
