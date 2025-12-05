import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import Spinner from "../../../layout/spinner";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { deleteLeaveData, getAllleaveData } from "../../../services/Employee/Leave";
import dayjs from "dayjs";
import ConfirmDialog from "../../../shared/Components/ConfirmDialog";
import toast from "react-hot-toast";
import { Routing } from "../../../shared/routing";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Leave = () => {
  const navigate = useNavigate();

  const employeeId = JSON.parse(
    window.localStorage.getItem("employeeDetail")
  )._id;

  const [leaveDataGrid, setLeaveDataGrid] = useState({
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

  const updateLeaveDataGrid = (k, v) => {
    setLeaveDataGrid((prev) => ({ ...prev, [k]: v }));
  };

  const getAllLeaves = useCallback(async () => {
    updateLeaveDataGrid("loading", true);
    const result = await getAllleaveData({
      id: employeeId,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    });
    if (result?.status === 200) {
      updateLeaveDataGrid("rows", result.data.reverse());
      updateLeaveDataGrid("totalRows", result.pagination.total_items);
      updateLeaveDataGrid("loading", false);
    } else {
      updateLeaveDataGrid("rows", []);
      updateLeaveDataGrid("totalRows", 0);
      updateLeaveDataGrid("loading", false);
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  useEffect(() => {
    getAllLeaves();
  }, [getAllLeaves]);

  const leaveDatagridColumns = [
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => `${dayjs(params.row.date).format('DD-MMM-YYYY')}`,

    },
    {
      field: "type",
      headerName: "Leave Type ",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => `${params.row.type ? params.row.type : "-"}`,
    },
    {
      field: "one_day_leave_type",
      headerName: "One Day Leave Type",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => `${params.row.one_day_leave_type ? params.row.one_day_leave_type : "-"}`,
    },
    {
      field: "hours",
      headerName: "Hours",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => `${params.row.hours ? params.row.hours : "-"}`,
    },
    {
      field: "fromDate",
      headerName: "From Date",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => `${dayjs(params.row.fromDate).format('DD-MMM-YYYY')}`,
    },
    {
      field: "toDate",
      headerName: "To Date",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueGetter: (params) => `${dayjs(params.row.toDate).format('DD-MMM-YYYY')}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          color={params?.row.status === "Pending" ? "#F7D636" : params?.row.status === "Approved" ? "green" : "red"}
        >
          {params?.row.status}
        </Typography>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      headerAlign: "left",
      flex: 1,
      align: "left",
      getActions: (params) =>
        params?.row.status === "Pending" ? [
          <GridActionsCellItem
            label={"Delete"}
            showInMenu
            onClick={deleteDialog(params.id)}
          />,
        ] : [],
      align: "center",
    },
  ];


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const [deleteLeaveId, setDeleteLeaveId] = useState(0);
  const handleConfirmDeletection = async () => {
    setLoading(true);
    setOpenDeleteDialog(false);
    const result = await deleteLeaveData(deleteLeaveId);
    if (result?.status === 200) {
      setLoading(false);
      toast.success(result.message);
      getAllLeaves();
    } else if (result === undefined) {
      setLoading(false);
      toast.error(result.message);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  const deleteDialog = useCallback(
    (id) => () => {
      setDeleteLeaveId(id);
      setOpenDeleteDialog(true);
    },
    []
  );


  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb title="My Leaves" sub_page="My Leave" curent_page="Leave" />
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "50px",
          position: "relative",
          borderRadius: "10px",
          marginBottom: "24px",
          boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
          zIndex: "999",
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
              My Leaves
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
              onClick={() => navigate(Routing.AddLeave)}
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
              <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => getAllLeaves()}
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
        </Box>
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
          enableCellSelect={false}
          getRowId={(row) => row._id}
          pageSizeOptions={[3, 10, 20]}
          rowCount={leaveDataGrid.totalRows}
          loading={leaveDataGrid.loading}
          rows={leaveDataGrid.rows}
          columns={leaveDatagridColumns}
          paginationModel={paginationModel}
          paginationMode="server"
          disableRowSelectionOnClick
          checkboxSelection={false}
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
        title="Confirm The Action"
        message="Do you really want to delete the Leave data?"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        openDialog={openDeleteDialog}
        handleDialogClose={handleCloseDeleteDialog}
        handleDialogAction={handleConfirmDeletection}
      />

    </>
  );
};

export default Leave;
