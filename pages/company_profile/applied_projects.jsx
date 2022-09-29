import styled from "@emotion/styled";
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuth, useMediaBreakpoints, useTranslation } from "../../hooks";
import { getAllCompanies } from "../../services";
import axiosInstance from "../../services/axiosWithAuth";
import { apiRoutes } from "../../utils/constants";
import CustomTable from "../../components/table/table";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AppliedProjects = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { isMobile } = useMediaBreakpoints();
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    rowsPerPage: 10,
  });
  const columns = [
    { id: t?.company_name, label: t?.company_name, minWidth: 170 },
    { id: t?.email, label: t?.email, minWidth: 100 },
    {
      id: t?.phone_number,
      label: t?.phone_number,
      minWidth: 170,
      align: "left",
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: t?.status,
      label: t?.status,
      minWidth: 170,
      align: "left",
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: t?.action,
      label: t?.action,
      minWidth: 170,
      align: "right",
      // format: (value) => value.toFixed(2),
    },
  ];
  const getAllProjects = async () => {
    const { data } = await axiosInstance.get(
      apiRoutes.companyUserAppliedProject +
        `?expand=logo_image,cover_image&page=${paginationState?.page}&page_size=${paginationState?.rowsPerPage}`
    );
    setIsLoading(false);
    return data;
  };
  const { data: raisedProjects, isLoading: loading } = useQuery(
    "userCreatedProjects",
    getAllProjects,
    {
      enabled: isLoading,
      refetchOnWindowFocus: false,
    }
  );
  // const { data: createdCompanies, isLoading: companyLoading } = useQuery(
  //   "userCreatedCompanies",
  //   getAllCompanies
  // );

  // const getUserRelatedCompany =  async () => {
  //     const {data} = await axiosInstance.get(apiRoutes.companyUserRelatedCompany
  //       + `?expand=cover_image,company_category,logo_image&fields=cover_image.url,company_category.name,logo_image.url,number_investors,investment_target,created_at,closing_date,collected_budget,id`)
  //     return data
  //   }

  //   const userRelatedCompany = useQuery("userRelatedCompany" , getUserRelatedCompany)
  console.log("raisedProjects", raisedProjects);
  // console.log("createdCompanies" , createdCompanies)

  const handleAddProject = (companyId) => {
    auth.setCompanyId(companyId);

    router.push("/company_profile/create_presentation/");
  };

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
    if (newPage === 0) return;
    setIsLoading(true);
    setPaginationState((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(+event.target.value);
    // setPage(0);
    setIsLoading(true);
    setPaginationState((prevState) => ({
      ...prevState,
      rowsPerPage: +event.target.value,
    }));
  };
  return (
    <Box>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <Paper
        sx={{
          width: "96%",
          overflow: "hidden",
          margin: "auto",
          padding: "0 1rem",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: "90vh",
            width: isMobile ? "96vw" : "100%",
            maxWidth: "100%",
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              width: isMobile ? "max-content" : "100%",
              overflowX: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {raisedProjects?.results
                // ?.slice(
                //   paginationState?.page * paginationState?.rowsPerPage,
                //   paginationState?.page * paginationState?.rowsPerPage +
                //     paginationState?.rowsPerPage
                // )
                ?.map((row) => {
                  console.log("row", row);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                      <TableCell component="th" scope="row">
                        {row?.companyName}
                      </TableCell>
                      <TableCell align="left">{row?.email}</TableCell>
                      <TableCell align="left">{row?.phoneNumber}</TableCell>
                      <TableCell align="left">{row?.status}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          sx={{
                            color: theme.palette.primary.dark,
                            fontSize: "10px",
                          }}
                          onClick={() => handleAddProject(row?.id)}
                        >
                          Add Presentation
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={raisedProjects?.count}
          rowsPerPage={paginationState?.rowsPerPage}
          page={paginationState?.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AppliedProjects;
