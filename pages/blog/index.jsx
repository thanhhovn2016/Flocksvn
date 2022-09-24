import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";

import { BlogSection, StorySection } from "../../components/blog";
import { EmptyBox, SearchIcon } from "../../components/icons";
import { useTranslation } from "../../hooks";
import { getPostsWithCategory } from "../../services";
import axios from "../../services/axiosLocalServer";
import Image from "next/image";

const Blogs = ({ blogCategories }) => {
  const { t } = useTranslation();
  const [filteredBlogs, setFilteredBlog] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText , setTextSearch] =  React.useState(null)

  const debouncedSearch = React.useCallback(
    debounce(async (query) => {
      if (query == "undefined") {
        setFilteredBlog([])
        return;
      }
      
      setLoading(true);
      const data = await axios.get(`blog/search?query=${query}`);
      setLoading(false);
      setFilteredBlog(data?.data?.results);
    }, 2000),
    []
  );

  const handleBlogSearch = async (event) => {
    const query = event.target.value;
    setTextSearch(query)
    if (!query) return setFilteredBlog([]);
    await debouncedSearch(query);
  };

 
  return (
    <>
      <Head>
        <title>
          {t.title} | {t?.blog}
        </title>
        <meta name="description" content={"Flocks AI blog"} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box py={10}>
        <Container maxWidth="lg">
          <Grid container my={5}>
            <Grid item md={3.5} xs={0}></Grid>
            <Grid item md={5} xs={12}>
              <TextField
                placeholder={t?.search_blog_text}
                sx={{
              "& .css-1eh8ut9-MuiInputBase-root-MuiOutlinedInput-root":{
                border:"1px solid #3131311f",
              }}}
                onChange={handleBlogSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={3.5} xs={0}></Grid>
          </Grid>
          {loading && (
            <Backdrop open>
              <CircularProgress />
            </Backdrop>
          )}
          {searchText ? (
            <Box>

              {filteredBlogs?.length > 0 ? <BlogSection
                sectionTitle={t?.found_results}
                blogs={filteredBlogs}
              /> : 
              <Box display="grid" justifyContent={"center"} >
                {/* <EmptyBox maxWidth="10rem"  width={"10rem"}/> */}
                <Image src={"/images/empty_box.svg"} width={200} height={200} alt="empty box"/>
                <Typography textAlign={"center"}>{t?.not_found_data}</Typography>
              </Box>
              }
            </Box>
          ) : (
            blogCategories
              ?.filter((category) => category?.lastPosts?.length > 0)
              ?.map((category) =>
                category?.name?.toLowerCase() == "flocks ai stories" ? (
                  <StorySection
                    sectionTitle={category?.name}
                    stories={category?.lastPosts}
                  />
                ) : (
                  <BlogSection
                    key={category?.name}
                    sectionTitle={category?.name}
                    blogs={category?.lastPosts}
                    categoryId={category?.id}
                  />
                )
              )
          )}
        </Container>
      </Box>
    </>
  );
};

export default Blogs;

export async function getStaticProps(context) {
  const blogCategories = await getPostsWithCategory();

  return {
    props: {
      blogCategories,
    },
    revalidate: 60,
  };
}
