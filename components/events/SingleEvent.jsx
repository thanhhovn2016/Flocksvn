import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

import { useMediaBreakpoints } from "../../hooks";
import { renderRawHTML } from "../../utils/functions";

const SingleEvent = ({
  eventId,
  eventCoverPhoto,
  title,
  description,
  dayOfMonth,
  monthName,
  startTime,
  endTime,
}) => {
  const { isMobile } = useMediaBreakpoints();

  return (
    <Link href={`/events/${eventId}/`} passHref>
      <Box my={3} sx={{ cursor: "pointer" }}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={3} xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    position: "relative",
                  }}
                >
                  <Image
                    src={eventCoverPhoto}
                    alt="event cover photo"
                    objectFit="cover"
                    layout="fill"
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item md={7} xs={12}>
                <Typography variant="h6" color="primary.dark" fontWeight="bold">
                  {title}
                </Typography>
                <Typography color="secondary.dark">{description?.length > 350 ? description?.slice(0,350) + "... " : description}</Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <Box textAlign="center" pt={isMobile ? 1 : 5} pb={1}>
                  <Typography variant="h4" color="primary.dark">
                    {dayOfMonth}
                  </Typography>
                  <Typography color="primary.dark">{monthName}</Typography>
                </Box>
                <Divider />
                <Box
                  component="time"
                  color="primary.dark"
                  sx={{ display: "flex", justifyContent: "center", py: 2 }}
                  textAlign="center"
                >
                  {startTime} - {endTime}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
};

export default SingleEvent;
