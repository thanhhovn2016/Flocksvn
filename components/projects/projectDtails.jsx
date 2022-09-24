import { Button, Link, Slider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, typography } from "@mui/system";
import {
  Language,
  Email,
  LocalPhone,
  FacebookOutlined,
  LinkedIn,
  Twitter,
  LocationOn,
  MonetizationOnOutlined,
  IosShareOutlined,
  AccountCircleOutlined,
  AccessTimeOutlined,
  InsertDriveFile,
  ArrowDownward,
} from "@mui/icons-material";
import OurTeam from "./ourTeam";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  headerFirstGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"#FFF"
  },
  headerFirstLogoContent: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    alignItems: "center",
  },
  logoFirstHeader: {
    height: "80px",
    width: "80px",
    borderRadius: "50%",
    marginRight: "1rem",
  },
  imageTitleProject: {
    width: "100%",
    borderRadius: "1rem",
    marginTop: "2rem",
  },
  imageTitlePageFooter: {
    display: "flex",
    height: "4.6rem",
    justifyContent: "space-around",
    alignItems: "center",
    background: "#FFF",
    marginTop: "1.5rem",
    borderRadius: "1rem",
  },
  itemsFooter: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  imageTitlePageFooterIcons: {
    fontSize: "1.3rem",
    alignSelf: "center",
  },
  tabLinkGrid: {
    display: "flex",
    justifyContent: "space-around",
    height: "4.5rem",
    background: "#FFF",
    borderRadius: "1rem",
    alignItems: "center",
    margin: "1rem 0 ",
    padding: "0 0.5rem",
  },
  contentLink: {
    margin: "2.5rem 0 1rem 0",
  },

  slider: {
    height: "10px",
    cursor: "default",
    "& .MuiSlider-thumb": {
      display: "none",
    },
  },
  textSliderValue: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  textSliderValuePrimary: {
    // color: theme.palette?.primary?.main,
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
}));

