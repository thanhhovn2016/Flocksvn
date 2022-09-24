import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Circle} from "@mui/icons-material"

import { useTranslation, useMediaBreakpoints } from "../hooks";

const HowItWorks = () => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();

  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.faq}
        </title>
        <meta
          name="description"
          content="Flocks AI Frequently Asked Questions"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box>
        <Box
          sx={{
            backgroundImage: isMobile ? "none" : "url(/images/event-bg.png)",
            backgroundColor: isMobile ? "#AECB00" : "transparent",
            backgroundSize: "cover",
            backgroundPosition: "100% 100%",
            backgroundRepeat: "no-repeat",
            minHeight: 400,
            textAlign: "center",
            pt: 10,
            borderRadius: isMobile ? "0px 0px 40px 40px" : "0px",
            display: "grid",
            // justifyItems:"center",
            alignItems: "center",
            // margin:"auto 0"
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            color="#fff"
            fontWeight="bold"
            // pt={10}
            // pb={3}
          >
            {/* {t?.frequently_asked_questions} */}
            {t?.how_it_works}
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Typography variant="h6" mt={10}></Typography>
          <Typography variant="h6" pt={2} display="inline">
            {t.on_flocks_ai}
          </Typography>
          <Typography variant="body1" pt={1} display="inline">
            {t.on_flocks_ai_p1}
          </Typography>

          {/* <Typography variant="h6" mt={10}></Typography>
          <Typography variant="h6" pt={2} display="inline">
            {t.on_flocks_ai}
          </Typography>
          <Typography variant="body1" pt={1} display="inline">
            {t.on_flocks_ai_p1}
          </Typography> */}
          <List>
            
            <ListItem alignItems="start" sx={{
                alignItems:"start",
              "& .css-cveggr-MuiListItemIcon-root":{
                paddingTop:"0.7rem",
                fontSize:"15px",
                minWidth: "40px",
                
              }
            }}>
            <ListItemIcon>
              <Circle fontSize="inherit" />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" >
            <Typography variant="h6" pt={2} display="inline">
            {t.pick_your_flock}
          </Typography>
          <Typography variant="body1" pt={1} display="inline">
            {t.pick_your_flock_p1}
          </Typography>
            </ListItemText>

            </ListItem>
            <ListItem alignItems="start" sx={{
                alignItems:"start",
              "& .css-cveggr-MuiListItemIcon-root":{
                paddingTop:"0.7rem",
                fontSize:"15px",
                minWidth: "40px",
                
              }
            }}>
            <ListItemIcon>
              <Circle fontSize="inherit" />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" >
            <Typography variant="h6" pt={2} display="inline">
            {t.promote_your_flock}
          </Typography>
          <Typography variant="body1" pt={1} display="inline">
            {t.promote_your_flock_p1}
          </Typography>
            </ListItemText>

            </ListItem>
            <ListItem alignItems="start" sx={{
                alignItems:"start",
                marginBottom:"3rem",
              "& .css-cveggr-MuiListItemIcon-root":{
                paddingTop:"0.7rem",
                fontSize:"15px",
                minWidth: "40px",
                
                
              }
            }}>
            <ListItemIcon>
              <Circle fontSize="inherit" />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" >
            <Typography variant="h6" pt={2} display="inline">
            {t.portfolio_your_flock}
          </Typography>
          <Typography variant="body1" pt={1} display="inline">
            {t.portfolio_your_flock_p1}
          </Typography>
            </ListItemText>

            </ListItem>
          </List>
        </Container>
      </Box>
    </>
  );
};

export default HowItWorks;
