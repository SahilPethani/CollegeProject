import React, { useEffect, useState } from "react";
// mui
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ListItemButton,
  Divider,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LoginOutlined,
  Person2Outlined,
  SettingsOutlined,
} from "@mui/icons-material";

import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import Logo from "../../assets/icons/codelineLogo.jpg";

// Mui
import LaptopMacTwoToneIcon from "@mui/icons-material/LaptopMacTwoTone";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import FreeBreakfastTwoToneIcon from "@mui/icons-material/FreeBreakfastTwoTone";
import InsertChartTwoToneIcon from "@mui/icons-material/InsertChartTwoTone";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import NoteTwoToneIcon from '@mui/icons-material/NoteTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Routing } from "../shared/routing";
import secureLocalStorage from "react-secure-storage";

const SidbarNavigation = [
  {
    Navigate: "Dashboard",
    icon: <LaptopMacTwoToneIcon />,
    Path: "/admin/dashboard",
    Role: "admin",
  },
  {
    Navigate: "Employees",
    icon: <GroupTwoToneIcon />,
    Path: "/employees",
    Role: "admin",
    sub: [
      {
        Navigate: "Add Employee",
        icon: <GroupTwoToneIcon />,
        Path: "/admin/employees/add",
        Role: "admin",
      },
      {
        Navigate: "All Employee",
        icon: <GroupTwoToneIcon />,
        Path: "/admin/employees/all",
        Role: "admin",
      },
    ],
  },
  {
    Navigate: "Attendance",
    icon: <PendingActionsTwoToneIcon />,
    Path: "/attendance",
    Role: "admin",
    sub: [
      {
        Navigate: "Today's Attendance",
        icon: <GroupTwoToneIcon />,
        Path: "/admin/attendance/today-attendance",
        Role: "admin",
      },
      {
        Navigate: "Attendance Sheet",
        icon: <GroupTwoToneIcon />,
        Path: "/admin/attendance/attendance-sheet",
        Role: "admin",
      },
    ],
  },
  {
    Navigate: "Holidays",
    icon: <FreeBreakfastTwoToneIcon />,
    Path: "/admin/holidays/all-holidays",
    Role: "admin",
  },
  {
    Navigate: "Leave Management",
    icon: <InsertChartTwoToneIcon />,
    Path: "/admin/leaves/leave-requests",
    Role: "admin"
  },
  {
    Navigate: "Notes",
    icon: <NoteTwoToneIcon />,
    Path: "/admin/notes",
    Role: "admin",
  },
  {
    Navigate: "Projects",
    icon: <AccountTreeTwoToneIcon />,
    Path: "/admin/projects/allProjects",
    Role: "admin",
  },

  // Employee
  {
    Navigate: "Dashboard",
    icon: <LaptopMacTwoToneIcon />,
    Path: "/employee/dashboard",
    Role: "employee",
  },
  {
    Navigate: "Attendance",
    icon: <AppRegistrationTwoToneIcon />,
    Path: "/employee/attendance/list",
    Role: "employee",
  },
  {
    Navigate: "My Leave",
    icon: <PendingActionsTwoToneIcon />,
    Path: "/employee/leave",
    Role: "employee",
  },
  {
    Navigate: "Notes",
    icon: <NoteTwoToneIcon />,
    Path: "/employee/notes",
    Role: "employee",
  },
  {
    Navigate: "Projects",
    icon: <AccountTreeTwoToneIcon />,
    Path: "/employee/projects/allProjects",
    Role: "employee",
  },
];

