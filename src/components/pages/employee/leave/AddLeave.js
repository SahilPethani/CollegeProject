import React, { useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Formik } from "formik";
import FormikInput from "../../../shared/material-ui-formik/FormikInput";
import ShowInputError from "../../../shared/Components/ShowInputError";
import { AddLeaveValidator } from "../../../shared/Validations/AdminValidator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormikSelect from "../../../shared/material-ui-formik/FormikSelect";
import Spinner from "../../../layout/spinner";
import { Addleaves } from "../../../services/Employee/Leave";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Routing } from "../../../shared/routing";

const AddLeave = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [leaveType1, setLeaveType1] = useState("One Day");
  const [leaveType2, setLeaveType2] = useState("");

  const employeeId = JSON.parse(
    window.localStorage.getItem("employeeDetail")
  )._id;

  const initialState = {
    apply_date: "",
    from_date: "",
    to_date: "",
    type: "",
    duration: "",
    comments: "",
    status: "Pending",
  };

  const duration = [
    {
      name: "Full Day",
      value: "Full Day",
    },
    {
      name: "Half day",
      value: "half day",
    }
  ];

  const type = [
    {
      name: "Sick Leave",
      value: "Sick Leave",
    },
    {
      name: "Casual Leave",
      value: "Casual Leave",
    },
    {
      name: "Family Function",
      value: "Family Function",
    },
    {
      name: "Exams",
      value: "Exams",
    },
    {
      name: "Medical Emergency",
      value: "Medical Emergency",
    },
    {
      name: "Personal Work",
      value: "Personal Work",
    },
    {
      name: "Death of family member",
      value: "Death of family member",
    },
    {
      name: "Emergency Leave",
      value: "Emergency Leave",
    },
    {
      name: "College Work",
      value: "College Work",
    },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const data = {
      employeeId: employeeId,
      fromDate: leaveType1 === "One Day" ? values.apply_date : values.from_date,
      toDate: values.to_date,
      reason: values.type,
      type: leaveType1,
      one_day_leave_type: leaveType2,
      comments: values.comments,
    };
    const result = await Addleaves(data);
    if (result.status === 201) {
      setLoading(false);
      toast.success(result.message);
      resetForm();
      navigate(Routing.Leave);
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
          title="Add Leaves"
          sub_page="My Leave"
          curent_page="Add Leave"
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
          zIndex: "999",
        }}
      >
        <Box sx={{ margin: "1.5rem" }}>
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={true}
            enableReinitialize={true}
            validationSchema={AddLeaveValidator}
          >
            {(props) => {
              const { handleSubmit } = props;
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    style={{ paddingBottom: "32px" }}
                  >
                    <Grid container spacing={4}>
                      <Grid item sm={12}>
                        <FormControl>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Leave Type
                          </Typography>
                          <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            onChange={(e) => {
                              setLeaveType1(e.target.value);
                              props.resetForm(); // Corrected line
                            }}
                            defaultValue="One Day"
                          >
                            <FormControlLabel
                              value="One Day"
                              control={<Radio />}
                              label="One Day"
                            />
                            <FormControlLabel
                              value="More Then One Day"
                              control={<Radio />}
                              label="More Then One Day"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      {leaveType1 === "More Then One Day" ? (
                        <>
                          <Grid item sm={6}>
                            <Typography
                              style={{
                                marginBottom: "11px",
                                color: "#1E1E1E",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              From Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                sx={{ width: "100%" }}
                                name="from_date"
                                value={props.values.from_date}
                                onChange={(date) =>
                                  props.setFieldValue(
                                    "from_date",
                                    date ? dayjs(date).format("YYYY-MM-DD") : ""
                                  )
                                }
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item sm={6}>
                            <Typography
                              style={{
                                marginBottom: "11px",
                                color: "#1E1E1E",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              To Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                sx={{ width: "100%" }}
                                name="to_date"
                                value={props.values.to_date}
                                onChange={(date) =>
                                  props.setFieldValue(
                                    "to_date",
                                    date ? dayjs(date).format("YYYY-MM-DD") : ""
                                  )
                                }
                              />
                            </LocalizationProvider>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item sm={6}>
                            <Typography
                              style={{
                                marginBottom: "11px",
                                color: "#1E1E1E",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              Leve date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                sx={{ width: "100%" }}
                                name="apply_date"
                                value={props.values.apply_date}
                                onChange={(date) =>
                                  props.setFieldValue(
                                    "apply_date",
                                    date ? dayjs(date).format("YYYY-MM-DD") : ""
                                  )
                                }
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item sm={6}>
                            <Typography
                              style={{
                                marginBottom: "11px",
                                color: "#1E1E1E",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              Leave Duration
                            </Typography>
                            <Field
                              label="Duration"
                              name="duration"
                              options={duration?.map((type) => ({
                                title: type.name,
                                value: type.value,
                              }))}
                              onChange={(e) => {
                                props.setFieldValue("duration", e.target.value);
                                setLeaveType2(e.target.value);
                              }}
                              component={FormikSelect}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item sm={6}>
                        <Typography
                          style={{
                            marginBottom: "11px",
                            color: "#1E1E1E",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          Leave Reason
                        </Typography>
                        <Field
                          label="Reason"
                          name="type"
                          options={type?.map((type) => ({
                            title: type.name,
                            value: type.value,
                          }))}
                          component={FormikSelect}
                        />
                        <ErrorMessage name="type" component={ShowInputError} />
                      </Grid>

                      <Grid item sm={6}>
                        <Field
                          label="Leave Comments"
                          name="comments"
                          placeHolder="Enter comments"
                          component={FormikInput}
                        />
                        <ErrorMessage
                          name="comments"
                          component={ShowInputError}
                        />
                      </Grid>
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
                        onClick={() => navigate(Routing.Leave)}
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
    </>
  );
};

export default AddLeave;
