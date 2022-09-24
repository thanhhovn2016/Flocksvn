import { Box, Typography, Container } from "@mui/material";
import Head from "next/head";

import { useTranslation } from "../hooks";

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.page_not_found}
        </title>
        <meta name="description" content="Page not found" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box py={20}>
        <Container maxWidth="lg">
          <Typography color="primary.dark" variant="h4" textAlign="center">
            {t?.page_not_found_message}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default PageNotFound;
