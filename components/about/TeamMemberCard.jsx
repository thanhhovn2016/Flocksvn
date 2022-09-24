import Image from "next/image";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Typography,
  Link,
} from "@mui/material";

import { WhatsAppCircle, TwitterCircle, LinkedInCircle } from "../icons";
import { mediaBaseURL } from "../../utils/constants";

const TeamMemberCard = ({
  name,
  position,
  imgSrc,
  facebook,
  twitter,
  linkedIn,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        textAlign: "center",
        borderRadius: "20px",
        px: 5,
        pb: 2,
        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.08)",
      }}
    >
      <img
        src={`${imgSrc}`}
        width={90}
        height={90}
        alt="profile"
        style={{
          position: "relative",
          top: "-40px",
          outline: "8px solid #fff",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          marginTop: -5,
        }}
      >
        <Typography variant="h6" color="secondary.dark" fontWeight="bold" marginTop="38px">
          {name}
        </Typography>
        <Typography color="secondary.dark" fontSize={"0.8rem"}>{position}</Typography>
      </Box>
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          px: 4,
        }}
      >
        <Link href={"#"}>
          <LinkedInCircle />
        </Link>
        <Link href={"#"}>
          <WhatsAppCircle />
        </Link>
        <Link href={"#"}>
          <TwitterCircle />
        </Link>
      </Box>
    </Box>
  );
};

export default TeamMemberCard;
