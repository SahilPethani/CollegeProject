import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BreakInAPI, BreakOutAPI, PunchInAPI, PunchOutAPI } from "../../../services/Employee/Dashboard";
import { toast } from "react-hot-toast";
import DialogForm from "../../../shared/Components/DialogForm";
import moment from 'moment-timezone';

const Timesheet = ({
  _id,
  todayAttendence,
  setLoading,
  getOneEmployeeAttendence,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDialogOutClose = () => setOpenDeleteDialog(false);
  const [punchType, setPunchType] = useState(false);
  const [breakType, setBreakType] = useState(false);
  const [note, SetNote] = useState("");

  const [fristPunchIn, setFristPunchIn] = useState("");
  const [fristPunchInTime, setFristPunchInTime] = useState("");

  useEffect(() => {
    let intervalId;

    const calculateTimeDifference = () => {
      if (fristPunchIn && fristPunchIn.punch_time) {
        const punchDate = moment(fristPunchIn.punch_time);
        const currentTime = moment();
        const timeDifference = currentTime.diff(punchDate);
        const breakTime = todayAttendence?.totalBreakTime;
        const [breakHours, breakMinutes] = (breakTime || "00h:00m").match(/\d+/g).map(Number);
        const breakTimeMilliseconds = (breakHours * 60 + breakMinutes) * 60000;
        const adjustedTimeDifference = timeDifference - breakTimeMilliseconds;

        const duration = moment.duration(adjustedTimeDifference);
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        const formattedTime = `${hours}:${minutes}:${seconds}`;
        setFristPunchInTime(formattedTime);

        if (breakType || !punchType) {
          clearInterval(intervalId);
        }
      } else {
        clearInterval(intervalId);
      }
    };

    calculateTimeDifference();
    intervalId = setInterval(calculateTimeDifference, 1000);

    return () => {
      clearInterval(intervalId);
    };

  }, [fristPunchIn, todayAttendence?.totalBreakTime, breakType]);

  useEffect(() => {
    if (todayAttendence) {
      const breaks = todayAttendence?.today_activity?.punches?.filter((punch) => punch?.type === "breakIn" || punch?.type === "breakOut");
      const lastBreak = breaks[breaks?.length - 1]

      const punchs = todayAttendence?.today_activity?.punches?.filter((punch) => punch?.type === "punchIn" || punch?.type === "punchOut");
      const lastPunch = punchs[punchs?.length - 1]

      if (lastBreak?.type === "breakOut") {
        setBreakType(false);
      } else if (lastBreak?.type === "breakIn") {
        setBreakType(true);
      } else {
        setBreakType(false);
      }

      if (punchs) {
        setFristPunchIn(punchs[0])
      }

      if (lastPunch?.type === "punchOut") {
        setPunchType(false);
      } else if (lastPunch?.type === "punchIn") {
        setPunchType(true);
      }
    } else {
      setBreakType(false);
      setPunchType(false);
    }

  }, [todayAttendence]);

  const handlePunchIn = async () => {
    setLoading(true);
    const result = await PunchInAPI(_id, note);
    if (result?.status === 200) {
      if (result?.success === false) {
        setOpenDeleteDialog(false);
        setLoading(false);
        toast.success(result?.message);
      } else {
        setLoading(false);
        getOneEmployeeAttendence();
        toast.success(result?.message);
        window.localStorage.setItem("punchtype", JSON.stringify(true));
        setPunchType(true); // Update punchType to true for Punch Out
        setOpenDeleteDialog(false);
      }
    } else {
      setOpenDeleteDialog(false);
      setLoading(false);
      toast.success(result?.message);
    }
  };

  const handlePunchOut = async () => {
    setLoading(true);
    if (breakType !== true) {
      const result = await PunchOutAPI(_id, note);
      if (result?.status === 200) {
        setLoading(false);
        getOneEmployeeAttendence();
        toast.success(result?.message);
        window.localStorage.setItem("punchtype", JSON.stringify(false));
        setPunchType(false); // Update punchType to false for Punch In
        setOpenDeleteDialog(false);
      } else {
        setOpenDeleteDialog(false);
        setLoading(false);
        toast.error(result?.message);
      }
    } else {
      setOpenDeleteDialog(false);
      setLoading(false);
      toast.error("add break out , after add punch Out");
    }
  };

  // heandlepunch
  const heandlepunch = async () => {
    if (punchType) {
      handlePunchOut();
    } else {
      handlePunchIn();
    }
  };

  const handleBreakIn = async () => {
    setLoading(true);
    if (punchType === true) {
      const result = await BreakInAPI(_id, note)
      if (result.status === 200) {
        setLoading(false);
        toast.success(result?.message);
        window.localStorage.setItem("breakType", JSON.stringify(true));
        getOneEmployeeAttendence();
        setBreakType(true)
      } else {
        setLoading(false);
        toast.error(result?.message);
      }
    } else {
      setLoading(false);
      toast.error("Employee hasn't punched in yet. Cannot perform break-in.");
    }
  }

  const handleBreakOut = async () => {
    setLoading(true);
    if (punchType === true) {
      const result = await BreakOutAPI(_id, note)
      if (result.status === 200) {
        setLoading(false);
        toast.success(result?.message);
        window.localStorage.setItem("breakType", JSON.stringify(false));
        getOneEmployeeAttendence();
        setBreakType(false)
      } else {
        setLoading(false);
        toast.error(result?.message);
      }
    } else {
      setLoading(false);
      toast.error("Employee hasn't punched in yet. Cannot perform break-Out.");
    }
  }

  return (
    <>
      <Box
        sx={{
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ededed",
          marginBottom: "30px",
          backgroundColor: "#FFFFFF",
          borderRadius: "0.375rem",
          height: '100%'
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Typography
            sx={{
              color: "#1f1f1f",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Timesheet
            <Typography
              sx={{
                color: "#8e8e8e",
                marginLeft: "5px",
                fontSize: ".875em",
              }}
              variant="span"
            >
              {dayjs(
                todayAttendence?.today_activity?.punches[0]?.type === "punchIn"
                  ? todayAttendence?.today_activity?.punches[0]?.punch_time
                  : new Date()
              ).format("DD MMM YYYY")}
            </Typography>
          </Typography>
          <Divider />
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #e3e3e3",
              borderRadius: "4px",
              marginBottom: "20px",
              marginTop: "10px",
              padding: "10px 15px",
            }}
          >
            <Typography variant="h6" fontSize={"12px"} fontWeight={500}>
              {todayAttendence?.today_activity?.punches[0]?.type === "punchIn"
                ? "Punch In at"
                : ""}
            </Typography>
            <Typography
              variant="p"
              fontSize={"14px"}
              color={"#727272"}
              fontWeight={"600"}
            >
              {dayjs(
                todayAttendence?.today_activity?.punches[0]?.type === "punchIn"
                  ? todayAttendence?.today_activity?.punches[0]?.punch_time
                  : new Date()
              ).format("ddd, DD MMM YYYY h:mm A")}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                border: "5px solid #e3e3e3",
                fontSize: "18px",
                height: "120px",
                width: "120px",
                marginX: "auto",
                borderRadius: "99999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "#212529", fontWeight: "600" }}>
                {/* 00:00:00 hrs */}
                {fristPunchInTime} hrs
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {
              punchType &&
              <Button
                sx={{
                  fontSize: "16px",
                  width: "150px",
                  height: "40px",
                  marginX: "auto",
                  color: "#fff",
                  fontWeight: "500",
                  backgroundColor: breakType ? "#C62828" : "#5668f3",
                  border: breakType ? "3px solid #C62828" : "3px solid #5668f3",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: breakType ? "#ff7b7b" : "#808fff",
                  },
                }}
                onClick={() => (breakType ? handleBreakOut() : handleBreakIn())}
              >
                {breakType ? "Break Out" : "Break In"}
              </Button>
            }
            {
              !breakType &&
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  width: "150px",
                  height: "40px",
                  marginX: "auto",
                  color: "#fff",
                  fontWeight: "500",
                  border: punchType ? "3px solid #C62828" : "3px solid #5668f3",
                  backgroundColor: punchType ? "#d32f2f" : "#5668f3",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: punchType ? "#ff7b7b" : "#808fff",
                  },
                }}
                onClick={() => (punchType ? setOpenDeleteDialog(true) : setOpenDeleteDialog(true))}
              >
                {punchType ? "Punch Out" : " Punch In"}
              </Button>
            }
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box
              sx={{
                width: "50%",
                paddingX: "12px",
                paddingY: "5px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                border: "1px solid #e3e3e3",
              }}
            >
              <Typography fontSize={"12px"} fontWeight={"500"}>
                Break
              </Typography>
              <Typography
                marginBottom={"0.5rem"}
                fontSize={"12px"}
                fontWeight={"600"}
              >
                {todayAttendence?.totalBreakTime ? todayAttendence?.totalBreakTime : "00:00"}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                paddingX: "12px",
                paddingY: "5px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                border: "1px solid #e3e3e3",
              }}
            >
              <Typography fontSize={"12px"} fontWeight={"500"}>
                Overtime
              </Typography>
              <Typography
                marginBottom={"0.5rem"}
                fontSize={"12px"}
                fontWeight={"600"}
              >
                {todayAttendence?.overtime ? todayAttendence?.overtime : "00:00"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <DialogForm
          scroll="paper"
          maxWidth="sm"
          className={"employeelistpopup"}
          title="Enter your Note"
          openDialog={openDeleteDialog}
          handleDialogClose={handleDialogOutClose}
          bodyContent={
            <Box>
              <Box sx={{ padding: "20px 24px 20px 24px" }}>
                <TextField
                  type="text"
                  fullWidth
                  label="Add Note"
                  placeholder="Enter your Note"
                  multiline
                  rows={3}
                  onChange={(e) => SetNote(e.target.value)}
                ></TextField>
                <Box
                  sx={{
                    marginTop: "24px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => heandlepunch()}
                    sx={{
                      color: "#3f51b5",
                      border: "1px solid #3f51b5",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      marginLeft: "20px !important",
                    }}
                  >
                    {!punchType ? "Punch In" : "Punch Out"}
                  </Button>
                  <Button
                    onClick={handleDialogOutClose}
                    variant="contained"
                    autoFocus
                    sx={{
                      backgroundColor: "#3f51b5",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      marginLeft: "20px !important",
                    }}
                  >
                    Cancle
                  </Button>
                </Box>
              </Box>
            </Box>
          }
        />
      </Box>
    </>
  );
};

export default Timesheet;
