import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import VerticalStepper from "./VerticalStepper";
import Timesheet from "./Timesheet";
import Statistics from "./Statistics";
import { oneEmployeeTodayAttendance } from "../../../services/Attendance";
import Spinner from "../../../layout/spinner";
import EmployeeCard from "./EmployeeCard";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PanToolIcon from "@mui/icons-material/PanTool";
import { getDashbordData } from "../../../services/Employee/Dashboard";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../../../services/Employee/note";

const Employeedashboard = () => {
  const navigate = useNavigate();

  const [todayAttendence, setTodayAttendance] = useState("");
  const [notes, setNote] = useState([]);
  const [dashbordDetail, setDashbordDetail] = useState({
    totalAbsentDays: "",
    totalPresentDays: "",
    totalHolidayDays: "",
    totalHours: "",
  });
  const [todayPunchice, setTodayPunchice] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOneEmployeeAttendence();
    getDashbordDetail();
    getNotesList();
  }, []);

  const card = [
    {
      Backgroundcolor: "linear-gradient(to right, #664dc9, #9884ea)!important",
      name: "Total Present Day",
      value: dashbordDetail.totalPresentDays,
      Icon: <TouchAppIcon sx={{ fontSize: "40px", color: "#fff" }} />,
    },
    {
      Backgroundcolor: "linear-gradient(to right,#1d976c,#2fd38a)",
      name: "Total Absent Day",
      value: dashbordDetail.totalAbsentDays,
      Icon: <AddTaskIcon sx={{ fontSize: "40px", color: "#fff" }} />,
    },
    {
      Backgroundcolor: "linear-gradient(to right,#f6a800,#fa5420)",
      name: "Total HoliDay",
      value: dashbordDetail.totalHolidayDays,
      Icon: <PanToolIcon sx={{ fontSize: "40px", color: "#fff" }} />,
    },
    {
      Backgroundcolor: "linear-gradient(to right,#5b73e8,#44c4fa)",
      name: "Total Hours",
      value: dashbordDetail.totalHours,
    },
  ];

  const employeeDetail = JSON.parse(
    window.localStorage.getItem("employeeDetail")
  );

  const getOneEmployeeAttendence = async () => {
    setLoading(true);
    const result = await oneEmployeeTodayAttendance(employeeDetail?._id);
    if (result?.status === 200) {
      setLoading(false);
      if (result?.data?.punches) {
        setTodayAttendance("");
      } else {
        setTodayAttendance(result.data);
        setTodayPunchice(result?.data?.today_activity?.punches);
      }
    } else {
      setLoading(false);
    }
  };

  const getDashbordDetail = async () => {
    const result = await getDashbordData(employeeDetail?._id);
    if (result?.status === 200) {
      setDashbordDetail({
        totalAbsentDays: result.data.totalAbsentDays,
        totalPresentDays: result.data.totalPresentDays,
        totalHolidayDays: result.data.totalHolidayDays,
        totalHours: result.data.totalHours,
      });
    } else {
      setDashbordDetail({
        totalAbsentDays: "",
        totalPresentDays: "",
        totalHolidayDays: "",
        totalHours: "",
      });
    }
  };

  const getNotesList = async () => {
    const result = await getNotes({
      show_dash: 1,
      status: 1,
      page: "",
      pageSize: "",
    });
    if (result?.status === 200) {
      setNote(result.data);
    } else {
      setNote([]);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div>
        <Box>
          <Breadcrumb
            title="Employee Dashboard"
            sub_page="Home"
            curent_page="Dashboard"
          />
        </Box>

        <Grid container spacing={"24px"} zIndex={"-1"} position={"relative"}>
          {card.map((card_details, index) => (
            <Grid item lg={6}>
              <EmployeeCard
                Backgroundcolor={card_details.Backgroundcolor}
                name={card_details.name}
                value={card_details.value}
                Icon={card_details.Icon}
              />
            </Grid>
          ))}
        </Grid>

        <Box>
          <Grid container spacing={"24px"} position={"relative"}>
            <Grid
              item
              lg={6}
              sx={{
                height: "520px",
              }}
            >
              <Timesheet
                _id={employeeDetail?._id}
                todayAttendence={todayAttendence}
                loading={loading}
                setLoading={setLoading}
                getOneEmployeeAttendence={getOneEmployeeAttendence}
              />
            </Grid>
            <Grid
              item
              lg={6}
              sx={{
                height: "520px",
              }}
            >
              <Box
                sx={{
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ededed",
                  marginBottom: "30px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0.375rem",
                  height: "100%",
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
                    Today Activity
                  </Typography>
                  <Divider />
                  <VerticalStepper
                    _id={employeeDetail?._id}
                    todayAttendence={todayAttendence}
                    todayPunchice={todayPunchice}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={12}
              sx={{
                height: "200px",
              }}
            >
              <Box
                sx={{
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ededed",
                  marginBottom: "30px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0.375rem",
                  height: "100%",
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
                    HoliDay List
                  </Typography>
                  <Divider />
                  <Statistics />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {notes.length > 0 && (
          <Grid container mt="24px">
            <Grid item lg={12}>
              <Box
                sx={{
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ededed",
                  marginBottom: "24px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px #00000026",
                  background: "transparent",
                  padding: "10px",
                }}
              >
                {notes.map((note) => (
                  <>
                    <Box
                      sx={{
                        cursor: "pointer",
                        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                        border: "1px solid #ededed",
                        borderRadius: "5px",
                        boxShadow: "0 0 10px #00000026",
                        background: "#fff",
                        padding: "20px",
                      }}
                      onClick={() => navigate(`/notes/${note._id}`)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          fontSize={"16px"}
                          color="red"
                          fontWeight={500}
                          letterSpacing={"1.5px"}
                        >
                          {note.title}
                        </Typography>
                        <Typography
                          fontSize={"16px"}
                          color="#000"
                          fontWeight={500}
                          letterSpacing={"1.5px"}
                        >
                          {dayjs(note.date).format("ddd, DD MMM YYYY h:mm A")}
                        </Typography>
                      </Box>
                      <Typography
                        fontSize={"14px"}
                        color={"#000"}
                        fontWeight={500}
                        letterSpacing={"1px"}
                      >
                        {note.note_detail}
                      </Typography>
                    </Box>
                  </>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default Employeedashboard;
