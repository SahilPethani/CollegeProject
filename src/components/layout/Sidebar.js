import React, { useState } from "react";
// Mui
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

// icon/Images
import Logo from "../../assets/icons/codelineLogo.jpg";

// Mui
import LaptopMacTwoToneIcon from "@mui/icons-material/LaptopMacTwoTone";
import { Avatar, Box, Collapse, Drawer } from "@mui/material";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import FreeBreakfastTwoToneIcon from "@mui/icons-material/FreeBreakfastTwoTone";
import InsertChartTwoToneIcon from "@mui/icons-material/InsertChartTwoTone";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import NoteTwoToneIcon from '@mui/icons-material/NoteTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';

import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Routing } from "../shared/routing";

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
const Sidebar = () => {
  const location = window.location.pathname;

  const [expandedItem, setExpandedItem] = useState(null);

  const navigate = useNavigate();

  const userDetail = JSON.parse(window.localStorage.getItem("userDetail"));

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

  const heandlelogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("logout successful");
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          zIndex: "9999",
          position: "relative",
          border: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "15px",
            pb: "15px",
            border: "none",
          }}
        >
          <img src={Logo} alt="Logo" width={150} />
        </Box>
        <Box sx={{ width: "250px" }}>
          <List sx={{ pt: "0", border: "none" }}>
            {SidbarNavigation.map(
              (item, index) =>
                userDetail?.role === item.Role && (
                  <div key={index}>
                    <ListItemButton
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "9px",
                        margin: "8px 11px 0",
                        backgroundColor: `${item.Path === location ? "rgba(0, 0, 0, 0.04)" : ""}`
                      }}
                      onClick={() => handleItemClick(index, item.Path)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <ListItemIcon sx={{ minWidth: "36px" }}>
                          {item.icon}
                        </ListItemIcon>

                        <Typography
                          sx={{
                            color: `${item.Path === location ? "#5668f3" : ""}`,
                            fontWeight: `${item.Path === location ? "500" : "400"
                              }`,
                            fontSize: "14px",
                          }}
                        >
                          {item?.Navigate}
                        </Typography>
                      </Box>
                      {item?.sub &&
                        (expandedItem === index ? (
                          <ExpandLessOutlined />
                        ) : (
                          <ExpandMoreOutlined />
                        ))}
                    </ListItemButton>

                    {item?.sub && (
                      <Collapse in={expandedItem === index} unmountOnExit>
                        <List component="div" disablePadding>
                          {item?.sub?.map((sub_item) => (
                            <ListItemButton
                              onClick={() => navigate(sub_item.Path)}
                              sx={{
                                pl: "35px",
                                py: "4px",
                                textAlign: "center",
                                alignItems: "center",
                                margin: "8px 11px 0",
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
                                  color: `${sub_item.Path === location ? "#5668f3" : ""
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
                  </div>
                )
            )}
            <ListItemButton
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "9px",
                margin: "8px 11px 0",
              }}
              onClick={() => heandlelogout()}
            >
              <Box sx={{ display: "flex" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <LogoutTwoToneIcon />
                </ListItemIcon>

                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Log Out
                </Typography>
              </Box>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
