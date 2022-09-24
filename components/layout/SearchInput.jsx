import { styled, alpha } from "@mui/system";
import { InputBase } from "@mui/material";

import { SearchIcon } from "../icons";
import { useTranslation } from "../../hooks";

const Search = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 50,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  // marginTop: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex:10,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  float: "left",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "0",
    backgroundColor: "#F5F5F5",
      // "&:hover": {
      //   width: "20ch",
      //   borderRadius: 5,
      //   height: 30,
      // },
    // },
  },
}));

const SearchInput = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t?.search}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
      />
    </Search>
  );
};

export default SearchInput;
