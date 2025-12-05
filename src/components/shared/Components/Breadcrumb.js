import {
  HomeMaxOutlined,
  HomeMiniOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import { Box, Breadcrumbs, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Routing } from "../routing";

const Breadcrumb = ({ title, sub_page, curent_page }) => {
  const navigate = useNavigate();
  const userDetail = JSON.parse(window.localStorage.getItem("userDetail"));

  const handleNaviget = () => {
    if (userDetail.role === "admin") {
      navigate(Routing.AdminDashboard)
    } else if (userDetail.role === "employee") {
      navigate(Routing.EmployeeDashboard)
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          fontSize={"20px"}
          color={"#444"}
          variant="h2"
          fontWeight={"600"}
          my={"30px"}
        >
          {title}
          {/* Add Employee */}
        </Typography>
        <Box>
          <Breadcrumbs
            separator={<NavigateNextOutlined sx={{ marginX: "0" }} />}
            aria-label="breadcrumbs"
          >
            <IconButton
              sx={{ marginRight: "-10px" }}
              onClick={() => handleNaviget()}
            >
              <HomeIcon />
            </IconButton>
            <Typography color="#555" fontSize={"15px"} fontWeight={"550"}>
              {sub_page}
            </Typography>
            <Typography color="#555" fontSize={"15px"} fontWeight={"550"}>
              {curent_page}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </>
  );
};

export default Breadcrumb;
