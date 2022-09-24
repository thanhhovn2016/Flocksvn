import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {
  Container,
  Box,
  Grid,
  Typography,
  Avatar,
  Card,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

import {
  useAuth,
  useMediaBreakpoints,
  useTranslation,
  useAppTheme,
} from "../../hooks";
// import { CreateStartUp, StartInvesting } from "../../lotties";
import { Investments, Raisings } from "../../components/profile";
import { EditIcon } from "../../components/icons";
import { mediaBaseURL, apiRoutes } from "../../utils/constants";
import investmentData from "../../data/investments.json";
import raisingData from "../../data/raisings.json";
import axiosInstance from "../../services/axiosWithAuth";
import { useQuery } from "react-query";
import TablePagination from '@mui/material/TablePagination';
// import { apiRoutes } from '../../utils/constants/'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`faq-tabpanel-${index}`}
      aria-labelledby={`faq-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isMobile, isLargeDesktop } = useMediaBreakpoints();
  const theme = useAppTheme();
  const [value, setValue] = React.useState(0);

  const [investmentDataState, setInvestmentDataState] = useState({
    investedProjects: [],
    count: 0,
    nextPage: 1,
    prevPage: 2,
  });

  const [InvestmentPage, setInvestmentPage] = React.useState(1);
  const [InvestmentRowsPerPage, setInvestmentRowsPerPage] = React.useState(10);

  const handleChangePageInvestment = (event, newPage) => {
    setInvestmentPage(newPage);
  };

  const handleChangeRowsPerPageInvestment = (event) => {
    setInvestmentRowsPerPage(parseInt(event.target.value, 10));
    setInvestmentPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getInvestmentRelatedCompany = async () => {
    const { data } = await axiosInstance.get(
      apiRoutes.investmentRelatedCompany 
      +
        `?page=${InvestmentPage}&page_size=${InvestmentRowsPerPage}`
    );
    console.log("data", data);

    return data;
  };
  const investmentRelatedCompany = useQuery(
    "getINvestmentRelatedCompany",
    getInvestmentRelatedCompany
  );
  // console.log("investmentRelatedCompany", investmentRelatedCompany);

  const getInvestmentStatistic = async () => {
    const {data} = await axiosInstance.get(apiRoutes.investmentStatistic)
    return data
  }
  const investmentStatistic = useQuery("investmentStatistic" , getInvestmentStatistic)
  
  const getCompanyStatistic = async () => {
    const {data} = await axiosInstance.get(apiRoutes.companyStatistic)
    return data
  }
  const companyStatistic = useQuery("companyStatistic" , getCompanyStatistic)
  console.log("company statistic" , companyStatistic)

  const getUserRelatedCompany =  async () => {
    const {data} = await axiosInstance.get(apiRoutes.companyUserRelatedCompany 
      + `?expand=cover_image,company_category,logo_image&fields=cover_image.url,company_category.name,logo_image.url,number_investors,investment_target,created_at,closing_date,collected_budget,id`)
    return data
  }

  const userRelatedCompany = useQuery("userRelatedCompany" , getUserRelatedCompany)
  // console.log("userRelatedCompany" , userRelatedCompany)

  return (
    <>
      <Head>
        <title>
          {t.title} | {`${user?.firstName} ${user?.lastName} profile`}
        </title>
        <meta name="description" content={"Edit user profile"} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ borderRadius: 5 }}>
          <Image
            src={
              user?.coverPhoto?.url
                ? `${mediaBaseURL}${user?.coverPhoto?.url}`
                : "/images/cover.png"
            }
            className="cover_image"
            width="100%"
            height={isMobile ? 60 : 30}
            layout="responsive"
            objectFit="cover"
            alt="cover photo"
          />
        </Box>
        <Grid container>
          <Grid item md={6} mx={isMobile ? "auto" : 15}>
            <Container maxWidth="lg" sx={{ display: "flex" }}>
              <Avatar
                src={`${mediaBaseURL}${user?.avatar?.url}`}
                sx={{
                  width: 100,
                  height: 100,
                  marginTop: -5,
                  // outline: "3px solid #F8F8F8",
                }}
              />
              <Box px={3}>
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  color="black"
                  // fontFamily="Segoeui"
                  fontWeight="bold"
                >
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography>{user?.email}</Typography>
              </Box>
            </Container>
          </Grid>
        </Grid>
        <Grid container py={5}>
          <Grid item md={12}>
            <Container maxWidth="md">
              {/* <Tabs
                value={value}
                onChange={handleChange}
                sx={{
                  background: "#f1f1f1",
                  "& .Mui-selected": {
                    textTransform: "none !important",
                    color: `${theme.palette.primary.dark} !important }`,
                  },
                  "& .css-1dlsodn-MuiButtonBase-root-MuiTab-root": {
                    textTransform: "none !important",
                    fontSize: "1.3rem !important",
                  },
                }}
              >
                <Tab label="Investments" {...a11yProps(0)} />
                <Tab label="Raisings" {...a11yProps(1)} />
              </Tabs> */}
              <TabPanel value={value} index={0}>
                {/* <Investments
                  // statistics={investmentData.statistics}
                  statistics={investmentStatistic?.data ? investmentStatistic?.data : false }
                  chartData={investmentData.investedProjectsChart}
                  // investedProjects={investmentData.investedProjects}
                  investedProjects={investmentRelatedCompany?.data?.results}
                /> */}
               {/* { investmentRelatedCompany?.data?.count && <Box>
                  <TablePagination
                    component="div"
                    count={investmentRelatedCompany?.data?.count}
                    page={InvestmentPage}
                    onPageChange={handleChangePageInvestment}
                    rowsPerPage={InvestmentRowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPageInvestment}
                    showFirstButton 
                    showLastButton
                  />
                </Box>} */}
              </TabPanel>
              {/* <TabPanel value={value} index={1}>
                <Raisings
                  // statistics={raisingData.statistics}
                  statistics={companyStatistic?.data ? companyStatistic?.data : false}
                  // chartData={raisingData.raisedProjectsChart}
                  // raisedProjects={raisingData.raisedProjects}
                  raisedProjects={userRelatedCompany?.data?.results}
                />
              </TabPanel> */}
            </Container>
          </Grid>
        </Grid>
        <Link href="/setting" passHref>
          <Button
            variant="contained"
            color="success"
            sx={{
              position: "absolute",
              top: isMobile ? 120 : 170,
              right: isMobile ? 30 : isLargeDesktop ? 400 : 180,
              color: "secondary.dark",
              backgroundColor: "rgba(255,255,255, 0.4)",
              "&:hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            <Box component="span" mr={1}>
              <EditIcon color={theme.palette.secondary.dark} />
            </Box>{" "}
            {t?.edit_profile}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default Profile;

Profile.requireAuth = true;
