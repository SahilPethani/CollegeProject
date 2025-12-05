import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

// Images
import Login_img from "../../../assets/images/Loginillustration.png";

// MUIIcons
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/auth";
import { toast } from "react-hot-toast";
import { Routing } from "../../shared/routing";
import Spinner from "../../layout/spinner";
import { requestForToken } from "../../../firebase";

import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    user_id: "",
    password: "",
  });
  const [fcmToken, setFcmToke] = useState("");

  const getFCMtoken = async () => {
    try {
      const result = await requestForToken();
      if (result) {
        setFcmToke(result);
      }
    } catch (error) {
      console.error("FCM token request timed out:", error);
      navigate("/login");
    }
  };
  useEffect(() => {
    getFCMtoken();
  }, []);

  const [loading, setLoading] = useState(false);
  const loggedIn = localStorage.getItem("is_login");
  const userDetail = JSON.parse(window.localStorage.getItem("userDetail"));

  useEffect(() => {
    setLoading(true);
    if (loggedIn) {
      if (userDetail?.role === "admin") {
        navigate(Routing.AdminDashboard);
        setLoading(false);
      } else if (userDetail?.role === "employee") {
        navigate(Routing.EmployeeDashboard);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [loggedIn]);

  const handleUserdata = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      user_id: userdata.user_id,
      password: userdata.password,
      fcmToken: fcmToken,
    };
    const result = await userLogin(data);
    if (result?.status === 200) {
      localStorage.setItem("userDetail", JSON.stringify(result?.user));
      localStorage.setItem(
        "employeeDetail",
        JSON.stringify(result?.employeeData)
      );
      localStorage.setItem("token", result?.Token);
      localStorage.setItem("is_login", true);
      secureLocalStorage.setItem("password", userdata?.password);

      if (result?.user?.role === "admin") {
        setLoading(false);
        navigate(Routing.AdminDashboard);
        toast.success(result?.message);
      } else if (result?.user?.role === "employee") {
        setLoading(false);
        navigate(Routing.EmployeeDashboard);
        toast.success(result?.message);
      }
    } else {
      setLoading(false);
      toast.error(result?.message);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Box sx={{ width: "100%", height: "100vh", overflowX: "hidden" }}>
        <Grid container spacing={0} height={"100%"}>
          <Grid
            item
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            // width={"410px"}
            width={"100%"}
            alignItems={"center"}
            position={"revert"}
            zIndex={"99999999"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
              maxWidth={"500px"}
              px={"12px"}
              height={"62%"}
              gap={2}
            >
              <Typography
                variant="h2"
                sx={{ textAlign: "center", fontSize: "32px", fontWeight: "550" }}
              >
                Employee Monitoring System
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={3}
              >
                <TextField
                  id="username"
                  label="Username*"
                  name="user_id"
                  onChange={handleUserdata}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FaceTwoToneIcon sx={{ color: "#000" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  label="Password*"
                  onChange={handleUserdata}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityTwoToneIcon
                            sx={{ color: "#000", cursor: "pointer" }}
                          />
                        ) : (
                          <VisibilityOffTwoToneIcon
                            sx={{ color: "#000", cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginTop: "5px",
                  background: "#3f51b5",
                  textTransform: "none",
                }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
