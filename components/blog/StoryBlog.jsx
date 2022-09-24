import Link from "next/link";
import {
  Box,
  Avatar,
  Card,
  CardActions,
  Typography,
  CardContent,
} from "@mui/material";

import { formatedDate } from "../../utils/functions";

const StoryBlog = ({ bgPhoto, slug, title, authorName, authorImg, date }) => {
  return (
    <Link href={`/blog/stories/${slug}`} passHref>
      <Card style={{background:"linear-gradient(to left top, #aac600, #aac60066 )"}}>
        <Box
          sx={{
            backgroundColor:"gray",
            cursor: "pointer",
            backgroundImage: `url(${bgPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 300,
            position:"relative",
            transition: "transform 2s, opacity 2s",
            ":hover": {
              transform: "scale(1.05)",
              opacity: 0.5,
            },
          }}
        >
          <CardContent sx={{ px: 2, py: 0  , position:'absolute' , bottom:"4.5rem"}}>
            <Typography color="#fff" variant="h6" fontWeight="bold" >
              {title}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              px: 2,
              position:"absolute",
              bottom:"1rem"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                mr: 1,
                pr: 1,
              }}
            >
              <Avatar src={authorImg} />
              <Typography ml={1} color="#fff">
                {authorName}
              </Typography>
            </Box>
            <Typography color="#fff" px={1}>
              |
            </Typography>
            <Typography color="#fff">{formatedDate(date)}</Typography>
          </CardActions>
        </Box>
      </Card>
    </Link>
  );
};

export default StoryBlog;
