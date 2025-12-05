import { Box, Chip, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AllHoliday, deleteHoliday } from "../../../services/Holiday";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ConfirmDialog from "../../../shared/Components/ConfirmDialog";
import dayjs from "dayjs";
import Spinner from "../../../layout/spinner";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { Routing } from "../../../shared/routing";

const AllHolidays = () => {
  // datagrid
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [employeeDataGrid, setEmployeeDataGrid] = useState({
    loading: false,
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

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const [deleteholidayId, setdeleteholidayId] = useState(0);
  const handleConfirmDeletection = async () => {
    setLoading(true);
    setOpenDeleteDialog(false);
    const result = await deleteHoliday(deleteholidayId);
    if (result?.status === 200) {
      toast.success(result.message);
      setLoading(false);
      getHoliday();
    } else if (result === undefined) {
      toast.error(result.message);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  const deleteDialog = useCallback(
    (id) => () => {
      setdeleteholidayId(id);
      setOpenDeleteDialog(true);
    },
    []
  );

  const editHoliday = useCallback((id) => () => {
    navigate(`/admin/holiday/edit/${id}`);
  });

  const updateEmployeeDataGrid = (k, v) => {
    setEmployeeDataGrid((prev) => ({ ...prev, [k]: v }));
  };

  const getHoliday = useCallback(async () => {
    updateEmployeeDataGrid("loading", true);
    const result = await AllHoliday({
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search_text: searchFilters.searchText,
    });
    if (result?.status === 200) {
      updateEmployeeDataGrid("rows", result.data);
      updateEmployeeDataGrid("totalRows", result.pagination.total_items);
      updateEmployeeDataGrid("loading", false);
    } else {
      updateEmployeeDataGrid("rows", []);
      updateEmployeeDataGrid("totalRows", 0);
      updateEmployeeDataGrid("loading", false);
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    searchFilters.searchText,
  ]);

  useEffect(() => {
    getHoliday();
  }, [getHoliday]);

  // datagrid

  const addOnDatagridColumns = [
    {
      field: "holiday_no",
      headerName: "No",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "holiday_name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "holiday-date",
      headerName: "Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => {
        const currentDate = dayjs(params.row.holiday_date);
        // const nextDate = currentDate.subtract(1, "day");
        return `${currentDate.format("DD-MM-YYYY")}`;
      },
    },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Show Employee",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          sx={{ borderRadius: "8px", fontSize: "14px" }}
          label={params?.value === 1 ? "Yes" : "No "}
          color={params?.value === 1 ? "success" : "error"}
          size="medium"
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          label={"Edit"}
          showInMenu
          onClick={editHoliday(params.id)}
        />,

        <GridActionsCellItem
          label={"Delete"}
          showInMenu
          onClick={deleteDialog(params.id)}
        />,
      ],
      align: "center",
    },
  ];

  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="All Holiday"
          sub_page="Holidays"
          curent_page="All Holiday"
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
              Holiday
            </Typography>
            <TextField
              size="small"
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
          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconButton
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

              onClick={() => navigate(Routing.AddHoliday)}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton
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
              onClick={() => getHoliday()}
            >
              <RefreshIcon fontSize="inherit" />
            </IconButton>
          </Box>
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
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "0",
              },
            }}
            density="compact"
            // autoHeight
            disableColumnMenu
            rowHeight={70}
            enableCellSelect={true}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            rowCount={employeeDataGrid.totalRows}
            loading={employeeDataGrid.loading}
            rows={employeeDataGrid.rows}
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
        <ConfirmDialog
          scroll="paper"
          maxWidth="sm"
          title="Are you sure?"
          message="Do you really want to delete the holiday data?"
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          openDialog={openDeleteDialog}
          handleDialogClose={handleCloseDeleteDialog}
          handleDialogAction={handleConfirmDeletection}
        />
      </Box>
    </>
  );
};

export default AllHolidays;
