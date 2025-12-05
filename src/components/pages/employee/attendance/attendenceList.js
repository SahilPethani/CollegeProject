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
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  EmployeeAttedanceTodayList,
  getDatailsEmployee,
} from "../../../services/Employee/Attendance";
import DialogForm from "../../../shared/Components/DialogForm";
import dayjs from "dayjs";
import Spinner from "../../../layout/spinner";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PunchClockTwoToneIcon from '@mui/icons-material/PunchClockTwoTone';

const AttendenceList = () => {
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDialogOutClose = () => setOpenDeleteDialog(false);
  const [attendencedetail, setAttendenceDetail] = useState({});

  const handleDialog = async (rowData) => {
    setLoading(true);
    dayjs(rowData.date).format("YYYY/MM/DD");
    const result = await getDatailsEmployee(employeeId, rowData.date);
    if (result.status === 200) {
      setLoading(false);
      setAttendenceDetail(result?.data?.AttendanceDetail);
      setOpenDeleteDialog(true);
    } else {
      setLoading(false);
    }
  };

  const employeeId = JSON.parse(
    window.localStorage.getItem("employeeDetail")
  )._id;

  // datagrid
  const Todayattendencelist = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "checkInTime",
      headerName: "Check-In",
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
      headerName: "Check-Out",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hoursWithbreak",
      headerName: "Hours",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "overtime",
      headerName: "OverTime",
      flex: 1,
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
          label={
            params.row?.type === "present"
              ? "Present"
              : params.row?.type === "holiday"
                ? "holiday"
                : params.row?.type
          }
          color={
            params.row?.type === "present"
              ? "success"
              : params.row?.type === "holiday"
                ? "primary"
                : "error"
          }
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
          label="View Attendence"
          showInMenu
          onClick={() => handleDialog(params.row)}
        />,
      ],
      align: "center",
    },
  ];
  const [todayAttendanceData, setTodayAttendanceData] = useState({
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

  const updateAttendanceGrid = (k, v) => {
    setTodayAttendanceData((prev) => ({ ...prev, [k]: v }));
  };

  const getAttendenceList = useCallback(async () => {
    updateAttendanceGrid("loading", true);
    const result = await EmployeeAttedanceTodayList({
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      employeeId: employeeId,
    });
    if (result?.status === 200) {
      updateAttendanceGrid("rows", result?.data.attendanceList);
      updateAttendanceGrid("totalRows", result?.data?.pagination?.total_items);
      updateAttendanceGrid("loading", false);
    } else {
      updateAttendanceGrid("rows", []);
      updateAttendanceGrid("totalRows", 0);
      updateAttendanceGrid("loading", false);
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    searchFilters.searchText,
  ]);

  useEffect(() => {
    getAttendenceList();
  }, [getAttendenceList]);
  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="Attendances"
          sub_page="Employee"
          curent_page="Attendances List"
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
              Attendence
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
              onClick={() => getAttendenceList()}
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
        <Box>
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
            getRowId={(row) => row.date}
            pageSizeOptions={[3, 10, 20]}
            rowCount={todayAttendanceData.totalRows}
            loading={todayAttendanceData.loading}
            rows={todayAttendanceData.rows}
            columns={Todayattendencelist}
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
        <Box className="employeelistpopup">
          <DialogForm
            scroll="paper"
            maxWidth="sm"
            className={"employeelistpopup"}
            title="Attendance Details"
            openDialog={openDeleteDialog}
            handleDialogClose={handleDialogOutClose}
            bodyContent={
              <Box sx={{ minHeight: "591px" }}>
                <Box sx={{ padding: "20px 24px 20px 24px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <EventNoteIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Typography sx={{ fontSize: "16px" }}>
                      {dayjs(attendencedetail?.today_activity?.date).format(
                        "DD/MM/YYYY"
                      )}
                    </Typography>
                    <Typography sx={{ fontSize: "16px", marginLeft: "30px" }}>
                      {attendencedetail?.type}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <AccessTimeTwoToneIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Typography sx={{ fontSize: "16px" }}>
                      {attendencedetail?.checkInTime}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <AccessAlarmTwoToneIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Typography sx={{ fontSize: "16px" }}>
                      {attendencedetail?.checkOutTime}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <PunchClockTwoToneIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Typography sx={{ fontSize: "16px" }}>
                      {attendencedetail?.hoursWithbreak}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <LocalCafeTwoToneIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Typography sx={{ fontSize: "16px" }}>
                      {attendencedetail?.totalBreakTime}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <MoreTimeIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Typography sx={{ fontSize: "16px" }}>
                      {attendencedetail?.overtime}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <VerifiedTwoToneIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Chip
                      sx={{ borderRadius: "10px", fontSize: "15px" }}
                      size="medium"
                      label={
                        attendencedetail?.present === true
                          ? "present"
                          : "Absent"
                      }
                      color={
                        attendencedetail?.present === true ? "success" : "error"
                      }
                      variant="filled"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // alignItems: "center",
                      marginTop: "30px",
                      color: "#00000099",
                    }}
                  >
                    <TextSnippetTwoToneIcon
                      sx={{ margin: "0 20px 0 10px" }}
                      className="icons-filtter"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {attendencedetail?.punches?.length > 0
                        ? attendencedetail?.punches.map((item) => (
                          <>
                            <Box
                              sx={{
                                position: "relative",
                                paddingLeft: "30px",
                              }}
                              className="punchin_line"
                            >
                              <Typography
                                color={"#212529"}
                                fontSize={"13px"}
                                fontWeight={600}
                              >
                                {item.type} at
                              </Typography>
                              <Typography
                                color={"#bbb"}
                                fontSize={"12px"}
                                fontWeight={600}
                                display={"flex"}
                                alignItems={"center"}
                                gap={"4px"}
                              >
                                <AccessTimeOutlinedIcon
                                  sx={{ color: "#bbb", fontSize: "14px" }}
                                />{" "}
                                {dayjs(
                                  item.type === "punchIn"
                                    ? item.punch_time
                                    : item.punch_time
                                ).format("h:mm A")}
                              </Typography>
                              <Typography
                                color={"#000"}
                                fontSize={"13px"}
                                fontWeight={500}
                                display={"flex"}
                                alignItems={"center"}
                                gap={"4px"}
                              >
                                - {item.note}
                              </Typography>
                              <Box
                                sx={{
                                  height: "6px",
                                  width: "6px",
                                  borderRadius: "9999px",
                                  backgroundColor: "#fff",
                                  border: "2px solid #ff9b44",
                                  position: "absolute",
                                  top: "0px",
                                  left: "0",
                                  zIndex: "10",
                                }}
                              ></Box>
                            </Box>
                          </>
                        ))
                        : "Punch Details is not available"}
                    </Box>
                  </Box>
                </Box>
              </Box>
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default AttendenceList;