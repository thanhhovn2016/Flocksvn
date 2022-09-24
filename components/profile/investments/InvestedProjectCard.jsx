import Image from "next/image";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";
import Link from "next/link";
import { ProjectMetaItem } from "../";
import { PersonIcon, BoxCalendarIcon, HandDollorIcon } from "../../icons";
import {
  useMediaBreakpoints,
  useAppTheme,
  useTranslation,
} from "../../../hooks";
import { mediaBaseURL } from "../../../utils/constants";

const InvestedProjectCard = ({
  projectTitle,
  category,
  logo,
  cover,
  investedDate,
  investors,
  targetAmount,
  investedAmount,
  closingDate,
  id,
}) => {
  const { isMobile } = useMediaBreakpoints();
  const { t } = useTranslation();
  const theme = useAppTheme();
  
  return (
    <Link href={`/projects/${id}`}>
      <Card>
        <CardContent>
          {isMobile ? (
            <Grid container>
              <Grid item xs={12} sx={{ position: "relative", height: 150 }}>
                <Image
                  src={mediaBaseURL + cover}
                  objectFit="cover"
                  layout="fill"
                  alt="project cover photo"
                  style={{
                    borderRadius: "5px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={mediaBaseURL + logo}
                    width={50}
                    height={50}
                    alt="project logo"
                  />
                  <Box ml={2}>
                    <Typography>{projectTitle}</Typography>
                    <Typography>{category}</Typography>
                  </Box>
                </Box>
                <Box sx={{ pt: 2 }}>
                  {/* <ProjectMetaItem icon={PersonIcon} value={investors} />
                <ProjectMetaItem icon={PersonIcon} value={investedDate} date={true} />
                <ProjectMetaItem icon={PersonIcon} value={targetAmount} /> */}

                  <ProjectMetaItem
                    icon={<PersonIcon color={theme.palette.secondary.dark} />}
                    value={investors}
                  />
                  <ProjectMetaItem
                    icon={<BoxCalendarIcon />}
                    value={investedDate}
                    date={true}
                  />
                  <ProjectMetaItem
                    icon={<HandDollorIcon />}
                    value={targetAmount}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Box>
                    <Typography>
                      {t?.closing_date} {closingDate}
                    </Typography>
                  </Box>
                  <Typography pt={2} color="secondary.dark">
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: "primary.main",
                        display: "inline-block",
                        px: 3,
                        py: 0.3,
                        borderRadius: "5px",
                      }}
                    >
                      {investedAmount}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item md={8}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={mediaBaseURL + logo}
                    width={50}
                    height={50}
                    alt="project logo"
                  />
                  <Box ml={2}>
                    <Typography>{projectTitle}</Typography>
                    <Typography>{category}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
                  <ProjectMetaItem
                    icon={<PersonIcon color={theme.palette.secondary.dark} />}
                    value={investors}
                  />
                  <ProjectMetaItem
                    icon={<BoxCalendarIcon />}
                    value={investedDate}
                    date={true}
                  />
                  <ProjectMetaItem
                    icon={<HandDollorIcon />}
                    value={targetAmount}
                  />
                </Box>
              </Grid>
              <Grid item md={2}>
                <Box>
                  <Box>
                    <Typography>{t?.closing_date}</Typography>
                    <Typography>{closingDate}</Typography>
                  </Box>
                  <Typography pt={2} color="secondary.dark">
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: "primary.main",
                        display: "inline-block",
                        px: 3,
                        py: 0.3,
                        borderRadius: "5px",
                      }}
                    >
                      {investedAmount}
                    </Box>
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={2} sx={{ position: "relative" }}>
                <Image
                  src={mediaBaseURL + cover}
                  objectFit="cover"
                  layout="fill"
                  alt="project cover photo"
                  style={{
                    borderRadius: "5px",
                  }}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default InvestedProjectCard;