const HeaderFirst = () => {
  const classes = useStyle();
  return (
    <Box className={classes.headerFirstGrid}>
      <Box className={classes.headerFirstLogoContent}>
        <Box>
          <img
            className={classes.logoFirstHeader}
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGdys0H6r6qKq9hNaiPTh6_nab2x_wkVd9g&usqp=CAU`}
            srcSet={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGdys0H6r6qKq9hNaiPTh6_nab2x_wkVd9g&usqp=CAU&dpr=2 2x`}
            alt={"image Header"}
            loading="lazy"
          />
        </Box>
        <Box>
          <Typography variant="h5">Merlino Agent</Typography>
          <Typography variant="body2">Merlino Agent</Typography>
        </Box>
      </Box>
      <Box> Started: 2 Feb,2022</Box>
    </Box>
  );
};
const ContentProjectDetails = () => {
  const [linkDocument, setLinkDocument] = useState(null);
  const classes = useStyle();
  const handleClickLinkFunction = (event) => {
    const id = event.target.id;
    setLinkDocument(id);
  };
  return (
    <Box>
      <Box>
        <img
          className={classes.imageTitleProject}
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAU`}
          srcSet={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAUdpr=2 2x`}
          alt={"image Header"}
          loading="lazy"
        />
      </Box>
      <Box className={classes.imageTitlePageFooter}>
        <Box className={classes.itemsFooter}>
          <Language className={classes.imageTitlePageFooterIcons} />
          Website
        </Box>
        <Box className={classes.itemsFooter}>
          <Email className={classes.imageTitlePageFooterIcons} />
          Email
        </Box>
        <Box className={classes.itemsFooter}>
          <LocalPhone className={classes.imageTitlePageFooterIcons} />
          +84 123-456-789
        </Box>
        <Box className={classes.itemsFooter}>
          <FacebookOutlined className={classes.imageTitlePageFooterIcons} />
          <LinkedIn className={classes.imageTitlePageFooterIcons} />
          <Twitter className={classes.imageTitlePageFooterIcons} />
        </Box>
        <Box className={classes.itemsFooter}>
          <LocationOn className={classes.imageTitlePageFooterIcons} />
          Heart, Afghanistan
        </Box>
      </Box>
      <Typography variant="body1" margin="1rem 0">
        Merlino Software Agency was born to address these pain points. We fill
        in the blank by listening to your needs and requirements, providing our
        perspective and advice, and developing your product with leading-edge
      </Typography>
      <Typography variant="body1">
        technologies, all of this while being clear on timelines, costs, and
        quality. You ll only worry about growing your business and letting the
        world know about your idea. You are a non-technical Startup founder or
        corporate project manager. You tried to bring a digital product to life.
        You either attempted to hire developers yourself or paid a low-budget
        agency to do the work. Still, you soon got shocked: slow execution,
        lousy communication, meager quality/price ratio.
      </Typography>

      <Box className={classes.tabLinkGrid}>
        <Box
          onClick={handleClickLinkFunction}
          id="vision"
          style={{
            background: linkDocument === "vision" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Vision
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="overview"
          style={{
            background: linkDocument === "overview" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          {" "}
          Overview{" "}
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="problem"
          style={{
            background: linkDocument === "problem" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Problem
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="solutions"
          style={{
            background: linkDocument === "solutions" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Solutions
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="businessModel"
          style={{
            background: linkDocument === "businessModel" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Business Model
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="whyInvest"
          style={{
            background: linkDocument === "whyInvest" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Why Invest?
        </Box>
        <Box
          onClick={handleClickLinkFunction}
          id="ourTeam"
          style={{
            background: linkDocument === "ourTeam" ? "#D9FD00" : "",
            cursor: "pointer",
          }}
          padding="0.7rem 1.5rem"
          borderRadius="1.2rem"
        >
          Our Team
        </Box>
      </Box>
      <Box className={classes.contentLink}>
        <Link href="#">Vision</Link>
      </Box>
      <Typography variant="h5">
        become the largest Merlino Agent platform to trade home equity
      </Typography>
      <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
      <Box>
        <img
          className={classes.imageTitleProject}
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAU`}
          srcSet={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAUdpr=2 2x`}
          alt={"image Header"}
          loading="lazy"
        />
      </Box>
      <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
      <Box className={classes.contentLink}>
        <Link href="#">Overview</Link>
      </Box>
      <Typography variant="h5">Merlino Agent title</Typography>
      <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. of Lorem Ipsum.
      </Typography>
      <Typography variant="body2">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, content here, making it look
        like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search
        for lorem ipsum will uncover many web sites still in their infancy.
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </Typography>

      <Box className={classes.contentLink}>
        <Link href="#">Problem</Link>
      </Box>
      <Typography variant="h5">We have a big Problem</Typography>
      <Typography variant="body2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Problem 1: It is a long established fact that a reader will be
        distracted by the readable content of a page when looking layout. The
        point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using Content here, content here,
        making it look like readable English. Many desktop publishing packages
        and web page editors now use Lorem Ipsum as their default model text,
        and a search for lorem ipsum will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like). Problem
        2: It is a long established fact that a reader will be distracted by the
        readable content of a page when looking layout. The point of using Lorem
        Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using Content here, content here, making it look like
        readable English. Many desktop publishing packages and web page editors
        now use Lorem Ipsum as their default model text, and a search for lorem
        ipsum will uncover many web sites still in their infancy. Various
        versions have evolved over the years, sometimes by accident, sometimes
        on purpose (injected humour and the like).
      </Typography>
      <Box>
        <img
          className={classes.imageTitleProject}
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAU`}
          srcSet={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHYbAE-ieEfuYS3OYawODBwkh6X729ASkzgpqobOj20zFzQrm5ULC2MTpAr2sFyb-iDM&usqp=CAUdpr=2 2x`}
          alt={"image Header"}
          loading="lazy"
        />
      </Box>
      <Box className={classes.contentLink}>
        <Link href="#">Our Team</Link>
      </Box>
      <Typography variant="h5">Merlino Agent Team</Typography>
      <Typography variant="body2">
        Everyone helping build Merlino Agent, not limited to employees.
      </Typography>
      <Box>
        <OurTeam />
      </Box>
      <Box display={"flex"} gap="2rem">
        <OurTeam />
        <OurTeam />
        <OurTeam />
        <OurTeam />
      </Box>

      <Box display="flex" gap="2rem" margin="2rem">
        <Button
          variant="outlined"
          // disabled
          startIcon={<MonetizationOnOutlined />}
        >
          500 min.
        </Button>
        <Button variant="contained">Invest in Merlino Agent</Button>
      </Box>
    </Box>
  );
};
const SiteBarDetails = () => {
  const classes = useStyle();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent={"end"}
        alignItems="center"
        height={"80px"}
      >
        <IosShareOutlined />
      </Box>
      <Box
        style={{
          backgroundColor: "#e5e5e5",
          padding: "1rem",
          marginTop: "2rem",
        }}
        borderRadius="1rem"
      >
        <Box className={classes.textSliderValue}>
          <Box className={classes.textSliderValuePrimary}>
            {" "}
            68,500 <span>Raised</span>
          </Box>
          <Box>
            <span>of </span> 85,000
          </Box>
        </Box>
        <Box>
          <Slider
            aria-label="Temperature"
            value={30}
            // getAriaValueText={valuetext}
            color="primary"
            // track={false}
            className={classes.slider}
            size="1rem"
            // disabled={true}
            min={1}
            max={100}
          />
        </Box>
        <Box
          display="flex"
          gap="0.5rem"
          justifyItems={"center"}
          marginTop="1rem"
        >
          <AccountCircleOutlined />
          <span style={{ fontWeight: "bold" }}>120</span>
          <span>Investors</span>
        </Box>
        <Box
          display="flex"
          gap="0.5rem"
          justifyItems={"center"}
          marginTop="0.5rem"
        >
          <AccessTimeOutlined />
          <span style={{ fontWeight: "bold" }}>4</span>
          <span>Days</span>
        </Box>
        <Box marginTop={"5rem"}>
          <Typography variant="body2" textAlign={"center"}>
            $500 minimum investment
          </Typography>
        </Box>
        <Box margin="1rem 0 ">
          <Button variant="contained" fullWidth={true}>
            Invest
          </Button>
        </Box>
      </Box>
      <Box
        style={{ backgroundColor: "#FFF" }}
        padding="1.5rem"
        marginTop={"1rem"}
        borderRadius="1rem"
      >
        <Typography variant="h5">Documents</Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginTop="2rem"
        >
          <Box display={"flex"} alignItems="center" gap="0.5rem">
            <InsertDriveFile />
            <span>Crowdfunding.pdf</span>
          </Box>
          <ArrowDownward color="primary" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginTop="2rem"
        >
          <Box display={"flex"} alignItems="center" gap="0.5rem">
            <InsertDriveFile />
            <span>Merlino Agent document.docx</span>
          </Box>
          <ArrowDownward color="primary" />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          marginTop="2rem"
        >
          <Box display={"flex"} alignItems="center" gap="0.5rem">
            <InsertDriveFile />
            <span>Merlino Agent form.pptx</span>
          </Box>
          <ArrowDownward color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

const ProjectDetails = () => {
  return <Box>ProjectDetails</Box>;
};

export { ProjectDetails, HeaderFirst, SiteBarDetails, ContentProjectDetails };
