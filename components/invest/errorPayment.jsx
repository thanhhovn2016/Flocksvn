import { Box, Button, Card, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "../../hooks";
import ErrorIcon from "./icons/error";

const ErrorPayment = () => {
  const {t} = useTranslation
  return (
    <Card
      style={{
        minWidth: "75vw",
        padding: "5rem 3rem",
        display: "grid",
        justifyContent: "center",
      }}
    >
      <ErrorIcon style={{ display: "grid", justifySelf: "center" }} />
      <Typography
        variant={"h5"}
        color="#D84557"
        justifySelf={"center"}
        marginTop="2.5rem"
      >
        {t?.Your_payment_failed}
      </Typography>
      <Typography variant="body1">
        {t?.Your_investment_in}{" "}
        <p style={{ color: "#AAC600", display: "inline-block" }}>
          Merlino Agent{" "}
        </p>{" "}
        {t?.was_failed}
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={"auto auto"}
        justifyContent={"space-between"}
        margin="2rem 0"
      >
        <Box>{t?.Payment_ID}</Box>
        <Box>MJ6580JH12SA890BV500</Box>
        <Box>{t?.Time}</Box>
        <Box>May 30, 2022 15:30 pm</Box>
      </Box>
      <Box>
        <Typography variant="h5" marginBottom={"1rem"}> {t?.Why_did_it_fail}</Typography>
        <Box>1 : The CVV or Expiry date might be wrong.</Box>
        <Box> 2 : Your bank network might be down.</Box>
      </Box>
      <Box justifySelf={"center"} marginTop="2rem">
        <Button
          variant="contained"
          style={{ paddingRight: "3rem ", paddingLeft: "3rem" }}
        >
         <Link href="/">{t?.back_to_home}</Link>
        </Button>
      </Box>
    </Card>
  );
};
export default ErrorPayment;
