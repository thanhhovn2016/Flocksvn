import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

import { useTranslation, useAppTheme, useMediaBreakpoints } from "../hooks";
import {
  CallIcon,
  SmsIcon,
  LocationIcon,
  FacebookRoundIcon,
  InstagramRoundIcon,
  LinkedInRoundIcon,
  TelegrameRoundIcon,
  WhatsappRoundIcon,
} from "../components/icons";
import { ContactItem, ContactForm } from "../components/contact";

const Contact = () => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const theme = useAppTheme();
  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.contact}
        </title>
        <meta name="description" content="Flocks AI contact" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box paddingTop={"1rem"}>
        <Box mt={5} py={5}>
          <Container maxWidth="lg">
            <Grid container spacing={3} py={5}>
              <Grid item md={6} xs={12}>
                <Typography variant="h3" color="primary.dark" gutterBottom>
                  {t.get_a_queue}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {t.fill_contact_form_message}
                </Typography>
                <List>
                  <ListItem>
                    <ContactItem icon={CallIcon} text={t.phone_contact} />
                  </ListItem>
                  <ListItem>
                    <ContactItem icon={SmsIcon} text={t.email_contact} />
                  </ListItem>
                  <ListItem>
                    <ContactItem icon={LocationIcon} text={t.address_contact} />
                  </ListItem>
                </List>
                <Box
                  sx={{
                    display: "flex",
                    px: 3,
                    justifyContent: "space-between",
                    width: isMobile ? "80%" : "50%",
                  }}
                >
                  <FacebookRoundIcon />
                  <InstagramRoundIcon />
                  <LinkedInRoundIcon />
                  <TelegrameRoundIcon />
                  <WhatsappRoundIcon />
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <ContactForm />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
