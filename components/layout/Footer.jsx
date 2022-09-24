import Image from "next/image";
import Link from "next/link";

import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
} from "@mui/material";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  SkypeIcon,
} from "../icons";
import styles from "../../styles/Footer.module.css";
import { useTranslation } from "../../hooks";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box className={styles.footer}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={3} xs={12} className={styles.grid_item}>
            <Box>
              <Image
                src="/images/logo.png"
                alt="flocks AI logo"
                width={61}
                height={80}
              />
            </Box>
            <Box>
              <Typography
                variant="h5"
                className={styles.footer_heading}
                sx={{ marginTop: 2 }}
              >
                {t.flocks_ai_slogan}
              </Typography>
            </Box>
            <Box
              className={styles.social_container}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <a href="#" className={styles.social_item}>
                <FacebookIcon />
              </a>
              <a href="#" className={styles.social_item}>
                <InstagramIcon />
              </a>
              <a href="#" className={styles.social_item}>
                <LinkedInIcon />
              </a>
              <a href="#" className={styles.social_item}>
                <TwitterIcon />
              </a>
              <a href="#" className={styles.social_item}>
                <SkypeIcon />
              </a>
            </Box>
            <Box></Box>
          </Grid>
          <Grid item md={3} xs={12} className={styles.grid_item}>
            <List sx={{
              fontFamily:"gilory-semibold"
            }}>
              <ListItem>
                <Typography variant="h5" className={styles.footer_heading}>
                  {t.for_investors}
                </Typography>
              </ListItem>
              <ListItem>
                <Link href="/why-invest">{t.why_invest}</Link>
              </ListItem>
              <ListItem>
                <Link href="/how-it-works">{t.how_it_works}</Link>
              </ListItem>
              {/* <ListItem>
                <Link href="#">{t.risks}</Link>
              </ListItem> */}
              <ListItem>
                <Link href="/privacy-policy">{t.privacy_policy}</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12} className={styles.grid_item}>
            <List sx={{
              fontFamily:"gilory-semibold"
            }}>
              <ListItem>
                <Typography variant="h5" className={styles.footer_heading}>
                  {t.for_fundraisers}
                </Typography>
              </ListItem>
              <ListItem>
                <Link href="/why-raise">{t.why_raise}</Link>
              </ListItem>
              {/* <ListItem>
                <Link href="#">{t.learn}</Link>
              </ListItem> */}
              <ListItem>
                <Link href="/faq">{t.faq}</Link>
              </ListItem>
              {/* <ListItem>
                <Link href="#">{t.instruments}</Link>
              </ListItem> */}
            </List>
          </Grid>
          <Grid item md={3} xs={12} className={styles.grid_item}>
            <List sx={{
              fontFamily:"gilory-semibold"
            }}>
              <ListItem>
                <Typography variant="h5" className={styles.footer_heading}>
                  {t.useful_links}
                </Typography>
              </ListItem>
              <ListItem>
                <Link href="/about">{t.about}</Link>
              </ListItem>
              <ListItem>
                <Link href="/contact">{t.contact}</Link>
              </ListItem>
              <ListItem>
                <Link href="/blog">{t.blog}</Link>
              </ListItem>
              <ListItem>
                <Link href="/events">{t.events}</Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
