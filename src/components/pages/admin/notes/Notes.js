import React, { useCallback, useEffect, useState } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import {
  changeNoteStatus,
  deleteNote,
  getNotes,
} from "../../../services/Employee/note";
import dayjs from "dayjs";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Routing } from "../../../shared/routing";
import Spinner from "../../../layout/spinner";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../shared/Components/ConfirmDialog";

const Notes = () => {
  const navigate = useNavigate();

  const [notesDataGrid, setNotesDataGrid] = useState({
    loading: false,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50, 100],
    pageSize: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const updateNotesDataGrid = (k, v) => {
    setNotesDataGrid((prev) => ({ ...prev, [k]: v }));
  };

  const getAllNotes = useCallback(async () => {
    updateNotesDataGrid("loading", true);
    const result = await getNotes({
      show_dash: "",
      status: "",
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    });
    if (result?.status === 200) {
      updateNotesDataGrid("rows", result.data);
      updateNotesDataGrid("totalRows", result.pagination.totalNotes);
      updateNotesDataGrid("loading", false);
    } else {
      updateNotesDataGrid("rows", []);
      updateNotesDataGrid("totalRows", 0);
      updateNotesDataGrid("loading", false);
    }
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const notesDatagridColumns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) =>
        `${dayjs(params.row.date).format("ddd, DD MMM YYYY h:mm A")}`,
    },
    {
      field: "note_detail",
      headerName: "Note Detail",
      flex: 1,
    },
    {
      field: "toatal_comments",
      headerName: "Toatal Comments",
      flex: 1,
      valueGetter: (params) => params.row.comments.length,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          sx={{ borderRadius: "8px", fontSize: "14px" }}
          label={params?.value === 1 ? "Active" : "Inactive "}
          color={params?.value === 1 ? "success" : "error"}
          size="medium"
          variant="outlined"
        />
      ),
    },
    {
      field: "show_dash",
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
      type: "actions",
      headerName: "Action",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          label={"View"}
          showInMenu
          onClick={viewDetail(params.id)}
        />,
        <GridActionsCellItem
          label={"Edit"}
          showInMenu
          onClick={editDetail(params.id)}
        />,
        <GridActionsCellItem
          label={"Change Status"}
          showInMenu
          onClick={changeStatus(params.id)}
        />,
        <GridActionsCellItem
          label={"Delete"}
          showInMenu
          onClick={deleteDialog(params.id)}
        />,
      ],
    },
  ];

  const viewDetail = useCallback(
    (id) => () => {
      navigate(`/notes/${id}`);
    },
    []
  );

  const editDetail = useCallback(
    (id) => () => {
      navigate(`/admin/note/edit/${id}`);
    },
    []
  );

  const changeStatus = useCallback(
    (id) => async () => {
      setLoading(true);
      const result = await changeNoteStatus(id);
      if (result?.status === 200) {
        setLoading(false);
        getAllNotes();
        toast.success(result.message);
      } else {
        console.error("Failed to fetch Holiday data");
        toast.success(result.message);
        setLoading(false);
      }
    },
    []
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const [deleteHolidayId, setdeleteNoteId] = useState(0);
  const handleConfirmDeletection = async () => {
    setLoading(true);
    setOpenDeleteDialog(false);
    const result = await deleteNote(deleteHolidayId);
    if (result?.status === 200) {
      toast.success(result.message);
      setLoading(false);
      getAllNotes();
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
      setdeleteNoteId(id);
      setOpenDeleteDialog(true);
    },
    []
  );

  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb title="Notes" sub_page="Notes" curent_page="Notes" />
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
              Notes
            </Typography>
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
              onClick={() => navigate(Routing.AddNotes)}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => getAllNotes()}
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
          getRowId={(row) => row._id}
          pageSizeOptions={[3, 10, 20]}
          rowCount={notesDataGrid.totalRows}
          loading={notesDataGrid.loading}
          rows={notesDataGrid.rows}
          columns={notesDatagridColumns}
          paginationModel={paginationModel}
          paginationMode="server"
          disableRowSelectionOnClick
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
        message="Do you really want to delete the Note data?"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        openDialog={openDeleteDialog}
        handleDialogClose={handleCloseDeleteDialog}
        handleDialogAction={handleConfirmDeletection}
      />
    </>
  );
};

export default Notes;
