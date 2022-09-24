import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Avatar, Typography, Container } from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../hooks";
import { BlogSection } from ".";
import { mediaBaseURL } from "../../utils/constants";
import { renderRawHTML, formatedDate } from "../../utils/functions";

const BlogDetails = ({ blog, relatedBlogs }) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box pt={15} pb={5}>
        <Typography color="primary.dark" variant="h5" fontWeight={600}>
          {blog?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }} my={2}>
          <Avatar src={`${mediaBaseURL}${blog?.author?.avatar?.url}`} />
          <Typography color="secondary.dark" px={2}>
            {blog?.author?.fullName} | {formatedDate(blog?.createdAt)}
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
            src={`${mediaBaseURL}${blog?.headerImage?.url}`}
            layout="fill"
            objectFit="cover"
            alt="cover photo"
            style={{
              borderRadius: "10px",
            }}
          />
        </Box>
        <Typography color="secondary.dark" py={5}>
          {renderRawHTML(blog?.content)}
        </Typography>
        <BlogSection
          renderedIn="details-page"
          sectionTitle={t?.related_posts}
          blogs={relatedBlogs}
          charsToDisplay={50}
        />
      </Box>
    </Container>
  );
};

export default BlogDetails;
