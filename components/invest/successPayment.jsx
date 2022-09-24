import { Box, Button, Card, Typography } from "@mui/material";
import Link from "next/link";
import SuccessIcon from "./icons/success";
import useTranslation from "../../hooks/useTranslation"

const SuccessPayment = () => {
    const {t} = useTranslation()
  return (
    <Card
      style={{
        minWidth: "75vw",
        padding: "5rem 3rem",
        display: "grid",
        justifyContent: "center",
      }}
    >
      <SuccessIcon style={{ display: "grid", justifySelf: "center" }} />
      <Typography
        variant={"h5"}
        color="primary"
        justifySelf={"center"}
        marginTop="2.5rem"
      >
        {t?.Your_payment_was_successful}
      </Typography>
      <Typography variant="body1">
        {t?.Your_investment_in}{" "}
        <p style={{ color: "#AAC600", display: "inline-block" }}>
          Merlino Agent{" "}
        </p>{" "}
        {t?.was_successful}
      </Typography>

      <Box justifySelf={"center"} marginTop="2rem">
        <Button
          variant="contained"
          style={{ paddingRight: "3rem ", paddingLeft: "3rem" }}
        >
          {t?.Head_to_profile}
        </Button>
      </Box>
      <Box justifySelf={"center"} marginTop="2rem">
        <Link href="/">{t?.Back_to_home}</Link>
      </Box>
    </Card>
  );
};
export default SuccessPayment;
