import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CreditCard from "@mui/icons-material/CreditCard";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        variant="standard"
      >
        <Tab icon={<CreditCard />} label="Card" iconPosition="start" />

        <Tab icon={<HomeOutlined />} iconPosition="start" label="U.S. Bank" />
        <Tab icon={<LanguageOutlined />} iconPosition="start" label="Wire" />
      </Tabs>
      {value === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body2" marginTop={"2rem"}>
              {" "}
              Your credit or debit card will be charged immediately.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Card
              style={{
                minWidth: "100%",
                background: "#AAC600",
                padding: "1rem",
                // margin: "1rem 0",
                color: "#FFF",
              }}
            >
              <CreditCardOutlined color="inherit" />
              <Box color="#FFF">Cart</Box>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              style={{
                minWidth: "100%",
                background: "#CFCFCF",
                padding: "1rem",
                // margin: "1rem 0",
                color: "#FFF",
              }}
            >
              <CreditCardOutlined color="inherit" />
              <Box color="#FFF">Apple pay</Box>
            </Card>
          </Grid>
          <Grid item xs={"auto"}>
            <Card
              style={{
                minWidth: "100%",
                background: "#CFCFCF",
                padding: "1.2rem 1rem",
                // margin: "1rem 0",
                color: "#FFF",
              }}
            >
              <div>
                {/* <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}

                <IconButton aria-label="More" onClick={handleClick}>
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  // TransitionComponent={Fade}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </Card>
          </Grid>
          <Grid item xs={10}>
              <InputLabel >Card Number </InputLabel>
              <TextField placeholder="1234-1234-1234-1234" />
          </Grid>
          <Grid item xs={5}>
          <InputLabel >Expiration Date </InputLabel>
              <TextField placeholder="MM/YY"/>
          </Grid>
          <Grid item xs={5}>
          <InputLabel >Security Code </InputLabel>
              <TextField placeholder="CVV"/>
          </Grid>
          <Grid item xs={5}>
          <InputLabel >Country</InputLabel>
              <TextField placeholder="United States"/>
          </Grid>
          <Grid item xs={5}>
          <InputLabel >Postal Code </InputLabel>
              <TextField placeholder="123456"/>
          </Grid>
          <Grid item xs={12}>
              <Typography variant="body2">Flocks does not process nor save your credit card information.</Typography>
          </Grid>
        </Grid>
      )}
      {value === 1 && <Grid container spacing={2} alignItems="center" marginTop={'2rem'}>
          <Grid item xs={"auto"}>
              <Button variant="contained" style={{paddingLeft:"2rem" , paddingRight:"2rem"}}> Select bank account</Button>
          </Grid>
          <Grid item xs={"auto"}>Or</Grid>
          <Grid item xs={"auto"}>
              <Button variant="outlined" style={{paddingLeft:"2rem" , paddingRight:"2rem"}}>Select bank account</Button>
          </Grid>
          </Grid>}
    </>
  );
}
