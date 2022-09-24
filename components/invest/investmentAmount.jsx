// import React from 'react'
import {
  Grid,
  Typography,
  TextField,
  Icon,
  InputAdornment,
  Box,
  Button,
  Card,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import Dollar from "./icons/dollar";
import Logo from "./icons/logo";
// import StripeComponent from "./stripe";

import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { baseURL, dong } from "../../utils/constants";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRouter } from "next/router";

import TabsComponent from "./tabs";
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useTranslation } from "../../hooks";
import Styles from "../../styles/investmentAmount.module.css";
import axiosInstance from "../../services/axiosWithAuth";
import { useMutation, useQuery } from "react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Confirmed, Rejected, Pending, MomoIcon, Binance } from "../icons";
import Link from "next/link";
import { useTheme } from "@emotion/react";

// const stripePromise = loadStripe(
//   "pk_test_51L4KnuK1X9tURHXdnk32noSqMinvtZlzV8aSz49LQMVEz9HyyIgJpXu0VHZObgvnNls4PxYVtBFzJ8WQrf5N3cSl009jQgjbPc"
// );

const InvestmentAmount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const childFunc = React.useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stripToken, setStripeToken] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentOptionState, setPaymentOptionState] = useState("momo");
  const [loadingPage , setLoadingPage] = useState(false)
  const [amountInvestment, setAmountInvestment] = useState({
    amount: 10000,
  });
  const theme = useTheme()
  const [paymentState, setPaymentState] = useState(false);

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   //http://192.168.2.226:8000/api/v1/payment/created_payment_intent/
  //   // fetch(`${baseURL}payment/created_payment_intent/`, {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   // },{amount:})
  //   //   .then((res) => res.json())
  //   //   .then((data) => setClientSecret(data));
  //   getClientSecret();
  // }, [amountInvestment?.amount]);

  // const getClientSecret = async () => {
  //   const { data } = await axiosInstance.post(
  //     "payment/created_payment_intent/",
  //     { amount: amountInvestment?.amount }
  //   );
  //   setClientSecret(data);
  // };

  const getUserVerification = async () => {
    const { data } = await axiosInstance.get("verification/id/me/");
    return data;
  };
  const { isLoading, isError, data } = useQuery(
    "getUserVerification",
    getUserVerification
  );

  const handlePaymentFunction = async () => {
    // if (!stripToken?.token) {
    //   // return <Alert severity="info">token is not provided!</Alert>;
    // }
    setLoadingPage(true)
    try {
      const { data } = await axiosInstance.post(
        "investment/investment_participation/",
        {
          company: router?.query?.id,
          investmentAmount: amountInvestment?.amount,
          paymentOption: paymentOptionState,
          // token: token?.token,
          // token: "tok_1LAv4lK1X9tURHXdL4kilsx6"
        }
      );

      window.open(data?.payUrl);
      setLoadingPage(false)
    } catch (error) {
      console.log("error");
      setLoadingPage(false)
    }
    // setPaymentState(false)
    return data;
  };

  // const { mutate: updateSystemOption } = useMutation(handlePaymentFunction, {
  //   onSuccess: (values) => {
  //     const status = values?.data?.status;
  //     // queryClient.invalidateQueries("systemOption");
  //     // setGroupByState("")
  //     // setModalAddUser(!visibleModalAddUser);
  //     // setLoadingPage(false);
  //     // manageErrors(
  //     //   { code: "" },
  //     //   "success",
  //     //   "Update system setting is successfully."
  //     // );

  //     // setLoadingPage(false);
  //     if (status === 200) {
  //       // message.success(values?.data?.message);
  //       // history.push("/");
  //     } else {
  //       // manageServeErrors(values);
  //     }
  //   },
  //   onError: (error) => {
  //     setLoadingPage(false);
  //     manageErrors(error, "error");
  //   },
  // });
  // const passwordResetMutation = useMutation(handlePaymentFunction, {
  //   onSuccess: (data) => {
  //     setOpen(true);
  //   },
  // });

  // const alertUser = () => {
  //   passwordResetMutation.mutate();
  // };

  // React.useEffect(() => {
  //   childFunc.current = alertUser;
  // }, []);

  // const appearance = {
  //   theme: "stripe",
  //   locale: "USD",
  //   labels: "above",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  // const steps = ["Review", "Payment Method", "Start Investing"];

  // const previousStepsFunction = () => {
  //   setActiveStep(activeStep - 1);
  // };
  // const nextStepsFunction = () => {
  //   setActiveStep(activeStep + 1);
  //   // if (activeStep === 2){

  //   // }
  // };
  // const handleGetToken = (token) => {
  //   console.log("token", token);
  //   setStripeToken(token);
  //   console.log("token", token);
  //   // passwordResetMutation.mutate;
  //   updateSystemOption(token)
  //   // handlePaymentFunction();
  // };

  const [expanded, setExpanded] = React.useState("panel11");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // const handleClickPaymentFunction = async () => {
  //   const { } = await axiosInstance.post()
  // }
  const handleSelectPaymentOption = (event) => {
    const id = event?.target?.id;
    // console.log("event" , event)
    if (id) setPaymentOptionState(id);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={Styles.StepperContainer}
      >
        {steps.map((label) => (
          <Step key={label} className={Styles.stepContent}>
            <StepLabel className={Styles.stepLabel}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
      <Backdrop open={loadingPage}>
        <CircularProgress />
      </Backdrop>
      <Grid container spacing={2} margin={"2rem 0 "}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Image
            src={
              // "https://play.google.com/store/apps/details?id=com.ist.logomaker&hl=nl&gl=US"
              "https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
            }
            width={50}
            height={50}
            alt="logo"
          />
          <Typography variant={"h4"}>{t?.invest_in_merlino_agent}</Typography>
        </Grid>
      </Grid>
      <Accordion
        expanded={expanded === "panel11"}
        // onChange={handleChange("panel11")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          // expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant={"h6"}>{t?.verification}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: "3rem" }}>
          <Grid container spacing={2} marginTop={"0"}>
            {/* {data?.verificationStatus === "pre_pending" && (
              <Grid item xs={12}>
                <Typography variant={"h5"}>
                  {t?.personal_information}
                </Typography>
                {data?.verificationStatus === "pre_pending" && (
                  <Typography variant={"body1"}>
                    {t?.required_by_united_states}&nbsp;
                    <span style={{ color: "#AAC600", display: "inline-block" }}>
                      {t?.kept_secure}
                    </span>
                    {t?.It_will_never_be_used}
                  </Typography>
                )}
              </Grid>
            )} */}

            {data?.verificationStatus === "failed" && (
              <Grid
                container
                textAlign="center"
                sx={{ minHeight: "auto" }}
                py={5}
              >
                {/* <Grid item  xs={12}></Grid> */}
                <Grid item xs={10} margin="auto">
                  <Paper>
                    <Box py={5} px={3}>
                      <Rejected height={"5rem"} />
                      <Typography py={2} color="gray.main" variant="body1">
                        {t?.passport_verification_failed}
                      </Typography>
                      <Link href="/verification" passHref>
                        <Button variant="contained">{t?.retry}</Button>
                      </Link>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}

            {data?.verificationStatus === "done" && (
              <Grid
                container
                textAlign="center"
                sx={{ minHeight: "auto" }}
                py={5}
              >
                {/* <Grid item  xs={12}></Grid> */}
                <Grid item xs={10} margin="auto">
                  <Paper>
                    <Box py={5} px={3}>
                      <Confirmed />
                      <Typography py={2} color="gray.main" variant="body1">
                        {t?.passport_verified_success}
                      </Typography>
                      {/* <Link href="/challenges" passHref>
                  <Button variant="contained">{t?.continue}</Button>
                </Link> */}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
            {data?.verificationStatus === "pre_pending" && (
              <Grid
                container
                textAlign="center"
                sx={{ minHeight: "auto" }}
                py={5}
              >
                {/* <Grid item  xs={12}></Grid> */}
                <Grid item xs={10} margin="auto">
                  <Paper>
                    <Box py={5} px={3}>
                      {/* <Pending /> */}
                      <Typography py={2} color="gray.main" variant="body1">
                        {/* {t?.passport_verification_pen_pending} */}
                        {t?.please_verify_your_identity}
                      </Typography>
                      <Link href="/verification" passHref>
                        <Button variant="contained">{t?.verification}</Button>
                      </Link>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
            {/* {data?.verificationStatus !== "done" && (
              <Grid item xs={12}>
                {data?.verificationStatus === "pre_pending" && (
                  <Button
                    variant="contained"
                    margin="1rem 0"
                    padding="auto 2rem"
                    style={{
                      margin: "1rem 0",
                      paddingLeft: "3rem",
                      paddingRight: "3rem",
                    }}
                    size="large"
                    onClick={() => {
                      router.push({
                        pathname: "/verification",
                        query: { id: router.query?.id },
                      });
                    }}
                  >
                    {t?.verify_my_identity}
                  </Button>
                )}
              </Grid>
            )} */}
          </Grid>
          <Box
            display="grid"
            justifyContent={"space-between"}
            gridTemplateColumns={"auto auto"}
          >
            <Button variant="contained" disabled={expanded === "panel11"} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.previous}
            </Button>
            <Button
            sx={{
              color : theme?.palette?.primary?.dark
            }}
              variant="contained"
              disabled={data?.verificationStatus !== "done"}
              onClick={() => setExpanded("panel12")}
            >
              {t?.next}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel12"}
        // onChange={handleChange("panel12")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          // expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant={"h6"}>{t.payment_option}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: "3rem" }}>
          <Box display="flex">
            <Box
              sx={{
                border: `1px solid ${
                  paymentOptionState === "momo" ? "#37d614f0" : "#8080802e"
                } `,
                padding: "1rem",
                borderRadius: "3px",
                margin: "0.5rem",
                cursor: "pointer",
              }}
              id="momo"
              onClick={handleSelectPaymentOption}
            >
              <Image
                src={"/images/momoLogo.svg"}
                alt="MOMO"
                width={160}
                height={150}
                onClick={() => setPaymentOptionState("momo")}
              />
              {/* <MomoIcon width={"7rem"} style={{zIndex:0}} id="momo" onClick={handleSelectPaymentOptionMomo} */}
            </Box>
            <Box
              sx={{
                border: `1px solid ${
                  paymentOptionState === "binance" ? "#37d614f0" : "#8080802e"
                } `,
                padding: "1rem",
                borderRadius: "3px",
                margin: "0.5rem",
                cursor: "pointer",
              }}
              id="binance"
              onClick={handleSelectPaymentOption}
            >
              <Image
                src={"/images/binance.png"}
                alt="binance"
                width={180}
                height={150}
                style={{ cursor: "pointer" }}
                onClick={() => setPaymentOptionState("binance")}
              />
              {/* <Binance width={"7rem"} height={"7rem"}/> */}
            </Box>
          </Box>
          <Box
            display="grid"
            justifyContent={"space-between"}
            gridTemplateColumns={"auto auto"}
            marginTop="2rem"
          >
            <Button variant="contained" onClick={() => setExpanded("panel11")} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.previous}
            </Button>
            <Button variant="contained" onClick={() => setExpanded("panel1")} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.next}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        // onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          // expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6">{t?.investment_amount}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: "3rem" }}>
          <Grid container spacing={2} marginTop={"0"}>
            {/* <Grid
              item
              xs={12}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Image
                src={
                  // "https://play.google.com/store/apps/details?id=com.ist.logomaker&hl=nl&gl=US"
                  "https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
                }
                width={50}
                height={50}
                alt="logo"
              />
              <Typography variant={"h4"}>Invest in Merlino Agent</Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant={"h5"}>{t.Investment_amount}</Typography>
              <Typography variant={"body1"}>
                {t?.payments_are_processed_immediately}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <InputLabel style={{ fontFamily: "gilory-regular" }}>
                {" "}
                {t?.amount_to_invest}
              </InputLabel>
              <TextField
                type={"number"}
                variant="outlined"
                placeholder={t?.main_500}
                value={amountInvestment.amount}
                onChange={(event) => {
                  setAmountInvestment((prevState) => ({
                    ...prevState,
                    amount: event.target.value,
                  }));
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {paymentOptionState === "momo" ? (
                        <Box>{dong}</Box>
                      ) : (
                        <Dollar />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              {/* <InputLabel htmlFor="" style={{ marginTop: "1rem" }}>
                  {" "}
                  Amount To INvest
                </InputLabel>
                <TextField
                  type={"number"}
                  variant="outlined"
                  placeholder={t?.main_500}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Dollar />
                      </InputAdornment>
                    ),
                  }}
                /> */}
            </Grid>
          </Grid>
          <Box
            display="grid"
            justifyContent={"space-between"}
            gridTemplateColumns={"auto auto"}
            marginTop="2rem"
          >
            <Button variant="contained" onClick={() => setExpanded("panel12")} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.previous}
            </Button>
            <Button variant="contained" onClick={() => setExpanded("panel3")} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.next}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Start Investing</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: "3rem" }}>
          <Grid container spacing={2} marginTop="2rem">
            <Grid item xs={10} >
              <Typography variant="h5">{t?.payment_information}</Typography>
            </Grid>

            <Grid item xs={2} >
              <Typography variant="body1">{t?.promo_code}</Typography>
            </Grid>

            <Grid item xs={12}>
              <TabsComponent />

              <Elements stripe={stripePromise}>
                <StripeComponent
                  childFunc={childFunc}
                  getToken={handleGetToken}
                  paymentStatus= {paymentState}
                />
                
              </Elements>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>{" "} */}
      <Accordion
        expanded={expanded === "panel3"}
        // onChange={handleChange("panel3")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          // expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant={"h6"}>{t?.review}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: "2rem" }}>
          <Grid item xs={12}>
            <Typography variant="h6">{t?.terms}</Typography>
          </Grid>

          <Grid item xs={12}>
            {/* <Card style={{ padding: "2rem 1rem" }}> */}
            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_that_i_can_cancel}{" "}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                {t?.deal_deadline}
              </span>
              ).
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_that_Flocks_AI}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_I_will_not_have}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_I_may_never}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_that_investing}{" "}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                {t?.diversify}
              </span>
              {t?.my_risk}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_that_there}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_consent_to_electronic}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_my_investment}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                &nbsp; {t?.wont_be_transferable}&nbsp;
              </span>
              {t?.for_12_months}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_have_read_the}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                &nbsp;{t?.educational_materials}&nbsp;
              </span>
              {t?.and_agree_to_the}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                &nbsp;{t?.Terms_of_Service}
              </span>
              {t?.including_arbitration_provisions}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_this_investment}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                &nbsp; {t?.risky} &nbsp;
              </span>
              {t?.and_that_I_should}
            </Typography>

            <Typography
              variant={"body1"}
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              marginBottom={"1rem"}
            >
              {t?.I_understand_I_am_responsible}
            </Typography>

            <Typography
              variant={"body1"}
              // borderBottom="1px solid rgba(0, 0, 0, 0.1)"
              // marginBottom={"1rem"}
            >
              {t?.I_confirm_that_this}
              <span style={{ color: "#AAC600", display: "inline-block" }}>
                &nbsp; {t?.investment_limit}
              </span>
            </Typography>
            {/* </Card> */}
          </Grid>
          <Grid item xs={10}>
            <Box justifyContent={"center"} display="grid" margin={"1rem "}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={t?.I_have_read_and}
              />
            </Box>
          </Grid>
          <Grid item xs={12} style={{ display: "grid" }}>
            <Box marginTop={"3rem"}>
              <Button
                type="submit"
                // onClick={handleClickInvestFunction}
                // onClick={() => childFunc.current()}
                // onClick={() => setPaymentState(true)}
                id="submit"
                fullWidth={true}
                startIcon={<Logo />}
                variant="contained"
                onClick={handlePaymentFunction}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1rem auto",
                  justifyContent: "stretch",
                }}
                sx={{
                  color : theme?.palette?.primary?.dark
                }}
              >
                Confirm $1,000 investment{" "}
              </Button>
            </Box>
          </Grid>
          <Box
            display="grid"
            justifyContent={"space-between"}
            gridTemplateColumns={"auto auto"}
            marginTop="2rem"
          >
            <Button variant="contained" onClick={() => setExpanded("panel1")} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.previous}
            </Button>
            <Button variant="contained" disabled={expanded === "panel3"} sx={{
              color : theme?.palette?.primary?.dark
            }}>
              {t?.next}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={2} marginTop={"2rem"}>
        {/* {activeStep === 0 && (
          <Grid
            item
            xs={12}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <Image
              src={
                // "https://play.google.com/store/apps/details?id=com.ist.logomaker&hl=nl&gl=US"
                "https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
              }
              width={50}
              height={50}
              alt="logo"
            />
            <Typography variant={"h4"}>Invest in Merlino Agent</Typography>
          </Grid>
        )} */}
        {/* {activeStep === 0 && (
          <Grid item xs={12}>
            <Typography variant={"h5"}>{t.Investment_amount}</Typography>
            <Typography variant={"body1"}>
              {t?.payments_are_processed_immediately}
            </Typography>
          </Grid>
        )} */}
        {/* {activeStep === 0 && data?.verificationStatus === "done" && (
          <Grid item xs={12}>
            <InputLabel> Amount To Invest</InputLabel>
            <TextField
              type={"number"}
              variant="outlined"
              placeholder={t?.main_500}
              value={amountInvestment.amount}
              onChange={(event) => {
                setAmountInvestment((prevState) => ({
                  ...prevState,
                  amount: event.target.value,
                }));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Dollar />
                  </InputAdornment>
                ),
              }}
            />
           
          </Grid>
        )} */}
        {/* <Grid item xs={12}>
        <hr style={{ borderColor: "#80808030", margin: "2.5rem 0" }} />
      </Grid> */}

        {/* <Grid item xs={12}>
        <hr style={{ borderColor: "#80808030", margin: "2.5rem 0" }} />
      </Grid> */}

        {/* <Grid item xs={12}>
        <hr style={{ borderColor: "#80808030", margin: "2.5rem 0" }} />
      </Grid> */}

        {/* <Grid item xs={10} marginTop={"2rem"}>
          <Button
            variant="contained"
            disabled={activeStep < 1}
            onClick={previousStepsFunction}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={2} marginTop={"2rem"}>
          <Button
            variant="contained"
            disabled={activeStep === steps?.length - 1}
            onClick={nextStepsFunction}
          >
            Next
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default InvestmentAmount;
