import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";

import { SingleEvent } from "../../components/events";
import { useTranslation, useMediaBreakpoints } from "../../hooks";
import { getAllEvents } from "../../services";
import { mediaBaseURL } from "../../utils/constants";
import { getMonthName, getMonthDay, getTime } from "../../utils/functions";

const Events = ({ events }) => {
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();

  return (
    <>
      <Head>
        <title>
          {t.title} | {t?.events}
        </title>
        <meta name="description" content={"Flocks AI events"} />
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
            pt: 15,
            borderRadius: isMobile ? "0px 0px 40px 40px" : "0px",
          }}
        >
          <Typography variant="h4" color="#fff" py={5} fontWeight="600">
            {t?.events}
          </Typography>
        </Box>
        <Box pb={5}>
          <Container maxWidth="lg">
            {events.map((event) => (
              <SingleEvent
                key={event?.id}
                eventId={event?.id}
                title={event?.title}
                description={event?.content}
                eventCoverPhoto={`${mediaBaseURL}${event?.headerImage?.url}`}
                dayOfMonth={getMonthDay(event?.executionDateStart)}
                monthName={getMonthName(event?.executionDateStart)}
                startTime={getTime(event?.executionDateStart)}
                endTime={getTime(event?.executionDateEnd)}
              />
            ))}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Events;

export async function getStaticProps(context) {
  const events = await getAllEvents();

  return {
    props: {
      events: events.results,
    },
    revalidate: 60,
  };
}
