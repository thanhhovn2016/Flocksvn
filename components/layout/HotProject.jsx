import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Grid, Container, Typography, Button } from "@mui/material";

import { RemoveIcon } from "../icons";
import { useTranslation } from "../../hooks";

const HotProject = ({
  icon,
  title,
  timePeriod,
  projectLogo,
  projectName,
  projectId,
  onClose,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleViewProject = () => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <Box
      sx={{
      //    backgroundColor: "#F8F8F8", 
      // border: "1px solid orange"
      backgroundColor:"#F5F5F5"
     }}
      py={0.8}
      mb={1}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            color: "secondary.dark",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {icon}
            <Typography pl={2}>{title}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box component="span" fontWeight="bold" mr={1}>
              {timePeriod}
            </Box>
            <Box component="span">{t?.left_to_invest}</Box>
            <Box component="span" px={1}>
              <Image
                alt="company logo logo"
                width={35}
                height={35}
                src={projectLogo}
              />
            </Box>
            <Box component="span">{projectName}</Box>
            <Typography></Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button onClick={handleViewProject} variant="outlined" sx={{border:"1px solid #00000054"}}>
              {t?.view_project}
            </Button>
            <Box ml={1}>
              <RemoveIcon onClick={onClose} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HotProject;
