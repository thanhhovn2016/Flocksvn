import { Search } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField,
  Container,
  Backdrop,
  CircularProgress,
  Typography,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react";
import Head from "next/head";
import Project from "../../components/projects";
import axiosInstance from "../../services/axiosWithApikey";
import { apiRoutes } from "../../utils/constants";
import debounce from "lodash.debounce";
import axios from "../../services/axiosLocalServer";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks";
import { useQuery } from "react-query";
import Image from "next/image";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProjectIndex = (props) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const query = router?.query?.query;

  const [searchResult, setSearchResult] = useState([]);

  const [categoriesState, setCategoriesState] = useState({
    id: "",
    categoriesName: [],
  });

  const [loading, setLoading] = React.useState(false);
  const [getData, setGetData] = useState(true);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    rowsPerPage: 10,
  });
  const { data: projectCategories } = useQuery(
    "projectCategories",
    async () => {
      const { data } = await axios.get("project/categories/");
      return data;
    }
  );
  const { isLoading, data: projects } = useQuery("projects", async () => {
    const { data } = await axios.get(
      `project/?page=${paginationState?.page}&page_size=${paginationState?.rowsPerPage}`
    );
    return data;
  });
  const [handelSearchAndFilterState, setHandleSearchAndFilterState] = useState({
    textSearch: query,
    filterText: "",
    valueFilter: "Ten",
    projectList: [],
  });

  const handleFilterFunction = React.useCallback(
    debounce(async (query) => {
      console.log("query", query);
      if (query == "undefined") return;
      setLoading(true);
      const data = await axios.get(`project/filter?query=${query}`);
      setLoading(false);
      // console.log("data filter", data);
      setSearchResult(data?.data);
    }, 300),
    []
  );
  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    const categoriesIdArray = "";
    // console.log("projectCategories " , projectCategories)
    const categoriesId = projectCategories.map((item) => {
      // console.log("category item" , item)
      value?.map((value) => {
        if (item.name === value) {
          categoriesIdArray += item?.id + ",";
        }
      });
    });
    setCategoriesState((prevState) => ({
      ...prevState,
      id: categoriesIdArray,
      categoriesName: value,
    }));
    setGetData(true);
    // console.log("categoriesIdArray" , categoriesIdArray)
    if (categoriesIdArray === "") return setSearchResult([]);
    await handleFilterFunction(categoriesIdArray);
  };
  // let serverData
  const debouncedSearch = React.useCallback(
    debounce(async (query) => {
      console.log("query", query);
      if (query == "undefined") return;
      setLoading(true);
      const data = await axios.get(`project/search?query=${query}`);
      setLoading(false);
      setSearchResult(data?.data);
    }, 1000),
    []
  );

  const handleChangeSearchFunction = async (event) => {
    const query = event?.currentTarget?.value;
    console.log("event query", query);
    setHandleSearchAndFilterState((prevState) => ({
      ...prevState,
      textSearch: query,
    }));
    if (!query) return setSearchResult([]);

    await debouncedSearch(query);
  };

  const searchOnRender = async () => {
    setHandleSearchAndFilterState((prevState) => ({
      ...prevState,
      textSearch: query,
    }));
    if (!query) return setSearchResult([]);

    await debouncedSearch(query);
  };

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  React.useEffect(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  React.useEffect(() => {
    if (query) {
      searchOnRender();
    }
  }, [query]);

  const handlePagination = (event, value) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = value;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);

    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = newPage;
    setPaginationState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(+event.target.value);
    // setPage(0);
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page_size = event.target.value;
    setPaginationState((prevState) => ({
      ...prevState,
      rowsPerPage: event.target.value,
    }));
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.projects}
        </title>
        <meta name="description" content="Flocks AI projects list" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box style={{ background: "#E5E5E5" }} py={15}>
        {loading && (
          <Box
            display="grid"
            position="fixed"
            height="100vh"
            width="100vw"
            justifyContent="center"
            alignItems="center"
            top="0px"
            style={{ background: "#80808061" }}
            zIndex="100"
          >
            <CircularProgress />
          </Box>
        )}
        <Container maxWidth="lg">
          <Grid container spacing={3} marginTop="0.5rem">
            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-basic"
                size="small"
                fullWidth={true}
                variant="outlined"
                type="text"
                onChange={handleChangeSearchFunction}
                value={handelSearchAndFilterState?.textSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                // label="Search"
                placeholder={t?.search}
              />
            </Grid>
            {/* <Grid item xs={12} md={2}>
        <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={handleChangeFilterFunction?.valueFilter}
            // label="Age"
            onChange={handleChangeFilterFunction}
            size={"small"}
            fullWidth={true}
          >
            
            <MenuItem value={"Filter By Progress"}>Filter By Progress</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Complete Companies"}>Complete Companies</MenuItem>
          </Select>
        </Grid> */}
            <Grid item xs={12} md={3}>
              <Select
                // labelId="demo-multiple-checkbox-label"
                // id="demo-multiple-checkbox"
                multiple
                value={categoriesState?.categoriesName}
                // value={handleChangeFilterFunction?.valueFilter}
                label="Age"
                // onChange={handleChangeFilterFunction}
                size={"small"}
                fullWidth={true}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => " " + selected + " , "}
                MenuProps={MenuProps}
                style={{ background: "#EAEAEA", position: "relative" }}
                variant="standard"
                // label={t?.category}
                placeholder={t?.categories}
                // placeholder="All categories"
              >
                {projectCategories?.map((item) => (
                  <MenuItem key={item?.id} value={item.name}>
                    <Checkbox
                      checked={
                        categoriesState?.categoriesName?.indexOf(item?.name) >
                        -1
                      }
                    />
                    <ListItemText primary={item?.name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={6} md={2} display="flex" justifyContent={"flex-end"}>
          
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={handleChangeFilterFunction?.valueFilter}
            label="Age"
            onChange={handleChangeFilterFunction}
            size={"small"}
            fullWidth={true}
          >
           
            <MenuItem value={"Most Founded"}>Most Founded</MenuItem>
            <MenuItem value={"Recently Launched"}>Recently Launched</MenuItem>
            <MenuItem value={"Closing Soon"}>Closing Soon</MenuItem>
          </Select>
        </Grid> */}
          </Grid>
          {searchResult?.results?.length > 0 ? (
            <Grid container spacing={3} marginTop="0.5rem">
              {searchResult?.results?.length > 0 &&
                searchResult?.results?.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} id={item?.id}>
                      <Project company={item} />
                    </Grid>
                  );
                })}
            </Grid>
          ) : handelSearchAndFilterState?.textSearch ||
            (categoriesState?.categoriesIdArray &&
              searchResult?.results?.length === 0) ? (
            <Box display="grid" justifyContent={"center"} marginTop="2rem">
              {/* <EmptyBox maxWidth="10rem"  width={"10rem"}/> */}
              <Image
                src={"/images/empty_box.svg"}
                width={200}
                height={200}
                alt="empty box"
              />
              <Typography textAlign={"center"}>{t?.not_found_data}</Typography>
            </Box>
          ) : (
            <Grid container spacing={5} marginTop="0.5rem">
              {/* {props?.data?.results?.length > 0 &&
                props?.data?.results?.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} lg={3} id={item?.id}>
                      <Project company={item} />
                    </Grid>
                  );
                })} */}

              {/* 
                temporary client side data fetching for projcts list
                this should be pre rendered in the actual production platform
                
                */}
              {isLoading && (
                <Backdrop open>
                  <CircularProgress />
                </Backdrop>
              )}

              {projects?.results?.length > 0 &&
                projects?.results?.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} id={item?.id}>
                      <Project company={item} />
                    </Grid>
                  );
                })}
            </Grid>
          )}
          <Box display="flex" justifyContent={"flex-end"} margin="2rem 0">
            {/* <Pagination
              count={Math.ceil(projects?.count / 10)}
              page={currentPage}
              onChange={handlePagination}
            /> */}

            {projects?.results?.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={projects?.count}
                rowsPerPage={paginationState?.rowsPerPage}
                page={paginationState?.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

// export async function getServerSideProps({ params, query }) {
//   const page = query.page || 1;
//   try {
//     const { data } = await axiosInstance.get(
//       apiRoutes.company +
//         `?expand=company_category,cover_image,logo_image&page=${page}`
//     );
//     // const category = await axiosInstance.get(
//     //   apiRoutes.company + `company_category`
//     // );
//     return {
//       props: {
//         data: data,
//         // category: category?.data,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         permanent: true,
//         destination: "/404",
//       },
//       props: {},
//     };
//   }
// }

export default ProjectIndex;
