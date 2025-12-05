import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Breadcrumb from "../../shared/Components/Breadcrumb";
import { ErrorMessage, Field, Formik } from "formik";
import FormikInput from "../../shared/material-ui-formik/FormikInput";
import ShowInputError from "../../shared/Components/ShowInputError";
import { AddEmployeeValidator } from "../../shared/Validations/AdminValidator";
import { Routing } from "../../shared/routing";
import { updateEmployee } from "../../services/employee";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const Setting = () => {
  const [loading, setLoading] = useState(false);

  const Employeeid = JSON.parse(localStorage.getItem("userDetail"))?.["_id"];
  const initialState = {
    Username: JSON.parse(localStorage.getItem("userDetail"))?.["user_id"],
    CurrentPassword: JSON.parse(secureLocalStorage.getItem("password")),
    NewPassword: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("Username", values.Username);
    formData.append("CurrentPassword", values.CurrentPassword);
    formData.append("NewPassword", values.NewPassword);
  };
  return (
    <>
      <Box>
        <Breadcrumb title="Settings" sub_page="Home" curent_page="Settings" />
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
          <Box sx={{ margin: "1.5rem", marginBottom: "0" }}>
            <Formik
              initialValues={initialState}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={true}
              enableReinitialize={true}
              validationSchema={AddEmployeeValidator}
            >
              {(props) => {
                const { handleSubmit } = props;
                return (
                  <>
                    <form onSubmit={handleSubmit} noValidate>
                      <Grid container spacing={4}>
                        <Grid item md={12}>
                          <Field
                            label="Username"
                            name="Username"
                            placeHolder="Enter Username"
                            component={FormikInput}
                            value={initialState}
                          />
                          <ErrorMessage
                            name="Username"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Field
                            label="CurrentPassword"
                            name="CurrentPassword"
                            placeHolder="CurrentPassword"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="CurrentPassword"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Field
                            label="NewPassword"
                            name="NewPassword"
                            placeHolder="NewPassword"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="NewPassword"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Button
                            sx={{
                              bgcolor: "#3f51b5",
                              padding: "0 16px 0 16px",
                              height: "36px",
                              color: "#fff",
                              "&:hover": {
                                cursor: "pointer",
                                boxShadow:
                                  "0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f",
                                backgroundColor: "#3f51b5",
                              },
                            }}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Setting;
