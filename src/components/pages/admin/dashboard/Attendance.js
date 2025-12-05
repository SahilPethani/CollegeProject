import { Box, Chip, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import { getDatailsEmployee } from "../../../services/Employee/Attendance";
import dayjs from "dayjs";
import DialogForm from "../../../shared/Components/DialogForm";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PunchClockTwoToneIcon from '@mui/icons-material/PunchClockTwoTone';
import EventNoteIcon from "@mui/icons-material/EventNote";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { SendNotification } from "../../../services/auth";
import { toast } from "react-toastify";
const Attendance = (props) => {
  const theme = useTheme();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDialogOutClose = () => setOpenDeleteDialog(false);
  const [attendencedetail, setAttendenceDetail] = useState({});

  const handleDialog = async (details) => {
    const date = dayjs(details?.date).format("YYYY/MM/DD");
    const result = await getDatailsEmployee(details?.employee?._id, date);
    if (result.status === 200) {
      setAttendenceDetail(result?.data);
      setOpenDeleteDialog(true);
    } else {
      setAttendenceDetail({});
    }
  };

  const SendNotificationEmployee = async (user_id) => {
    const body = {
      user_id: user_id,
      // user_id: "JAV2002",
      title: "Add Punch In Today",
      body: "Add Punch In Today"
    }

    const result = await SendNotification(body)
    if (result.status === 200) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          maxHeight: "295px !important",
          overflow: "auto",
          "&>*:nth-of-type(odd)": {
            backgroundColor: "#ecf0f4",
          },
        }}
      >
        {props.tab === 1 &&
          props?.employeesummary
            ?.filter((items) => items.present === false)
            .map((details, index) => (
              <Grid
                container
                key={index}
                sx={{
                  paddingY: "5px",
                  borderRadius: "5px",
                  alignItems: "center",
                  [theme.breakpoints.up("xl")]: {
                    paddingX: "30px",
                  },
                }}
              >
                <Grid item lg={6} sm={5}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <Box sx={{ width: "60px", height: "60px" }}>
                      <img
                        src={details?.employee?.avatar}
                        alt=""
                        width={"100%"}
                        height={"100%"}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box>
                      <Typography color={"#000"} fontWeight={600}>
                        {details?.employee?.firstName}
                        {details?.employee?.lastName}
                      </Typography>
                      <Typography
                        color={"#000"}
                        fontWeight={500}
                        fontSize={"14px"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={"5px"}
                      >
                        <PersonIcon sx={{ color: "gray", fontSize: "20px" }} />{" "}
                        {details?.employee?.userId}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={3} sm={4}>
                  <Box
                    sx={{
                      maxWidth: "100%",
                      [theme.breakpoints.up("xl")]: {
                        minWidth: "130px",
                      },
                    }}
                  >
                    <Typography color={"gray"}>
                      Mo:- {details?.employee?.mobile}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={2} sm={2}>
                  <Box>
                    <Chip
                      label={details?.present === false && "Absent"}
                      color={details?.present === false && "error"}
                      variant="filled"
                      sx={{ borderRadius: "5px", cursor: "pointer" }}
                    />
                  </Box>
                </Grid>
                <Grid item sm={1}>
                  <Box>
                    <IconButton onClick={() => SendNotificationEmployee(details?.employee?.userId)}>
                      <SendTwoToneIcon titleAccess="Sent Notification"
                        sx={{ fontSize: "30px", cursor: "pointer" }} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            ))}

        {props.tab === 0 &&
          props?.employeesummary
            ?.filter((items) => items.present === true)
            .map((details, index) => (
              <Grid
                container
                key={index}
                sx={{
                  paddingX: "30px",
                  paddingY: "5px",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <Grid item lg={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <Box sx={{ width: "60px", height: "60px" }}>
                      <img
                        src={details?.employee?.avatar}
                        alt=""
                        width={"100%"}
                        height={"100%"}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box>
                      <Typography color={"#000"} fontWeight={600}>
                        {details?.employee?.firstName}
                        {details?.employee?.lastName}
                      </Typography>
                      <Typography
                        color={"#000"}
                        fontWeight={500}
                        fontSize={"14px"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={"5px"}
                      >
                        <PersonIcon sx={{ color: "gray", fontSize: "20px" }} />{" "}
                        {details?.employee?.userId}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box sx={{ minWidth: "130px" }}>
                    <Typography color={"gray"}>
                      Mo:- {details?.employee?.mobile}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Chip
                      label={details?.present === true && "Present"}
                      color={details?.present === true && "success"}
                      variant="filled"
                      sx={{ borderRadius: "5px" }}
                    />
                  </Box>
                </Grid>
                <Grid item lg={1}>
                  <Box>
                    <IconButton onClick={() => handleDialog(details)}>
                      <ImportContactsTwoToneIcon titleAccess="View Attendance" sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            ))}
        <Grid
          container
          sx={{
            paddingX: "30px",
            paddingY: "5px",
            borderRadius: "5px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography color={"#000"} fontWeight={700}>
                No Data Found
              </Typography>
            </Box>
          </Box>
        </Grid>
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
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                >
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      {" "}
                      userId : {attendencedetail?.employeeDetail?.user_id}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      Name : {attendencedetail?.employeeDetail?.first_name} {attendencedetail?.employeeDetail?.last_name}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      {" "}
                      Mobile : {attendencedetail?.employeeDetail?.mobile}
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      Join Date :{" "}
                      {attendencedetail?.employeeDetail?.join_date}
                    </Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                      {" "}
                      Designation : {attendencedetail?.employeeDetail?.designation}
                    </Typography>
                  </Grid>
                </Grid>
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
                    {dayjs(attendencedetail?.AttendanceDetail?.today_activity?.date).format(
                      "DD/MM/YYYY"
                    )}
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
                      attendencedetail?.AttendanceDetail?.present === true ? "success" : "error"
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
                      ? attendencedetail?.AttendanceDetail?.punches.map((item) => (
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
                              {dayjs(item.punch_time).format("h:mm A")}
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
    </>
  );
};

export default Attendance;
