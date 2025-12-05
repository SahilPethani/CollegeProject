import {
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { employeeAttendanceSheetdata } from "../../../services/Attendance";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Spinner from "../../../layout/spinner";

const AttendanceSheet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [employeeAttendanceSheet, setEmployeeAttendanceSheet] = useState([]);
  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const [monthName, setMonthName] = React.useState(currentMonthName);

  const handleChangeMonth = (event) => {
    setMonthName(event.target.value);
  };
  // to get month days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  function getDaysInCurrentMonth() {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDay = lastDayOfMonth.getDate();
    const daysInMonth = [];
    for (let day = firstDayOfMonth.getDate(); day <= lastDay; day++) {
      daysInMonth.push(day);
    }
    return daysInMonth;
  }
  const daysInCurrentMonth = getDaysInCurrentMonth();

  const monthNames = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(year, index, 1);
    return date.toLocaleString("en-US", { month: "long" });
  });

  useEffect(() => {
    getEmployeeSheet();
  }, [monthName]);

  const getEmployeeSheet = async () => {
    setLoading(true)
    const result = await employeeAttendanceSheetdata(monthName);
    if (result?.status === 200) {
      setEmployeeAttendanceSheet(result?.data);
      setLoading(false)
    } else {
      setEmployeeAttendanceSheet([]);
      setLoading(false)
    }
  };

  const Employeeattendance = (id) => () => {
    navigate(`/admin/attendance/employee/${id}`);
  };

  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="Attendance Sheet"
          sub_page="Attendance"
          curent_page="Sheet"
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
          <Grid container spacing={4} sx={{ marginBottom: "22px" }}>
            <Grid item md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Month"
                  onChange={handleChangeMonth}
                  placeholder="Select Month"
                  value={monthName}
                >
                  {monthNames.map((items, index) => (
                    <MenuItem value={items}>{items}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} display={"flex"} alignItems={"center"}>
              <Button
                variant="contained"
                sx={{
                  height: "36px",
                  width: "200px",
                  backgroundColor: "#3f51b5",
                  textTransform: "capitalize",
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>

          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none !important" }}
          >
            <Table
              sx={{
                minWidth: 700,
                boxShadow: "none !important",
                WebkitBoxShadow: "none",
              }}
              aria-label="customized table"
            >
              <TableHead sx={{ backgroundColor: "#f5f5f5", height: "50px" }}>
                <TableRow>
                  <TableCell sx={{ padding: "10px", border: "1px solid #eee" }}>
                    Employee Name
                  </TableCell>
                  {daysInCurrentMonth.map((item) => {
                    return (
                      <TableCell
                        sx={{
                          padding: "10px",
                          border: "1px solid #eee",
                          textAlign: "center !important",
                        }}
                      >
                        {item}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeAttendanceSheet.map((item) => (
                  <TableRow>
                    <TableCell
                      sx={{ padding: "10px", border: "1px solid #eee" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.employee.avatar}
                          style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                          }}
                        />
                        {/* <Avatar src={item.employee.avatar} /> */}
                        <Typography
                          fontWeight={600}
                          fontSize={"14px"}
                          marginLeft={"10px"}
                          onClick={Employeeattendance(item.employee._id)}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {item.employee.firstName} {item.employee.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    {item.attendanceDetails.map((attendance) => (
                      <>
                        {attendance.present === true && (
                          <TableCell
                            sx={{
                              padding: "10px",
                              border: "1px solid #eee",
                              textAlign: "center !important",
                            }}
                          >
                            <CheckCircleOutlineIcon
                              sx={{
                                fontSize: "16px",
                                color: "#198718",
                              }}
                            />
                          </TableCell>
                        )}
                        {attendance.holiday === true && (
                          <TableCell
                            sx={{
                              padding: "10px",
                              border: "1px solid #eee",
                              textAlign: "center !important",
                            }}
                          >
                            <StarIcon
                              sx={{
                                fontSize: "16px",
                                color: "#ffc107",
                              }}
                            />
                          </TableCell>
                        )}
                        {attendance.absent === true && (
                          <TableCell
                            sx={{
                              padding: "10px",
                              border: "1px solid #eee",
                              textAlign: "center !important",
                            }}
                          >
                            <CancelOutlinedIcon
                              sx={{
                                fontSize: "16px",
                                color: "red",
                              }}
                            />
                          </TableCell>
                        )}
                      </>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default AttendanceSheet;