const Header = () => {
  const location = window.location.pathname;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dense, setDense] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const userDetail = JSON.parse(window.localStorage.getItem("userDetail"));
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (index, Path) => {
    if (SidbarNavigation[index]?.sub) {
      setExpandedItem((prevExpanded) => {
        if (prevExpanded === index) {
          return null;
        } else {
          return index;
        }
      });
    } else if (Path) {
      navigate(Path);
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'morning';
    } else if (hour >= 12 && hour < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };

  const heandlelogout = () => {
    secureLocalStorage.clear();
    navigate("/login");
    toast.success("logout successful");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "3px 10px 10px #b7c0ce33",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>

        <Grid container spacing={2} alignItems={"center"}>
          <Grid item={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "none",
              }}
            >
              <img src={Logo} alt="Logo" width={80} />
            </Box>

          </Grid>
          {SidbarNavigation.map(
            (item, index) =>
              userDetail?.role === item.Role && (
                <div key={index}>
                  <Grid size={4}>
                    <ListItemButton
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "9px",
                        margin: "8px 11px 0",
                        borderRadius: "5px",
                        backgroundColor: `${item.Path === location ? "rgba(0, 0, 0, 0.21)" : ""}`
                      }}
                      onClick={() => handleItemClick(index, item.Path)}
                    >
                      <Typography
                        sx={{
                          color: `${item.Path === location ? "#5668f3" : "#000000ff"}`,
                          fontWeight: `${item.Path === location ? "500" : "400"
                            }`,
                          fontSize: "14px",
                        }}
                      >
                        {item?.Navigate}
                      </Typography>



                      {item?.sub &&
                        (expandedItem === index ? (
                          <ExpandLessOutlined sx={{
                            color: "#000000ff",
                          }} />
                        ) : (
                          <ExpandMoreOutlined sx={{
                            color: "#000000ff",
                          }} />
                        ))}
                    </ListItemButton>
                    {item?.sub && (
                      <Collapse in={expandedItem === index} unmountOnExit sx={{
                        zIndex: "9999",
                        position: "absolute",
                        backgroundColor: "rgba(0, 0, 0, 0.21)",
                        borderRadius: "5px",
                        marginLeft: "80px",
                      }}>
                        <List component="div" disablePadding>
                          {item?.sub?.map((sub_item) => (
                            <ListItemButton
                              onClick={() => navigate(sub_item.Path)}
                              sx={{
                                pl: "2px",
                                py: "4px",
                                textAlign: "center",
                                alignItems: "center",
                                margin: "8px 5px 3px",
                                backgroundColor: `${sub_item.Path === location ? "rgba(0, 0, 0, 0.04)" : ""}`
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: "35px" }}>
                                <NavigateNextOutlined
                                  sx={{
                                    color: `${sub_item.Path === location
                                      ? "#5668f3"
                                      : ""
                                      }`,
                                  }}
                                />
                              </ListItemIcon>
                              <Typography
                                sx={{
                                  color: `${sub_item.Path === location ? "#5668f3" : "#000000ff"
                                    }`,
                                  fontWeight: `${sub_item.Path === location ? "500" : "400"
                                    }`,
                                  fontSize: "14px",
                                }}
                              >
                                {sub_item?.Navigate}
                              </Typography>
                              {/* <ListItemText primary={sub_item?.Navigate} /> */}
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Grid>
                </div>
              )
          )}
        </Grid>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Typography
              sx={{ fontSize: "14px", color: "#000", fontWeight: "600" }}
            >
              {userDetail.username}
            </Typography>
            <Avatar
              alt="User-img"
              src={userDetail.avatar}
              sx={{ width: "30px", height: "30px", marginLeft: "12px" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: "-20px",
                width: "200px",
                bgcolor: "#fff",
                boxShadow:
                  "0 5px 5px -3px #0003, 0 8px 10px 1px #00000024, 0 3px 14px 2px #0000001f",
                display: `${dropdownOpen === true ? "block" : "none"}`,
                zIndex: "9999",
                //   display: { dropdownOpen===true? "block":"none" },
              }}
            >
              <List dense={dense} sx={{ padding: "0" }}>
                <ListItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 5%)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ display: "flex", alignItems: "center", gap: "15px" }}
                    onClick={() => navigate(Routing.Setting)}
                  >
                    <SettingsOutlined />
                    <ListItemText>
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Settings
                      </Typography>
                    </ListItemText>
                  </ListItemIcon>
                </ListItem>
                <Divider />

                <ListItem
                  onClick={heandlelogout}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 5%)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <LoginOutlined />
                    <ListItemText>
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        onClick={() => heandlelogout()}
                      >
                        Logout
                      </Typography>
                    </ListItemText>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
