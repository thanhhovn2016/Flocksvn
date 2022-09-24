import Head from "next/head";

import { useTranslation } from "../../../hooks";
import { StoryDetails } from "../../../components/blog";
import { getPost, getAllSlugs } from "../../../services";

const SingleStory = ({ story }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>
          {t.title} | {story?.title}
        </title>
        <meta name="description" content={story?.title} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <StoryDetails story={story} />
    </>
  );
};

export default SingleStory;

export async function getStaticPaths(context) {
  const slugs = await getAllSlugs();

  const paths = slugs.results.map((item) => ({
    params: { slug: item.slug },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const story = await getPost(params.slug);

  return {
    props: {
      story,
    },
    revalidate: 60,
  };
}
