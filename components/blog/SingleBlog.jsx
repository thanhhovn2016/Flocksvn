import Link from "next/link";
import {
  Box,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { formatedDate } from "../../utils/functions";

const SingleBlog = ({
  coverPhoto,
  slug,
  title,
  description,
  authorName,
  authorImg,
  date,
  charsToDisplay = 10,
}) => {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <Card
        sx={{
          cursor: "pointer",
          minHeight: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height={170}
          image={coverPhoto}
          sx={{
            p: 2,
            borderRadius: 5,
          }}
        />
        <CardContent sx={{ px: 2 }}>
          <Typography fontSize={18} fontWeight="bold" color="secondary.dark" paddingTop={0}>
            {title}
          </Typography>
          <Typography color="secondary.dark">
            {description.substr(0, charsToDisplay)}
            {description.length >= charsToDisplay && "..."}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Avatar src={authorImg} />
            <Typography ml={1} color="secondary.dark">
              {authorName}
            </Typography>
          </Box>
          <Typography color="secondary.dark">{formatedDate(date)}</Typography>
        </CardActions>
      </Card>
    </Link>
  );
};

export default SingleBlog;
