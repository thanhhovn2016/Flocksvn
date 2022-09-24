import { useRouter } from "next/router";
import { Box, Grid, Typography, Button } from "@mui/material";

import { SingleBlog } from ".";
import { LoadMoreIcon } from "../icons";
import { useTranslation } from "../../hooks";
import { mediaBaseURL } from "../../utils/constants";

const BlogSection = ({
  sectionTitle = "",
  blogs,
  categoryId,
  renderedIn = "list-page",
  charsToDisplay = 175,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box my={5}>
      <Typography
        variant="h4"
        textAlign={renderedIn === "details-page" ? "center" : "left"}
        color="primary.dark"
        fontWeight="bold"
        my={2}
      >
        {sectionTitle}
      </Typography>
      <Grid container spacing={2}>
        {blogs?.map((blog) => (
          <Grid key={blog?.slug} item md={4} xs={12}>
            <SingleBlog
              coverPhoto={`${mediaBaseURL}${blog?.headerImage?.url}`}
              title={blog?.title}
              slug={blog?.slug}
              description={blog?.excerpt}
              authorName={blog?.author?.fullName}
              authorImg={`${mediaBaseURL}${blog?.author?.avatar?.url}`}
              date={blog?.createdAt}
              charsToDisplay={charsToDisplay}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {renderedIn === "list-page" && categoryId && (
          <Button
            onClick={() => router.push(`blog/category/${categoryId}/posts`)}
            sx={{
              color: "secondary.dark",
              fontWeight: "bold",
              ":hover": {
                background: "transparent",
              },
            }}
          >
            {t?.more_posts} <LoadMoreIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BlogSection;
