import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { allEmployeeAttedance } from "../../../services/Attendance";
import RefreshIcon from "@mui/icons-material/Refresh";

const TodayAttendance = () => {
  // datagrid
  const addOnDatagridColumns = [
    {
      field: "avatar",
      headerName: "Image",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={params?.value}
          style={{
            width: "45px",
            height: "45px",
            // borderRadius: "999px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: "checkInTime",
      headerName: "First In",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalBreakTime",
      headerName: "Break",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "checkOutTime",
      headerName: "Last Out",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hoursWithbreak",
      headerName: "Total",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "present",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          sx={{ borderRadius: "8px", fontSize: "14px" }}
          label={params?.value ? "Present" : "Absent"}
          color={params?.value ? "success" : "error"}
          size="medium"
          variant="outlined"
        />
      ),
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const [employeeAttendanceDataGrid, setEmployeeAttendanceDataGrid] = useState({
    // loading: false,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50, 100],
    pageSize: 10,
    page: 1,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [searchFilters, setSearchFilters] = useState({
    searchText: "",
  });

  const handleAddOnSearch = (event) => {
    const { value } = event.target;
    if (value.length > 1) {
      setSearchFilters((prev) => ({
        ...prev,
        searchText: value,
      }));
    } else if (value.length == 0) {
      setSearchFilters((prev) => ({
        ...prev,
        searchText: value,
      }));
    }
  };

  const updateEmployeeAttendanceDataGrid = (k, v) => {
    setEmployeeAttendanceDataGrid((prev) => ({ ...prev, [k]: v }));
  };

  const getEmployeeAttence = useCallback(async () => {
    updateEmployeeAttendanceDataGrid("loading", true);
    const result = await allEmployeeAttedance({
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search_text: searchFilters.searchText,
      search_text: searchFilters.searchText,
    });
    if (result?.status === 200) {
      updateEmployeeAttendanceDataGrid("rows", result.data);
      updateEmployeeAttendanceDataGrid(
        "totalRows",
        result.pagination.total_items
      );
      updateEmployeeAttendanceDataGrid("loading", false);
    } else {
      updateEmployeeAttendanceDataGrid("rows", []);
      updateEmployeeAttendanceDataGrid("totalRows", 0);
      updateEmployeeAttendanceDataGrid("loading", false);
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    searchFilters.searchText,
  ]);

  useEffect(() => {
    getEmployeeAttence();
  }, [getEmployeeAttence]);

  return (
    <>
      <Box>
        <Breadcrumb
          title="Today Attendance"
          sub_page="Attendance"
          curent_page="Today"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "50px",
          position: "relative",
          borderRadius: "10px",
          marginBottom: "24px",
          boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
        }}
      >
        <Box>
          <Box
            sx={{
              backgroundColor: "#dae1f3",
              height: "60px",
              px: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography sx={{ fontWeight: "600", color: "#5b626b" }}>
                Attendance
              </Typography>
              <TextField
                size="small"
                onChange={(event) => {
                  handleAddOnSearch(event);
                }}
                variant="outlined"
                placeholder="search"
                sx={{
                  backgroundColor: "#fff",
                  height: "45px",
                  fontSize: "14px",
                  borderRadius: "4px",
                }}
                InputProps={{
                  sx: {
                    border: "none",
                    height: "45px",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <IconButton
              onClick={() => getEmployeeAttence()}
              aria-label="delete"
              size="medium"
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                boxShadow:
                  "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  boxShadow:
                    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <RefreshIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box sx={{ p: "20px" }}>
            <DataGrid
              sx={{
                border: "0",
                fontSize: "14px",
                "& .MuiDataGrid-columnHeader": {
                  color: "#000",
                  fontSize: "14px ",
                  minHeight: "49px !important",
                  fontWeight: "bold !important",
                },
                "& .MuiDataGrid-columnHeaders": {
                  maxHeight: "59px !important",
                  backgroundColor: "",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "0",
                },
              }}
              density="compact"
              // autoHeight
              disableColumnMenu
              rowHeight={85}
              enableCellSelect={true}
              getRowId={(row) => row._id}
              pageSizeOptions={[3, 10, 20]}
              rowCount={employeeAttendanceDataGrid.totalRows}
              loading={employeeAttendanceDataGrid.loading}
              rows={employeeAttendanceDataGrid.rows}
              columns={addOnDatagridColumns}
              paginationModel={paginationModel}
              paginationMode="server"
              checkboxSelection={true}
              onPaginationModelChange={(newPage) => {
                setPaginationModel({
                  page: newPage.page,
                  pageSize: newPage.pageSize,
                });
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TodayAttendance;
