import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const AdminCard = ({ className, Backgroundcolor, name, value }) => {
  return (
    <Grid item lg={6}>
      <Box
        sx={{
          background: Backgroundcolor,
          minHeight: "80px",
          marginBottom: "24px",
          borderRadius: "5px",
          boxShadow: "0 0 10px #b7c0ce33",
          position: "relative",
          overflow: "hidden",
          padding: "15px",
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            position: "relative",
            zIndex: "999",
            height: "100%",
          }}
        >
          <Typography
            fontSize={"24px"}
            color={"#fff"}
            fontWeight={700}
            marginBottom={"8px"}
          >
            {name}
          </Typography>
          <Typography fontSize={"28px"} color={"#fff"} fontWeight={700}>
            {value}
          </Typography>
          {/* <Box
            sx={{
              width: "100%",
              backgroundColor: "#3f51b540",
              height: "4px",
              boxShadow: "0.4rem 0.4rem 0.8rem #0000008a",
              margin: "8px 0",
              borderRadius: "9999px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: "4px",
                backgroundColor: "#ffc100",
                borderRadius: "9999px",
              }}
            ></Box>
          </Box> */}
        </Box>
        <Box sx={{ padding: "15px" }} className={className}></Box>
      </Box>
    </Grid>
  );
};

export default AdminCard;
