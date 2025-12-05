import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import AdminCard from "./Card";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import ApexColumnBarChart from "./Adminchart";
import Attendance from "./Attendance";
import { getDashbordCount, getemployeesummary } from "../../../services/dashboard";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../../firebase";

const Admindashboard = () => {

  const [employeesummary, setEmployeesummary] = useState([]);
  const [value, onChange] = useState(new Date());
  const [tab, setTab] = useState(0);
  const [count, setCount] = useState({
    absentCount: 0,
    active: 0,
    createEmployee: 0,
    createUser_employee: 0,
    inActive: 0,
    presentCount: 0,
    totalEmployees: 0,
  });

  const card = [
    {
      className: "bg-Icon",
      Backgroundcolor:
        "linear-gradient(135deg,#23bdb8 0,#65a986 100%)!important",
      name: "Today Present",
      value: count.presentCount,
    },
    {
      className: "bg-User",
      Backgroundcolor: "linear-gradient(135deg,#289cf5,#4f8bb7)!important",
      name: "Total Employee / User",
      value: count.totalEmployees,
    },
    {
      className: "bg-Absant",
      Backgroundcolor:
        "linear-gradient(135deg,#f48665 0,#d68e41 100%)!important",
      name: "Total Leave",
      value: count.leaveCounts,
    },
    {
      className: "bg-Absant",
      Backgroundcolor:
        "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)!important",
      name: "Today Absent",
      value: count?.absentCount,
    },
  ];

  const handleTabs = (number) => {
    setTab(number);
  };

  const getCount = async () => {
    const result = await getDashbordCount()
    if (result?.status === 200) {
      setCount(result?.data)
    } else {
      setCount("")
    }
  }

  useEffect(() => {
    getCount()
  }, [])

  const getEmployeeSummary = async (date) => {
    const result = await getemployeesummary(date);
    if (result?.status === 200) {
      setEmployeesummary(result?.data?.employeeAttendanceSummary);
    } else {
      setEmployeesummary([]);
    }
  };

  const handleChange = (e) => {
    getEmployeeSummary(
      new Date(
        e.toString().slice(0, 16) + "23:59:59 GMT+0530 (India Standard Time)"
      )
        .toISOString()
        .slice(0, 10)
    );
  };
  useEffect(() => {
    getEmployeeSummary(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <>
      <div>
        <Box>
          <Breadcrumb
            title="Admin Dashboard"
            sub_page="Home"
            curent_page="Dashboard"
          />
        </Box>
        <Box>
          <Grid container spacing={"24px"} zIndex={"-1"} position={"relative"}>
            {card.map((card_details, index) => (
              <AdminCard
                className={card_details.className}
                Backgroundcolor={card_details.Backgroundcolor}
                name={card_details.name}
                value={card_details.value}
              />
            ))}
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={"24px"} zIndex={"-1"}>
            <Grid item lg={6}>
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
                  <Box sx={{ margin: "0" }}>
                    <Calendar
                      onChange={(e) => {
                        onChange();
                        handleChange(e);
                      }}
                      value={value}
                    />
                  </Box>
                  <div
                    style={{
                      display: "flex",
                      color: "gray",
                      fontSize: "20px",
                      height: "50px",
                      borderTop: "1px solid gray",
                      paddingTop: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      onClick={() => handleTabs(0, 3, 5)}
                      style={{ width: "50%" }}
                      className={`nav-tabs ${tab === 0 ? "active-tab" : ""}`}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: "19px",
                          color: `${tab === 0 ? "#000" : "#808080"}`,
                        }}
                      >
                        Present
                      </Typography>
                    </div>
                    <div
                      onClick={() => handleTabs(1)}
                      style={{ width: "50%" }}
                      className={`nav-tabs ${tab === 1 ? "active-tab" : ""}`}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: "19px",
                          color: `${tab === 1 ? "#000" : "#808080"}`,
                        }}
                      >
                        Absent
                      </Typography>
                    </div>
                  </div>
                  <Attendance tab={tab} employeesummary={employeesummary} />
                </Box>
              </Box>
            </Grid>
            {/* chart section */}
            <Grid item lg={6}>
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
                  <ApexColumnBarChart />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Admindashboard;
