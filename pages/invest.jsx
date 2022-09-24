import {
  Container,
  Grid,
  Backdrop,
  CircularProgress,
  Box,
  Button,
  Typography,
} from "@mui/material";
import Head from "next/head";
import InvestmentAmount from "../components/invest/investmentAmount";
import Logo from "../components/invest/icons/logo";
import { useTranslation, useAuth } from "../hooks";
import { FileDownload, Summarize } from "@mui/icons-material";
import SuccessPayment from "../components/invest/successPayment";
import ErrorPayment from "../components/invest/errorPayment";
import React, { useRef } from "react";


const Invest = () => {
  const { t } = useTranslation();
  // const auth = useAuth();
  const childFunc = React.useRef(null)

  const handleClickInvestFunction = () => {
    childRef.current.getAlert()
  }
  return (
    <Container maxWidth="xl">
      <Head>
        <title>
          {t?.title} | {t?.investor}
        </title>
        <meta
          name="description"
          content="Flocks AI investor profile creation"
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid container spacing={10} py={5} pt={15} justifyContent={"start"}>
        <Grid item xs={12} md={12}>
          <InvestmentAmount childFunc={childFunc}/>
        </Grid>
        {/* <Grid item xs={12} md={4} padding="2rem">
          {" "}
          <Typography variant="h6">Document </Typography>
          <Box display="grid" gridTemplateColumns={"2rem auto 1rem"} alignItems="center"  margin={"1rem"}>
            <Summarize  />
            <Box>
            Crowdfunding.pdf
            </Box>
            <a href={"#"} __download><FileDownload color={"primary"} /></a>
          </Box>
          <Box display="grid" gridTemplateColumns={"2rem auto 1rem"} alignItems="center"  margin={"1rem"}>
            <Summarize  />
            <Box>
            Merlino Agent document.docx
            </Box>
            <a href={"#"} __download><FileDownload color={"primary"} /></a>
          </Box>
          <Box display="grid" gridTemplateColumns={"2rem auto 1rem"} alignItems="center"  margin={"1rem"}>
            <Summarize  />
            <Box>
            Merlino Agent form.pptx
            </Box>
            <a href={"#"} __download><FileDownload color={"primary"} /></a>
          </Box>
        </Grid> */}
        {/* <Grid item xs={12} md={8} style={{display:"grid"}}>
          <Box marginTop={"3rem"}>
            <Button
            type="submit"
            // onClick={handleClickInvestFunction}
            onClick={() => childFunc.current()}
            id="submit"
              fullWidth={true}
              startIcon={<Logo />}
              variant="contained"
              style={{
                display: "grid",
                gridTemplateColumns: "1rem auto",
                justifyContent: "stretch",
              }}
            >
              Confirm $1,000 investment{" "}
            </Button>
          </Box>
        </Grid> */}
        {/* <Grid item md={6} xs={12}>
          {activeStep === 0 ? (
            <Review onReviewComplete={handleReviewComplete} />
          ) : activeStep === 1 ? (
            <InvestorProfile
              questions={props.questions}
              onInvestorProfileComplete={handleInvestorProfileComplete}
            />
          ) : activeStep === 2 ? (
            <InvestmentProfileCompleted />
          ) : null}
        </Grid> */}
      </Grid>
      {/* <Grid container justifyContent={"center"} >
        <Grid item> 
        <SuccessPayment />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} >
        <Grid item> 
        <ErrorPayment />
        </Grid>
      </Grid> */}
    </Container>
  );
};
export default Invest;
