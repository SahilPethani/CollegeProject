import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const EmployeeCard = ({ Icon, Backgroundcolor, name, value }) => {
  return (
    <Box
      sx={{
        background: Backgroundcolor,
        marginBottom: "24px",
        borderRadius: "5px",
        boxShadow: "0 0 10px #b7c0ce33",
        position: "relative",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          fontSize={"18px"}
          color={"#fff"}
          fontWeight={500}
          letterSpacing={"1.5px"}
        >
          {name}
        </Typography>
        <Typography
          fontSize={"23px"}
          color={"#fff"}
          fontWeight={500}
          letterSpacing={"1.5px"}
        >
          {value}
        </Typography>
        {/* <Box sx={{ position: "absolute", top: "34%", right: "10px" }}>
          {Icon}
        </Box> */}
      </Box>
    </Box>
  );
};

export default EmployeeCard;
