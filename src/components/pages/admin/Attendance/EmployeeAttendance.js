import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { editAttendance, oneEmployeeAttendanceDetail } from "../../../services/Attendance";
import { useParams } from "react-router-dom";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import EditCalendarTwoToneIcon from "@mui/icons-material/EditCalendarTwoTone";
import { getDatailsEmployee } from "../../../services/Employee/Attendance";
import dayjs from "dayjs";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PunchClockTwoToneIcon from "@mui/icons-material/PunchClockTwoTone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DialogForm from "../../../shared/Components/DialogForm";
import FormikSelect from "../../../shared/material-ui-formik/FormikSelect";
import { Field, Formik } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Spinner from "../../../layout/spinner";
import { DatePicker } from "@mui/x-date-pickers";
import FormikInput from "../../../shared/material-ui-formik/FormikInput";
import toast from "react-hot-toast";

const EmployeeAttendance = () => {
  const Employeeid = useParams();
  const [loading, setLoading] = useState(false);
  const [employeeAttedance, setEmployeeAttedance] = useState([]);

  const getEmployeeAttedance = async () => {
    setLoading(true)
    const result = await oneEmployeeAttendanceDetail(Employeeid.id);
    if (result?.status === 200) {
      setEmployeeAttedance(result.data);
      setLoading(false)
    } else {
      console.error("Failed to fetch employee data");
      setLoading(false)
    }
  };
  useEffect(() => {
    getEmployeeAttedance();
  }, []);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDialogOutClose = () => setOpenDeleteDialog(false);
  const [attendencedetail, setAttendenceDetail] = useState({});
  const handleDialog = async (details) => {
    const date = dayjs(details).format("YYYY/MM/DD");
    const result = await getDatailsEmployee(Employeeid.id, date);
    if (result.status === 200) {
      setAttendenceDetail(result?.data);
      setOpenDeleteDialog(true);
    } else {
      setAttendenceDetail({});
    }
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleDialogCloseEdit = () => setOpenEditDialog(false);
  const [attendenceEdit, setattendenceEdit] = useState({});

  const handleEdit = async (details) => {
    const date = dayjs(details).format("YYYY/MM/DD");
    const result = await getDatailsEmployee(Employeeid.id, date);
    if (result.status === 200) {
      setattendenceEdit(result?.data);
      setOpenEditDialog(true);
    } else {
      setattendenceEdit({});
    }
  };

  const initialState = {
    date: attendenceEdit?.AttendanceDetail?.date,
    time: "",
    note: "",
    type: ""
  };

  const status = [
    {
      name: "Punch Out",
      value: "punchOut",
    },
    {
      name: "Break In",
      value: "breakIn",
    },
    {
      name: "Break Out",
      value: "breakOut",
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true)
    const body = {
      "date": dayjs(attendenceEdit?.AttendanceDetail?.date).format('YYYY-MM-DD'),
      "time": values.time,
      "note": values.note,
      "type": values.type
    }
    const result = await editAttendance(Employeeid.id, body)
    if (result.status === 200) {
      setLoading(false)
      setOpenEditDialog(false);
      getEmployeeAttedance()
      toast.success(result.message)
    } else {
      setLoading(false)
      toast.error(result.message)
    }
  }

  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="Employee Attendance"
          sub_page="Attendance"
          curent_page="Employee Attendance"
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
        <Box sx={{ padding: "15px" }}>
          <Box
            sx={{
              boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
              minHeight: "50px",
              marginBottom: "50px",
              borderRadius: "10px",
              border: "1px solid #f2f4f9",
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid #eee",
                padding: "20px",
                borderRadius: "0 .55rem 0 0",
              }}
            >
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "99999px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
                      }}
                    >
                      <img
                        src={employeeAttedance?.employee?.avatar}
                        alt=""
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        fontSize={"16px"}
                        fontWeight={"600"}
                        color={"#212529"}
                      >
                        Employee Name
                      </Typography>
                      <Typography color={"#434651"} fontSize={"14px"}>
                        {employeeAttedance?.employee?.firstName}{" "}
                        {employeeAttedance?.employee?.lastName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"16px"}
                      fontWeight={"600"}
                      color={"#212529"}
                    >
                      Employee ID
                    </Typography>
                    <Typography color={"#434651"} fontSize={"14px"}>
                      {employeeAttedance?.employee?.userId}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"16px"}
                      fontWeight={"600"}
                      color={"#212529"}
                    >
                      Joining Date
                    </Typography>
                    <Typography color={"#434651"} fontSize={"14px"}>
                      {employeeAttedance?.employee?.joiningDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"16px"}
                      fontWeight={"600"}
                      color={"#212529"}
                    >
                      Department
                    </Typography>
                    <Typography color={"#434651"} fontSize={"14px"}>
                      {employeeAttedance?.employee?.designation}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box
            sx={{
              boxShadow: "0 0 10px 0 rgba(183,192,206,.2)",
              minHeight: "50px",
              marginBottom: "24px",
              borderRadius: "10px",
              border: "1px solid #f2f4f9",
              padding: "15px",
            }}
          >
            <Box mb={"50px"}>
              <Grid container>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"1.75rem"}
                      fontWeight={"600"}
                      color={"#4caf50"}
                      textAlign={"center"}
                      marginBottom={"10px"}
                    >
                      {employeeAttedance?.totalPresentDays}
                    </Typography>
                    <Typography
                      color={"#434651"}
                      fontSize={"15px"}
                      textAlign={"center"}
                      marginBottom={"5px"}
                    >
                      Total Present Days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"1.75rem"}
                      fontWeight={"600"}
                      color={"#4caf50"}
                      textAlign={"center"}
                      marginBottom={"10px"}
                    >
                      {employeeAttedance?.totalAbsentDays}
                    </Typography>
                    <Typography
                      color={"#434651"}
                      fontSize={"15px"}
                      textAlign={"center"}
                      marginBottom={"5px"}
                    >
                      Total Absent Days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"1.75rem"}
                      fontWeight={"600"}
                      color={"#4caf50"}
                      textAlign={"center"}
                      marginBottom={"10px"}
                    >
                      {employeeAttedance?.totalHolidayDays}
                    </Typography>
                    <Typography
                      color={"#434651"}
                      fontSize={"15px"}
                      textAlign={"center"}
                      marginBottom={"5px"}
                    >
                      Total Holiday Days
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <Typography
                      fontSize={"1.75rem"}
                      fontWeight={"600"}
                      color={"#4caf50"}
                      textAlign={"center"}
                      marginBottom={"10px"}
                    >
                      {employeeAttedance?.totalHours}
                    </Typography>
                    <Typography
                      color={"#434651"}
                      fontSize={"15px"}
                      textAlign={"center"}
                      marginBottom={"5px"}
                    >
                      Total Hours
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box mt={2}>
              <TableContainer
                component={Paper}
                sx={{ borderRadius: "0", boxShadow: "none" }}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead
                    sx={{ backgroundColor: "#f5f5f5", height: "50px" }}
                  >
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Check In
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        break
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Check Out
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Working Hours
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Over-Time
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "500", textAlign: "center" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeeAttedance?.attendessdetail?.toReversed().map((attendesdata) => (
                      <>
                        <TableRow>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography fontWeight={600} fontSize={"14px"}>
                                {attendesdata?.date}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography fontWeight={600} fontSize={"14px"}>
                                {attendesdata?.checkInTime}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography fontWeight={600} fontSize={"14px"}>
                                {attendesdata?.totalBreakTime}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography fontWeight={600} fontSize={"14px"}>
                                {attendesdata?.checkOutTime}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography fontWeight={600} fontSize={"14px"}>
                                {attendesdata?.hoursWithbreak}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography fontWeight={600} fontSize={"14px"}>
                                {attendesdata?.overtime}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {attendesdata?.type === "present" ? (
                                <Chip
                                  label="Present"
                                  variant="outlined"
                                  color="success"
                                  sx={{ borderRadius: "10px" }}
                                />
                              ) : attendesdata?.type === "holiday" ? (
                                <Chip
                                  label="Holiday"
                                  variant="outlined"
                                  color="primary"
                                  sx={{ borderRadius: "10px" }}
                                />
                              ) : <Chip
                                label={attendesdata?.type}
                                variant="outlined"
                                color="error"
                                sx={{ borderRadius: "10px" }}
                              />}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                justifyContent: "center",
                              }}
                            >
                              <IconButton
                                onClick={() => handleDialog(attendesdata?.date)}
                              >
                                <ImportContactsTwoToneIcon
                                  titleAccess="View Attendance"
                                  sx={{ fontSize: "30px" }}
                                />
                              </IconButton>
                              {
                                attendesdata?.type === "present" && attendesdata?.checkOutTime === "00:00" &&
                                <IconButton
                                  onClick={() => handleEdit(attendesdata?.date)}
                                >
                                  <EditCalendarTwoToneIcon
                                    sx={{ fontSize: "30px" }}
                                  />
                                </IconButton>
                              }
                            </Box>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
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
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                    alignItems: "center",
                    marginTop: "10px",
                    color: "#00000099",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    Name : {attendencedetail?.employeeDetail?.first_name}{" "}
                    {attendencedetail?.employeeDetail?.last_name}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    userId : {attendencedetail?.employeeDetail?.user_id}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    Join Date :{" "}
                    {dayjs(attendencedetail?.employeeDetail?.join_date).format(
                      "YYYY/MM/DD"
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Mobile : {attendencedetail?.employeeDetail?.mobile}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {" "}
                    Designation :{" "}
                    {attendencedetail?.employeeDetail?.designation}
                  </Typography>
                </Box>
                <Divider sx={{ marginY: "20px" }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00000099",
                  }}
                >
                  <EventNoteIcon
                    sx={{ margin: "0 20px 0 10px" }}
                    className="icons-filtter"
                  />
                  <Typography sx={{ fontSize: "16px" }}>
                    {dayjs(
                      attendencedetail?.AttendanceDetail?.today_activity?.date
                    ).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", marginLeft: "30px" }}>
                    {attendencedetail?.AttendanceDetail?.type}
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
                    {attendencedetail?.AttendanceDetail?.checkInTime}
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
                    {attendencedetail?.AttendanceDetail?.checkOutTime}
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
                    {attendencedetail?.AttendanceDetail?.hoursWithbreak}
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
                    {attendencedetail?.AttendanceDetail?.totalBreakTime}
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
                    {attendencedetail?.AttendanceDetail?.overtime}
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
                      attendencedetail?.AttendanceDetail?.present === true
                        ? "present"
                        : "Absent"
                    }
                    color={
                      attendencedetail?.AttendanceDetail?.present === true
                        ? "success"
                        : "error"
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
                    {attendencedetail?.AttendanceDetail?.punches?.length > 0
                      ? attendencedetail?.AttendanceDetail?.punches.map(
                        (item) => (
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
                                {item.type === "punchIn"
                                  ? "Punch In"
                                  : "Punch Out"}{" "}
                                at
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
                        )
                      )
                      : "Punch Details is not available"}
                  </Box>
                </Box>
              </Box>
            </Box>
          }
        />
      </Box>
      <Box className="employeelistpopup">
        <DialogForm
          scroll="paper"
          maxWidth="sm"
          className={"employeelistpopup"}
          title="Add Attendance Details"
          openDialog={openEditDialog}
          handleDialogClose={handleDialogCloseEdit}
          bodyContent={
            <Box sx={{ minHeight: "301px" }}>
              <Box sx={{ padding: "20px 24px 20px 24px" }}>
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                >
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      {" "}
                      userId : {attendenceEdit?.employeeDetail?.user_id}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      Name : {attendenceEdit?.employeeDetail?.first_name}{" "}
                      {attendenceEdit?.employeeDetail?.last_name}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      {" "}
                      Mobile : {attendenceEdit?.employeeDetail?.mobile}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      Join Date :{" "}
                      {dayjs(attendenceEdit?.employeeDetail?.join_date).format(
                        "YYYY/MM/DD"
                      )}
                    </Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      {" "}
                      Designation : {attendenceEdit?.employeeDetail?.designation}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ marginY: "20px" }} />
                <Formik
                  initialValues={initialState}
                  onSubmit={handleSubmit}
                  validateOnBlur={false}
                  validateOnChange={true}
                  enableReinitialize={true}
                >
                  {(props) => {
                    const { handleSubmit } = props;
                    return (
                      <>
                        <form
                          onSubmit={handleSubmit}
                          noValidate
                        >
                          <Grid
                            container
                            spacing={2}
                            alignItems={"center"}
                          >
                            <Grid item lg={6} className="TimePicker">
                              <Field
                                label="Date"
                                name="date"
                                readOnly
                                component={FormikInput}
                              />
                            </Grid>
                            <Grid item lg={6} className="TimePicker">
                              <Typography
                                style={{
                                  marginBottom: "11px",
                                  color: "#1E1E1E",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                Select time
                              </Typography>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker"]}>
                                  <TimePicker
                                    label="Select Time"
                                    sx={{ overflow: "visible", width: "100%" }}
                                    onChange={(date) =>
                                      props.setFieldValue(
                                        "time",
                                        date ? dayjs(date).format("hh:mm A") : ""
                                      )
                                    }
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Grid>
                            <Grid item lg={12}>
                              <Typography
                                style={{
                                  marginBottom: "11px",
                                  color: "#1E1E1E",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                Select Type
                              </Typography>
                              <Field
                                label="Type"
                                name="type"
                                options={status?.map((type) => ({
                                  title: type.name,
                                  value: type.value,
                                }))}
                                component={FormikSelect}
                              />
                            </Grid>
                            <Grid item md={12} sx={{ gridAutoRows: "auto ,auto" }}>
                              <Field
                                label="Note"
                                name="note"
                                multiline
                                rows={2}
                                placeHolder="Enter note"
                                component={FormikInput}
                              />
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                              gap: "10px",
                              mt: "16px",
                            }}
                          >
                            <Button
                              component="label"
                              variant="contained"
                              size="medium"
                              type="submit"
                              sx={{ backgroundColor: "#3f51b5" }}
                              onClick={() => handleSubmit()}
                            >
                              Submit
                            </Button>
                          </Box>
                        </form>
                      </>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          }
        />
      </Box>
    </>
  );
};

export default EmployeeAttendance;
