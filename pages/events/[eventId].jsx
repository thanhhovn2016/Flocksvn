import Head from "next/head";

import { EventDetails } from "../../components/events";
import { getEvent, getEventIds } from "../../services";
import { useTranslation } from "../../hooks";

const Event = ({ event }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t.title} | {event?.title}
        </title>
        <meta name="description" content={event?.title} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <EventDetails event={event} />
    </>
  );
};

export default Event;

export async function getStaticPaths(context) {
  const ids = await getEventIds();

  const paths = ids.results.map((item) => ({
    params: { eventId: item.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const event = await getEvent(params.eventId);

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}
