import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DashboardOutlined, Settings } from "@mui/icons-material";
import { Logout, Web } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useAuth, useMediaBreakpoints, useTranslation } from "../../../hooks";
import { useRouter } from "next/router";
import { baseURL, mediaBaseURL } from "../../../utils/constants";
import Image from "next/image";
import Link from "next/link";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  // backgroundColor:"#d9fd00"
  backgroundColor: "#FFF",
  boxShadow:
    "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isMobile } = useMediaBreakpoints();
  const [openDialog, setOpenDialog] = React.useState(false);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerCloseMobile = () => {
    // if (isMobile) 
    setOpen(false);
  };

  const handleClickLogoutFunction = () => {
    setOpenDialog(!openDialog);
  };
  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };
  // React.useEffect(() => {
  //   if (!isMobile) {
  //     setOpen(true);
  //   }
  // }, []);
  return (
    <Box sx={{ display: "block" }}>
      <Dialog
        open={openDialog}
        //  open={true}
        onClose={handleClickLogoutFunction}
        maxWidth="xl"
        sx={{ zIndex: 1000000 }}
      >
        <DialogContent>{t?.sure_to_logout}</DialogContent>
        <DialogActions>
          <Button onClick={handleClickLogoutFunction}>{t?.no}</Button>
          <Button onClick={handleLogout}>{t?.yes}</Button>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div"></Typography>
          <Box display="grid" justifyContent={"flex-end"} width="100%">
            <Link href={"/setting"} locale={router?.locale} passHref>
              <Avatar
                alt={user?.firstName}
                src={mediaBaseURL + user?.avatar?.url}
              />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        variant="persistent"
        // variant="permanent"
        // variant={isMobile ? "temporary" : "persistent"}
        onClose={handleDrawerClose}
      >
        <DrawerHeader
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {router?.pathname === "/investor_profile" ||
            router?.pathname === "/investor_profile/participate_projects" ? (
              <Box
                display={"grid"}
                gridTemplateColumns="auto auto"
                alignItems={"center"}
              >
                <Image
                  src={"/images/invest_logo.svg"}
                  width={80}
                  height={40}
                  alt="logo"
                />
                {t?.investor}
              </Box>
            ) : (
              <Box
                display={"grid"}
                gridTemplateColumns="auto auto"
                alignItems={"center"}
              >
                <Image
                  src={"/images/company_logo.svg"}
                  width={80}
                  height={40}
                  alt="logo"
                />
                {t?.company}
              </Box>
            )}
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {router?.pathname === "/investor_profile" ||
          router?.pathname === "/investor_profile/participate_projects" ? (
            <Link href={"/investor_profile"} passHref>
              <ListItem
                key={"item1"}
                disablePadding
                sx={{
                  background:
                    router?.pathname === "/investor_profile"
                      ? "#e7e7e7bf"
                      : "#FFF",
                }}
                onClick={handleDrawerCloseMobile}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={t?.dashboard} />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : (
            <Link href={"/company_profile"} passHref>
              <ListItem
                key={"item1"}
                disablePadding
                sx={{
                  background:
                    router?.pathname === "/company_profile"
                      ? "#e7e7e7bf"
                      : "#FFF",
                }}
                onClick={handleDrawerCloseMobile}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={t?.dashboard} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          {router?.pathname === "/investor_profile" ||
          router?.pathname === "/investor_profile/participate_projects" ? (
            <Link href={"/investor_profile/participate_projects"} passHref>
              <ListItem
                key={"item1"}
                disablePadding
                sx={{
                  background:
                    router?.pathname ===
                    "/investor_profile/participate_projects"
                      ? "#e7e7e7bf"
                      : "#FFF",
                }}
                onClick={handleDrawerCloseMobile}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Image
                      src={"/images/project.svg"}
                      width={25}
                      height={25}
                      alt="logo"
                    />
                  </ListItemIcon>
                  <ListItemText primary={t?.participate_projects} />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : (
            <Link href={"/company_profile/applied_projects"} passHref>
              <ListItem
                key={"item1"}
                disablePadding
                sx={{
                  background:
                    router?.pathname === "/company_profile/applied_projects"
                      ? "#e7e7e7bf"
                      : "#FFF",
                }}
                onClick={handleDrawerCloseMobile}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* <InboxIcon /> */}
                    <Image
                      src={"/images/apply.svg"}
                      width={25}
                      height={25}
                      alt="logo"
                    />
                  </ListItemIcon>
                  <ListItemText primary={t?.applied_projects} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          {router?.pathname === "/investor_profile" ||
          router?.pathname ===
            "/investor_profile/participate_projects" ? null : (
            <Link href={"/company_profile/presentation_projects"} passHref>
              <ListItem
                key={"item1"}
                disablePadding
                sx={{
                  background:
                    router?.pathname ===
                      "/company_profile/presentation_projects" ||
                    router?.pathname === "/company_profile/update_presentation"
                      ? "#e7e7e7bf"
                      : "#FFF",
                }}
                onClick={handleDrawerCloseMobile}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* <InboxIcon /> */}
                    <Image
                      src={"/images/project.svg"}
                      width={25}
                      height={25}
                      alt="logo"
                    />
                  </ListItemIcon>
                  <ListItemText primary={t?.presentation_projects} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
        </List>
        <Divider />
        <List>
          {/* {['others'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
          <Link href={"/setting"}>
            <ListItem
              key={"setting"}
              disablePadding
              onClick={handleDrawerCloseMobile}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary={t?.setting} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href={"/"}>
            <ListItem
              key={"flocks AI"}
              disablePadding
              onClick={handleDrawerCloseMobile}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Web />
                </ListItemIcon>
                <ListItemText primary={"Flocks AI"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem
            key={"flocks vn"}
            disablePadding
            onClick={handleClickLogoutFunction}
          >
            <ListItemButton>
              <ListItemIcon>
                {/* <Logout /> */}
                <Image
                  src={"/images/logout.svg"}
                  width={25}
                  height={25}
                  alt="logo"
                />
              </ListItemIcon>
              <ListItemText primary={t?.logout} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box
          // paddingLeft={isMobile ? (open ? "0" : "16rem") : "0"}
          // paddingRight={'1rem'}
          // sx={{ backgroundColor: "#f5f5f5", minHeight: `calc(100vh -  ${isMobile ? "64px":"64px"})` , overflowY:"auto" }}
          sx={{ backgroundColor: "#f5f5f5", padding: "1rem" }}
        >
          {props?.children}
        </Box>
      </Main>
    </Box>
  );
}
