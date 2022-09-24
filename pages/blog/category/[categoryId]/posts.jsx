import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Container,
  Pagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { BlogSection } from "../../../../components/blog";
import { useTranslation } from "../../../../hooks";
import { getCategoryPosts } from "../../../../services";

const Blogs = ({ blogs, count, currentPage, categoryId }) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const router = useRouter();

  React.useEffect(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const handlePagination = (event, value) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = value;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <>
      <Head>
        <title>
          {t.title} | {t.posts}
        </title>
        <meta name="description" content="Category Posts" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box py={10}>
        <Container maxWidth="lg">
          {loading && (
            <Box>
              <Backdrop open={true}>
                <CircularProgress />
              </Backdrop>
            </Box>
          )}
          <BlogSection blogs={blogs} />
          {/* {count > 10 && <Pagination count={count} onChange={handlePagination} />} */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(count / 6)}
              onChange={handlePagination}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Blogs;

export async function getServerSideProps({ params, query }) {
  const page = query.page || 1;
  const categoryId = query.categoryId;
  try {
    const blogs = await getCategoryPosts(categoryId, page);
    return {
      props: {
        blogs: blogs.results,
        count: blogs.count,
        currentPage: page,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
      props: {},
    };
  }
}
