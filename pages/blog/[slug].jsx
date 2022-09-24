import Head from "next/head";

import { BlogDetails } from "../../components/blog";
import { getPost, getRelatedPosts, getAllSlugs } from "../../services";
import { useTranslation } from "../../hooks";

const SingleBlog = ({ blog, relatedBlogs }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t.title} | {blog?.title}
        </title>
        <meta name="description" content={blog?.title} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <BlogDetails blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
};

export default SingleBlog;

export async function getStaticPaths(context) {
  const slugs = await getAllSlugs();

  // console.log(slugs.results);
  const paths = slugs.results.map((item) => ({
    params: { slug: item.slug },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const blog = await getPost(params.slug);
  const relatedBlogs = await getRelatedPosts(params.slug);

  return {
    props: {
      blog,
      relatedBlogs,
    },
    revalidate: 60,
  };
}
