import { Box, Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Field, Formik } from "formik";

import React, { useState } from "react";
import { AddEmployeeValidator } from "../../../shared/Validations/AdminValidator";
import FormikInput from "../../../shared/material-ui-formik/FormikInput";
import ShowInputError from "../../../shared/Components/ShowInputError";
import { addEmployee } from "../../../services/employee";
import { toast } from "react-hot-toast";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../shared/routing";
import FormikSelect from "../../../shared/material-ui-formik/FormikSelect";
import Spinner from "../../../layout/spinner";

const AddEmployees = () => {
  const navigate = useNavigate();

  const initialState = {
    user_id: "",
    first_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    password: "",
    designation: "",
    address: "",
    email: "",
    date_of_birth: "",
    education: "",
    join_date: "",
    // avatar: null,
    status: "",
    create_user: "",
    salary: "",
  };

  const gender = [
    {
      name: "Male",
      value: 0,
    },
    {
      name: "Female",
      value: 1,
    },
  ];

  const create_user = [
    {
      name: "Employee",
      value: 0,
    },
    {
      name: "Employee / User",
      value: 1,
    },
  ];

  const status = [
    {
      name: "Active",
      value: 1,
    },
    {
      name: "InActive",
      value: 0,
    },
  ];
  const [loading, setLoading] = useState(false);

  function generateUniqueUserId(firstName, lastName, dateOfBirth) {
    var firstTwoLetters = "";
    var firstLetterLastName = "";
    var birthYearDigits = "";
    if (firstName) {
      firstTwoLetters = firstName.slice(0, 2).toUpperCase();
    }
    if (lastName) {
      firstLetterLastName = lastName.slice(0, 1).toUpperCase();
    }
    if (dateOfBirth) {
      birthYearDigits = new Date(dateOfBirth).getFullYear().toString();
    }

    const userId = `${firstTwoLetters}${firstLetterLastName}${birthYearDigits}`;
    return userId;
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const formData = {
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      mobile: values.mobile,
      password: values.password,
      designation: values.designation,
      address: values.address,
      email: values.email,
      date_of_birth: values.date_of_birth,
      education: values.education,
      join_date: values.join_date,
      status: values.status,
      create_user: values.create_user,
    };
    // formData.append("first_name", values.first_name);
    // formData.append("last_name", values.last_name);
    // formData.append("email", values.email);
    // formData.append("gender", values.gender);
    // formData.append("password", values.password);
    // // formData.append("avatar", values.avatar);
    // formData.append("mobile", values.mobile);
    // formData.append("designation", values.designation);
    // formData.append("address", values.address);
    // formData.append("date_of_birth", values.date_of_birth);
    // formData.append("education", values.education);
    // formData.append("join_date", values.join_date);
    // formData.append("create_user", values.create_user);
    // formData.append("status", values.status);
    // formData.append("salary", values.salary);

    const result = await addEmployee(formData);
    if (result.status === 201) {
      setLoading(false);
      toast.success(result.message);
      resetForm();
      navigate(Routing.AllEmployees);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Box>
        <Breadcrumb
          title="Add Employee"
          sub_page="Employee"
          curent_page="Add Employee"
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
          <Box sx={{ margin: "1.5rem" }}>
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
                            label="User ID"
                            name="user_id"
                            placeHolder="User Id"
                            component={FormikInput}
                            readOnly={"readOnly"}
                          />
                          <ErrorMessage
                            name="user_id"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Frist Name"
                            name="first_name"
                            placeHolder="Enter Frist Name"
                            component={FormikInput}
                            onChange={(e) => {
                              props.handleChange(e);
                              const generatedUserId = generateUniqueUserId(
                                e.target.value,
                                props.values.last_name,
                                props.values.date_of_birth
                              );
                              props.setFieldValue("user_id", generatedUserId);
                            }}
                          />
                          <ErrorMessage
                            name="first_name"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Last Name"
                            name="last_name"
                            placeHolder="Enter Last Name"
                            component={FormikInput}
                            onChange={(e) => {
                              // props.handleChange(e);
                              const generatedUserId = generateUniqueUserId(
                                props.values.first_name,
                                e.target.value,
                                props.values.date_of_birth
                              );
                              props.setFieldValue("user_id", generatedUserId);
                              props.setFieldValue("last_name", e.target.value);
                            }}
                          />
                          <ErrorMessage
                            name="last_name"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Email"
                            name="email"
                            placeHolder="Enter email"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="email"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Gender
                          </Typography>
                          <Field
                            label="Gender"
                            name="gender"
                            options={gender?.map((type) => ({
                              title: type.name,
                              value: type.value,
                            }))}
                            component={FormikSelect}
                          />
                          <ErrorMessage
                            name="gender"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Mobile number"
                            name="mobile"
                            placeHolder="Enter your mobile"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="mobile"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Password"
                            name="password"
                            placeHolder="Enter password"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="password"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Designation"
                            name="designation"
                            placeHolder="Enter designation"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="designation"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Date Of Birth
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{ width: "100%" }}
                              label="Date of Birth"
                              name="date_of_birth"
                              onChange={(date) => {
                                const generatedUserId = generateUniqueUserId(
                                  props.values.first_name,
                                  props.values.last_name,
                                  date ? dayjs(date).format("YYYY/MM/DD") : ""
                                );
                                props.setFieldValue("user_id", generatedUserId);
                                props.setFieldValue(
                                  "date_of_birth",
                                  date ? dayjs(date).format("YYYY/MM/DD") : ""
                                );
                              }}
                            />
                          </LocalizationProvider>
                          <ErrorMessage
                            name="date_of_birth"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={12} sx={{ gridAutoRows: "auto ,auto" }}>
                          <Field
                            label="Address"
                            name="address"
                            multiline
                            rows={3}
                            placeHolder="Enter address"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="address"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Field
                            label="Education"
                            name="education"
                            placeHolder="Enter education"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="education"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Date Of Join
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{ width: "100%" }}
                              label="Date of Join"
                              // value={field.value}
                              name="join_date"
                              onChange={(date) =>
                                props.setFieldValue(
                                  "join_date",
                                  date ? dayjs(date).format("DD/MM/YYYY") : ""
                                )
                              }
                            />
                          </LocalizationProvider>
                          <ErrorMessage
                            name="join_date"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Status
                          </Typography>
                          <Field
                            label="Status"
                            name="status"
                            options={status?.map((type) => ({
                              title: type.name,
                              value: type.value,
                            }))}
                            component={FormikSelect}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Create As User
                          </Typography>
                          <Field
                            label="Create User"
                            name="create_user"
                            options={create_user?.map((type) => ({
                              title: type.name,
                              value: type.value,
                            }))}
                            component={FormikSelect}
                          />
                          <ErrorMessage
                            name="create_user"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item md={12}>
                          <Field
                            label="Salary"
                            name="salary"
                            placeHolder="Enter salary"
                            component={FormikInput}
                            type="number"
                          />
                          <ErrorMessage
                            name="salary"
                            component={ShowInputError}
                          />
                        </Grid>
                        {/* <Grid item md={12}>
                            <Box
                              fullWidth
                              sx={{
                                border: "1px dashed #7c7db3",
                                padding: "26px 20px 30px",
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              <Box>
                                <Button
                                  component="label"
                                  variant="contained"
                                  sx={{ backgroundColor: "#3f51b5" }}
                                  startIcon={<CloudUploadIcon />}
                                >
                                  Upload file
                                </Button>
                                <Typography
                                  variant="span"
                                  fontSize={"15px"}
                                  color={"#555"}
                                  marginLeft={"5px"}
                                >
                                  {props?.values?.avatar?.name
                                    ? props?.values?.avatar?.name
                                    : "or drag and drop file here"}
                                </Typography>
                              </Box>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="avatar"
                                type="file"
                                sx={{
                                  cursor: "pointer",
                                  opacity: "0",
                                  position: "absolute",
                                  top: "0",
                                  left: "0",
                                  height: "92px",
                                }}
                                onChange={(event) => {
                                  props.setFieldValue(
                                    "avatar",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </Box>
                          </Grid> */}
                      </Grid>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          mt: "16px",
                        }}
                      >
                        <Button
                          component="label"
                          variant="contained"
                          size="medium"
                          type="submit"
                          sx={{ backgroundColor: "#3f51b5" }}
                          onClick={() => handleSubmit()}
                        >
                          Submit
                        </Button>
                        <Button
                          component="label"
                          variant="contained"
                          size="medium"
                          sx={{ backgroundColor: "#f44336" }}
                          onClick={() => navigate(Routing.AdminDashboard)}
                        >
                          Cancle
                        </Button>
                      </Box>
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

export default AddEmployees;
