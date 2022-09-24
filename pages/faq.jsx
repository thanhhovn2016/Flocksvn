import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Tabs,
  Tab,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "../services/axiosLocalServer";
import debounce from "lodash.debounce";

import { useTranslation, useMediaBreakpoints } from "../hooks";
import { SearchIcon } from "../components/icons";
import { FaqAccordion } from "../components/faq";

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

const FAQ = () => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const [filteredQuestions, setFilteredQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [searchText, setTextSearch] = React.useState(null);
  const [categoryId, setCategoryId] = React.useState(1);
  const { isLoading: categoriesLoading, data: faqCategories } = useQuery(
    ["faqCategories"],
    async () => {
      const { data } = await axios.get("faq/categories/");
      return data;
    }
  );
  const { isLoading: itemsLoading, data: faqItems } = useQuery(
    ["faqItems", categoryId],
    async () => {
      const { data } = await axios.get(`faq/${categoryId}/`);

      return data;
    },
    {
      onError: (err) => console.log(err),
    }
  );

  const debouncedSearch = React.useCallback(
    debounce(async (query) => {
      if (query == "undefined") {
        setFilteredQuestions([]);
        return;
      }
      setLoading(true);
      const data = await axios.get(`faq/search?query=${query}`);
      setLoading(false);
      setFilteredQuestions(data?.data?.results);
    }, 1000),
    []
  );

  const handleFaqSearch = async (event) => {
    const query = event.target.value;
    setTextSearch(query);
    if (!query) return setFilteredQuestions([]);
    await debouncedSearch(query);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCategoryId(newValue + 1);
  };

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
          }}
        >
          <Typography variant="h5" color="#fff" pt={5}>
            {t?.faqs}
          </Typography>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            color="#fff"
            fontWeight="bold"
            pb={3}
          >
            {t?.frequently_asked_questions}
          </Typography>
          <Typography color="#fff">{t?.faq_have_question}</Typography>
          <Grid container>
            <Grid item md={4} xs={0}></Grid>
            <Grid item md={4} xs={12} px={2}>
              <TextField
                placeholder={t?.search}
                onChange={handleFaqSearch}
                InputProps={{
                  style: {
                    backgroundColor: "#fff",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Container maxWidth="md">
          <Box textAlign="center" py={5} mt={-15} sx={{ zIndex: 1000 }}>
            <Image src="/images/faq.svg" height={200} width={200} alt="faq" />
          </Box>
          <Box py={5}>
            {categoriesLoading ||
              (loading && (
                <Backdrop open>
                  <CircularProgress />
                </Backdrop>
              ))}
            {searchText?.length > 0 ? (
              <Grid container>
                {filteredQuestions?.length > 0 && (
                  <Grid item md={12} xs={12}>
                    <Typography
                      variant="h5"
                      color="primary.dark"
                      textAlign="center"
                      fontWeight="bold"
                      gutterBottom
                      mb={2}
                    >
                      {t.found_results}
                    </Typography>
                  </Grid>
                )}

                {filteredQuestions?.length > 0 && (
                  <Grid item md={12} xs={12}>
                    <FaqAccordion questions={filteredQuestions} />
                  </Grid>
                )}
                {filteredQuestions?.length === 0 && (
                  <Grid item md={12} xs={12}>
                    <Box
                      display="grid"
                      justifyContent={"center"}
                      marginTop="2rem"
                    >
                      {/* <EmptyBox maxWidth="10rem"  width={"10rem"}/> */}
                      <Image
                        src={"/images/empty_box.svg"}
                        width={200}
                        height={200}
                        alt="empty box"
                      />
                      <Typography textAlign={"center"}>
                        {t?.not_found_data}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {/* <Grid item md={12} xs={12}>
                  <Typography
                    variant="h5"
                    color="primary.dark"
                    textAlign="center"
                    fontWeight="bold"
                    gutterBottom
                    mb={2}
                  >
                    {t.found_results}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FaqAccordion questions={filteredQuestions} />
                </Grid> */}
              </Grid>
            ) : (
              <Grid container textAlign="left">
                <Grid item md={3} xs={12}>
                  {faqCategories?.results?.length > 0 && (
                    <Tabs
                      value={value}
                      orientation="vertical"
                      variant="scrollable"
                      onChange={handleChange}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "10px 0px 0px 10px",
                        height: "100%",
                        textAlign: "left",
                        boxShadow:
                          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                      }}
                    >
                      {faqCategories?.results?.map((category, index) => (
                        <Tab
                          key={category?.name}
                          label={category?.name}
                          {...a11yProps(index)}
                          sx={{ alignItems: "flex-start" }}
                        />
                      ))}
                    </Tabs>
                  )}
                </Grid>
                <Grid item md={9} xs={12}>
                  <TabPanel value={value} index={value}>
                    {itemsLoading ? (
                      <Backdrop open>
                        <CircularProgress />
                      </Backdrop>
                    ) : (
                      <FaqAccordion questions={faqItems?.results} />
                    )}
                  </TabPanel>
                </Grid>
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FAQ;
