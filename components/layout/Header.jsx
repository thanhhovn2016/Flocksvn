import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import moment from "moment";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Button,
  Menu,
  Select,
  MenuItem,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { useAuth, useMediaBreakpoints, useTranslation } from "../../hooks";
import { usePages } from "../../hooks";
import styles from "../../styles/Header.module.css";
import SearchInput from "./SearchInput";
import HotProject from "./HotProject";
import { getHotProjects } from "../../services";
import {
  MenuIcon,
  MoreIcon,
  ArrowDownIcon,
  CalendarIcon,
  FireIcon,
} from "../icons";
import { mediaBaseURL } from "../../utils/constants";
import axios from "../../services/axiosLocalServer";
import { useEffect } from "react";

const Header = () => {
  const pages = usePages();
  const { t } = useTranslation();
  const router = useRouter();
  const { token, logout, user } = useAuth();
  const { isDesktop, isMobile } = useMediaBreakpoints();
  const [query, setQuery] = React.useState(null);
  const { data, isLoading } = useQuery("hotProject", async () => {
    const { data } = await axios.get("/hotProject");
    return data;
  });
  const locale = router.locale;
  const path = router.pathname;
  const [isHotProjectVisible, setIsHotProjectVisible] = React.useState(true);
  const [anchorAccountEl, setAnchorAccountEl] = React.useState(null);
  const [anchorMobileMenu, setAnchorMobileMenu] = React.useState(null);
  const [anchorLangPicker, setAnchorLangPicker] = React.useState(null);
  const [anchorLearnPicker, setAnchorLearnPicker] = React.useState(null);
  const isAccountOpen = Boolean(
    anchorAccountEl === null ? false : anchorAccountEl
  );
  const isLangPickerOpen = Boolean(anchorLangPicker);
  const isLearnOpen = Boolean(anchorLearnPicker);
  const isMobileMenuOpen = Boolean(anchorMobileMenu);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  useEffect(() => {
    if (anchorAccountEl !== null) {
      setAnchorAccountEl(null);
    }
  }, [token]);

  const handleHotProjectClick = () => {
    setIsHotProjectVisible(false);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorAccountEl(event.currentTarget);
  };

  const handleAccountMenuClose = (event) => {
    setAnchorAccountEl(null);
  };

  const handleLangPickerOpen = (event) => {
    setAnchorLangPicker(event.currentTarget);
  };

  const handleLangPickerClose = (event) => {
    setAnchorLangPicker(null);
  };

  const handleLearnPickerOpen = (event) => {
    setAnchorLearnPicker(event.currentTarget);
  };

  const handleLearnPickerClose = (event) => {
    setAnchorLearnPicker(null);
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorMobileMenu(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorMobileMenu(null);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handlecloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(`/projects?query=${query}`);
  };

  return (
    <AppBar
      className={styles.header}
      sx={{
        height:
          isHotProjectVisible && !isMobile && !isLoading
            ? "140px !important"
            : "95px !important",
        pt:
          !isHotProjectVisible || isMobile
            ? "10px !important"
            : "0px !important",
      }}
    >
      {isHotProjectVisible && !isMobile && !isLoading && (
        <HotProject
          icon={<FireIcon />}
          title={t?.deals_closing_soon}
          timePeriod={moment(data?.closingDate).fromNow()}
          projectLogo={`${mediaBaseURL}${data?.logoImage?.url}`}
          projectName={data?.companyName}
          projectId={data?.id}
          onClose={handleHotProjectClick}
        />
      )}
      <Container maxWidth="xl">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link href="/" passHref>
            {isMobile ? (
              <Typography variant="h4">{t?.app_name}</Typography>
            ) : (
              <Image
                src={"/images/logo.png"}
                alt="flocks logo"
                width={60}
                height={80}
              />
            )}
          </Link>
        {isMobile &&  <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
          <Box
              sx={{
                display: "grid",
                alignItems: "center",
                border: "1px solid #8080804d",
                borderRadius: "4px",
                padding: "5px 8px",
                margin: "0 5px",
                cursor:"pointer"
              }}
              >
              <Link href={path} locale="en">En</Link>
              </Box>
              <Box sx={{
                display: "grid",
                alignItems: "center",
                border: "1px solid #8080804d",
                borderRadius: "4px",
                padding: "5px 8px",
                margin: "0 5px",
                cursor:"pointer"
              }}>
              <Link href={path} locale="vi">Vi</Link>
              </Box>
          </Box>}
          {isMobile && token != null && (
            <Box
              // sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
            >
              
              <IconButton onClick={handleMobileMenuOpen}>
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorMobileMenu}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
              >
                {/* <Link href="/profile" passHref>
                  <MenuItem onClick={handleMobileMenuClose}>
                    {t?.profile}
                  </MenuItem>
                </Link> */}
                <Link href={`/investor_profile`} passHref>
                  <MenuItem
                    className={styles.account_menu_item}
                    onClick={handleAccountMenuClose}
                  >
                    {t?.investor_profile}
                  </MenuItem>
                </Link>
                <Link href={`/company_profile`} passHref>
                  <MenuItem
                    className={styles.account_menu_item}
                    onClick={handleAccountMenuClose}
                  >
                    {t?.company_profile}
                  </MenuItem>
                </Link>

                <MenuItem onClick={handleOpenDialog}>{t?.logout}</MenuItem>
              </Menu>
            </Box>
          )}
          {isMobile ? (
            <>
              <Drawer
                anchor="top"
                sx={{ width: 200 }}
                open={openDrawer}
                onClose={handleCloseDrawer}
                PaperProps={{
                  style: {
                    borderRadius: "0px",
                  },
                }}
              >
                <List>
                  {token != null
                    ? pages.sec1.map((page) => (
                        <Link href={page.path} key={page.name} passHref>
                          <ListItem
                            className={[
                              styles.navigation_item_mobile,
                              router.pathname == page.path &&
                                styles.active_page_mobile,
                            ]}
                            onClick={() => setOpenDrawer(false)}
                          >
                            {page.name}
                          </ListItem>
                        </Link>
                      ))
                    : pages.sec1
                        .filter((page) => page.isPrivate == false)
                        .map((page) => (
                          <Link key={page.name} href={page.path} passHref>
                            <ListItem
                              className={[
                                styles.navigation_item_mobile,
                                router.pathname == page.path &&
                                  styles.active_page_mobile,
                              ]}
                              onClick={() => setOpenDrawer(false)}
                            >
                              {page.name}
                            </ListItem>
                          </Link>
                        ))}
                  <Link href={"/blog"} passHref>
                    <ListItem
                      className={[
                        styles.navigation_item_mobile,
                        router.pathname == "/blog" && styles.active_page_mobile,
                      ]}
                      onClick={() => setOpenDrawer(false)}
                    >
                      {t?.blog}
                    </ListItem>
                  </Link>
                  <Link href={"/events"} passHref>
                    <ListItem
                      className={[
                        styles.navigation_item_mobile,
                        router.pathname == "/events" &&
                          styles.active_page_mobile,
                      ]}
                      onClick={() => setOpenDrawer(false)}
                    >
                      {t?.events}
                    </ListItem>
                  </Link>
                  <Link href={"/faq"} passHref>
                    <ListItem
                      className={[
                        styles.navigation_item_mobile,
                        router.pathname == "/faq" && styles.active_page_mobile,
                      ]}
                      onClick={() => setOpenDrawer(false)}
                    >
                      {t?.faq}
                    </ListItem>
                  </Link>
                  <Divider />
                  <Box>
                    {token != null
                      ? pages.sec2
                          .filter((page) => page.isPrivate == true)
                          .map((page) => (
                            <React.Fragment key={page.name}>
                              <Button
                                className={[
                                  isDesktop
                                    ? styles.navigation_item_lg
                                    : styles.navigation_item,
                                  router.pathname == page.path &&
                                    styles.active_page,
                                ]}
                                onClick={handleAccountMenuOpen}
                              >
                                <Box sx={{ display: "flex" }}>
                                  <Avatar
                                    className={styles.profile_avatar}
                                    // src="/images/profile.png"
                                    src={mediaBaseURL + user?.avatar?.url}
                                  />{" "}
                                  {user?.firstName?.slice(0, 10)}{" "}
                                  {user?.lastName?.slice(0, 10)}
                                </Box>
                              </Button>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorAccountEl}
                                open={isAccountOpen}
                                onClose={handleAccountMenuClose}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                {/* <Link href={`${page.path}`} passHref>
                                  <MenuItem
                                    className={styles.account_menu_item}
                                    onClick={handleAccountMenuClose}
                                  >
                                    {t?.profile}
                                  </MenuItem>
                                </Link> */}
                                <Link href={`/investor_profile`} passHref>
                                  <MenuItem
                                    className={styles.account_menu_item}
                                    onClick={handleAccountMenuClose}
                                  >
                                    {t?.investor_profile}
                                  </MenuItem>
                                </Link>
                                <Link href={`/company_profile`} passHref>
                                  <MenuItem
                                    className={styles.account_menu_item}
                                    onClick={handleAccountMenuClose}
                                  >
                                    {t?.company_profile}
                                  </MenuItem>
                                </Link>
                                <MenuItem
                                  className={styles.account_menu_item}
                                  onClick={handleOpenDialog}
                                >
                                  {t?.logout}
                                </MenuItem>
                              </Menu>
                              {/* <Dialog
                              // open={openDialog}
                              open={false}
                              onClose={handlecloseDialog}
                              maxWidth="xl"
                              sx={{zIndex:1000000}}
                            >
                              <DialogContent>{t?.sure_to_logout}</DialogContent>
                              <DialogActions>
                                <Button onClick={handlecloseDialog}>
                                  {t?.no}
                                </Button>
                                <Button onClick={handleLogout}>{t?.yes}</Button>
                              </DialogActions>
                            </Dialog> */}
                            </React.Fragment>
                          ))
                      : pages.sec2
                          .filter((page) => page.isPrivate == false)
                          .map((page) => (
                            <Link key={page.name} href={page.path} passHref>
                              <ListItem
                                className={[
                                  styles.navigation_item_mobile,
                                  router.pathname == page.path &&
                                    styles.active_page_mobile,
                                ]}
                              >
                                {page.name}
                              </ListItem>
                            </Link>
                          ))}
                  </Box>
                </List>
              </Drawer>
              <Dialog
                open={openDialog}
                //  open={true}
                onClose={handlecloseDialog}
                maxWidth="xl"
                sx={{ zIndex: 1000000 }}
              >
                <DialogContent>{t?.sure_to_logout}</DialogContent>
                <DialogActions>
                  <Button onClick={handlecloseDialog}>{t?.no}</Button>
                  <Button onClick={handleLogout}>{t?.yes}</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              <Box
                className={styles.navigation}
                sx={{
                  marginLeft: isDesktop ? 10 : 10,
                  display: { sm: "none", xs: "none" },
                }}
              >
                {token != null
                  ? pages.sec1.map((page) => (
                      <Box
                        key={page.name}
                        className={[
                          isDesktop
                            ? styles.navigation_item_lg
                            : styles.navigation_item,
                          router.pathname == page.path && styles.active_page,
                        ]}
                        color="primary"
                      >
                        <Link href={page.path}>{page.name}</Link>
                      </Box>
                    ))
                  : pages.sec1
                      .filter((page) => page.isPrivate == false)
                      .map((page) => (
                        <Box
                          key={page.name}
                          className={[
                            isDesktop
                              ? styles.navigation_item_lg
                              : styles.navigation_item,
                            router.pathname == page.path && styles.active_page,
                          ]}
                        >
                          <Link href={page.path}>{page.name}</Link>
                        </Box>
                      ))}
                <Button
                  className={[
                    isDesktop
                      ? styles.navigation_item_lg
                      : styles.navigation_item,
                  ]}
                  sx={{
                    fontSize: "18px",
                    padding: "0 15px",
                  }}
                  onClick={handleLearnPickerOpen}
                  // endIcon={<ArrowDownIcon />}
                  endIcon={<KeyboardArrowDown />}
                >
                  <Box sx={{ display: "flex" }}>{t?.learn}</Box>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorLearnPicker}
                  open={isLearnOpen}
                  onClose={handleLearnPickerClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link href={`/blog`} passHref>
                    <MenuItem
                      className={styles.account_menu_item}
                      onClick={handleLearnPickerClose}
                    >
                      {t?.blog}
                    </MenuItem>
                  </Link>
                  <Link href={`/events`} passHref>
                    <MenuItem
                      className={styles.account_menu_item}
                      onClick={handleLearnPickerClose}
                    >
                      {t?.events}
                    </MenuItem>
                  </Link>
                  <Link href={`/faq`} passHref>
                    <MenuItem
                      sx={{ width: "fit-content" }}
                      className={styles.account_menu_item}
                      onClick={handleLearnPickerClose}
                    >
                      {t?.faq}
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>
              <Box
                className={styles.navigation}
                sx={{ display: { xs: "none" } }}
              >
                {token != null
                  ? pages.sec2
                      .filter((page) => page.isPrivate == true)
                      .map((page) => (
                        <>
                          <Button
                            key={page.name}
                            className={[
                              isDesktop
                                ? styles.navigation_item_lg
                                : styles.navigation_item,
                              router.pathname == page.path &&
                                styles.active_page,
                            ]}
                            onClick={handleAccountMenuOpen}
                          >
                            <Box sx={{ display: "flex" }}>
                              <Avatar
                                className={styles.profile_avatar}
                                src={`${mediaBaseURL}${user?.avatar?.url}`}
                              />{" "}
                              {user?.firstName?.slice(0, 10)}{" "}
                              {user?.lastName?.slice(0, 10)}
                            </Box>
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorAccountEl}
                            open={isAccountOpen}
                            // open={false}
                            onClose={handleAccountMenuClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <Link href={`/investor_profile`} passHref>
                              <MenuItem
                                className={styles.account_menu_item}
                                onClick={handleAccountMenuClose}
                              >
                                {t?.investor_profile}
                              </MenuItem>
                            </Link>
                            <Link href={`/company_profile`} passHref>
                              <MenuItem
                                className={styles.account_menu_item}
                                onClick={handleAccountMenuClose}
                              >
                                {t?.company_profile}
                              </MenuItem>
                            </Link>
                            {/* <Link href={`${page.path}`} passHref>
                              <MenuItem
                                className={styles.account_menu_item}
                                onClick={handleAccountMenuClose}
                              >
                                {t?.profile}
                              </MenuItem>
                            </Link> */}
                            <MenuItem
                              className={styles.account_menu_item}
                              onClick={handleOpenDialog}
                            >
                              {t?.logout}
                            </MenuItem>
                          </Menu>
                          <Dialog
                            open={openDialog}
                            // open={true}
                            onClose={handlecloseDialog}
                            maxWidth="xl"
                          >
                            <DialogContent>{t?.sure_to_logout}</DialogContent>
                            <DialogActions>
                              <Button onClick={handlecloseDialog}>
                                {t?.no}
                              </Button>
                              <Button onClick={handleLogout}>{t?.yes}</Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      ))
                  : pages.sec2
                      .filter((page) => page.isPrivate == false)
                      .map((page) => (
                        <Box
                          key={page.name}
                          className={[
                            isDesktop
                              ? styles.navigation_item_lg
                              : styles.navigation_item,
                            router.pathname == page.path && styles.active_page,
                          ]}
                          variant={
                            page.path == "/sign_up" ? "outlined" : "text"
                          }
                        >
                          <Link href={page.path}>{page.name}</Link>
                        </Box>
                      ))}
              </Box>
              <Box
                sx={{
                  display: { md: "flex", xs: "none" },
                  flexGrow: 1,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  className={[
                    isDesktop
                      ? styles.navigation_item_lg
                      : styles.navigation_item,
                  ]}
                  onClick={handleLangPickerOpen}
                  // endIcon={<ArrowDownIcon />}
                  endIcon={<KeyboardArrowDown />}
                >
                  <Box
                    sx={{ display: "flex", fontSize: "18px" }}
                    className={styles.language_picker}
                  >
                    {locale == "en" ? (
                      <Box className={styles.language_item}>
                        {t.english}
                        <Image
                          src="/images/us.svg"
                          width={30}
                          height={30}
                          alt="US flag"
                          className={styles.flag_image}
                        />
                      </Box>
                    ) : (
                      <Box className={styles.language_item}>
                        {t.vietnamese}
                        <Image
                          src="/images/vi.svg"
                          width={30}
                          height={30}
                          alt="Vietename flag"
                          className={styles.flag_image}
                        />
                      </Box>
                    )}
                  </Box>
                </Button>
                <Menu
                  id="langu-picker-menu"
                  anchorEl={anchorLangPicker}
                  open={isLangPickerOpen}
                  onClose={handleLangPickerClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleLangPickerClose}>
                    <Link href={`${path}`} locale="vi" passHref>
                      <Box className={styles.language_item}>
                        {t?.vietnamese}
                        <Image
                          src="/images/vi.svg"
                          width={30}
                          height={30}
                          alt="US flag"
                          className={styles.flag_image}
                        />
                      </Box>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLangPickerClose}>
                    <Link href={`${path}`} locale="en" passHref>
                      <Box className={styles.language_item}>
                        {t?.english}
                        <Image
                          src="/images/us.svg"
                          width={30}
                          height={30}
                          alt="US flag"
                          className={styles.flag_image}
                        />
                      </Box>
                    </Link>
                  </MenuItem>
                </Menu>
                <Box component="form" onSubmit={handleSearchSubmit}>
                  <SearchInput value={query} onChange={handleSearchChange} />
                </Box>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
