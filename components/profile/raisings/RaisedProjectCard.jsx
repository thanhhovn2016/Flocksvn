import Image from "next/image";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";

import { ProjectMetaItem } from "../";
import { PersonIcon, FilledCalendarIcon, HandDollorIcon } from "../../icons";
import {
  useMediaBreakpoints,
  useAppTheme,
  useTranslation,
} from "../../../hooks";
import { useRouter } from "next/router";

const RaisedProjectCard = ({
  projectTitle,
  category,
  logo,
  cover,
  createdDate,
  investors,
  minimumAmount,
  targetAmount,
  raisedAmount,
  closingDate,
  id
}) => {
  const { isMobile } = useMediaBreakpoints();
  const theme = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter()
  const  handleClickDetails = () => {
    router.push({
      pathname:"/projects/update",
      query:{id:id}
    })
    // router.push(`/projects/update`)
  }
  return (
    <Card onClick={handleClickDetails} sx={{cursor:"pointer"}}>
      <CardContent>
        {isMobile ? (
          <Grid container>
            <Grid item xs={12} sx={{ position: "relative", height: 150 }}>
              <Image
                src={cover}
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
                <Image src={logo} width={50} height={50} alt="project logo" />
                <Box ml={2}>
                  <Typography>{projectTitle}</Typography>
                  <Typography>{category}</Typography>
                </Box>
              </Box>
              <Box sx={{ pt: 2 }}>
                <ProjectMetaItem icon={PersonIcon} value={investors} />
                <ProjectMetaItem icon={PersonIcon} value={createdDate} />
                <ProjectMetaItem icon={PersonIcon} value={targetAmount} />
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
                  {minimumAmount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item md={8}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image src={logo} width={50} height={50} alt="project logo" />
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
                  icon={<HandDollorIcon />}
                  value={`${raisedAmount} raised from ${targetAmount}`}
                />
                <ProjectMetaItem
                  icon={<FilledCalendarIcon />}
                  value={createdDate}
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
                  <Typography>{t?.min_investment}</Typography>
                  <Typography>{minimumAmount}</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} sx={{ position: "relative" }}>
              <Image
                src={cover}
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
  );
};

export default RaisedProjectCard;
