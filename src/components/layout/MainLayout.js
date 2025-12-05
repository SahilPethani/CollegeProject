import React from "react";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import Header from "./Header";
import Notification from "../pages/notification/Notification";

const MainLayout = ({ children }) => {
  return (
    <>
      <Notification />
      <Header />
      {/* <Sidebar /> */}
      <section className="mainlayout_main">
        <Box component="main" sx={{ flexGrow: 1, pt: "25px",  }}>
          {children}
        </Box>
      </section>
    </>
  );
};

export default MainLayout;