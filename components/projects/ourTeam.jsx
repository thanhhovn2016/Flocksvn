import { FacebookOutlined, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { mediaBaseURL } from "../../utils/constants";
import Link from "next/link";

const useStyle = makeStyles((theme) => ({
  imageProject: {
    width: "6rem",
    height: "6rem",
    borderRadius: "50%",
  },
}));
const OurTeam = (props) => {
  const classes = useStyle();
  return (
    <Box
      maxWidth={"18rem"}
      margin="1rem auto"
      display="grid"
      alignItems={"center"}
      justifyItems="center"
    >
      <img
        className={classes.imageProject}
        src={`${mediaBaseURL + props?.person?.image.url}`}
        srcSet={`${mediaBaseURL + props?.person?.image.url}`}
        alt={"image Header"}
        loading="lazy"
      />
      <Typography variant="h5" marginTop="0.5rem">
        {props?.person?.name}
      </Typography>
      <Typography variant="body2">{props?.person?.position}</Typography>
      <Typography variant="body1" textAlign={"center"} marginTop="1rem">
        {props?.person?.about?.length > 110 ? props?.person.about.slice(0,110) + "..." : props?.person?.about}
      </Typography>
      <Box display="flex" gap="2rem" margin="1rem">
        {/* <FacebookOutlined /> */}
        {props?.person?.linkedin && (
          <Link href={props?.person?.linkedin}>
            <LinkedIn />
          </Link>
        )}
        {/* <Twitter /> */}
      </Box>
    </Box>
  );
};

export default OurTeam;
