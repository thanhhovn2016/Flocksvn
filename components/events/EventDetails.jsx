import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Typography, Container, Grid, Divider } from "@mui/material";

import { useMediaBreakpoints, useTranslation } from "../../hooks";
import { CalendarIcon, TimeIcon, LocationFilledIcon } from "../icons";
import { EventMetaItem } from ".";
import { formatedDate, getTime } from "../../utils/functions";
import { mediaBaseURL } from "../../utils/constants";
import eventData from "../../data/events.json";

const EventDetails = ({ event }) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();
  const router = useRouter();
  const eventId = router.query.eventId;

  return (
    <Container maxWidth="md">
      <Box pt={15} pb={5}>
        <Box
          sx={{
            width: "100%",
            height: isMobile ? 200 : 400,
            position: "relative",
          }}
        >
          <Image
            src={`${mediaBaseURL}${event?.headerImage?.url}`}
            layout="fill"
            objectFit="cover"
            alt="cover photo"
            style={{
              borderRadius: "20px",
            }}
          />
        </Box>
        <Grid
          container
          px={2}
          py={1}
          my={2}
          sx={{
            backgroundColor: "#EFEFEF",
            borderRadius: "20px",
          }}
        >
          <Grid item md={4} xs={12}>
            <EventMetaItem
              icon={CalendarIcon}
              label={t?.date}
              value={formatedDate(event?.executionDateStart)}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <EventMetaItem
              icon={TimeIcon}
              label={t?.time}
              value={`${getTime(event?.executionDateStart)} - ${getTime(
                event?.executionDateEnd
              )}`}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <EventMetaItem
              icon={LocationFilledIcon}
              label={t?.location}
              value={event?.location}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" color="primary.dark">
          {event?.title}
        </Typography>
        <Typography color="secondary.dark" py={3}>
          {event?.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default EventDetails;
