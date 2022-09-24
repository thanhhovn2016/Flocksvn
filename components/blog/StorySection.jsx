import { Box, Grid, Typography } from "@mui/material";

import { StoryBlog } from ".";
import { useTranslation } from "../../hooks";
import { mediaBaseURL } from "../../utils/constants";

const StorySection = ({ sectionTitle, stories }) => {
  const { t } = useTranslation();

  return (
    <Box my={5}>
      <Typography variant="h4" color="primary.dark" fontWeight="bold" my={2}>
        {sectionTitle}
      </Typography>
      <Grid container spacing={3}>
        {stories.map((story) => (
          <Grid key={story?.id} item md={6} xs={12}>
            <StoryBlog
              slug={story?.slug}
              bgPhoto={`${mediaBaseURL}${story?.headerImage?.url}`}
              title={story?.title}
              authorName={story?.author?.fullName}
              authorImg={`${mediaBaseURL}${story?.author?.avatar?.url}`}
              date={story?.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StorySection;
