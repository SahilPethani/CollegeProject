import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../shared/Components/Breadcrumb";
import { ErrorMessage, Field, Formik } from "formik";
import { AddHolidayValidator } from "../../../shared/Validations/AdminValidator";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormikInput from "../../../shared/material-ui-formik/FormikInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ShowInputError from "../../../shared/Components/ShowInputError";
import { Routing } from "../../../shared/routing";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getHoliday, updateHoliday } from "../../../services/Holiday";
import dayjs from "dayjs";
import Spinner from "../../../layout/spinner";
import FormikSelect from "../../../shared/material-ui-formik/FormikSelect";

const EditHoliday = () => {
  const Holidayid = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const [holidayData, setHolidayData] = useState({
    holiday_no: "",
    holiday_name: "",
    detail: "",
    holiday_date: "",
    status: 0
  });

  const status = [
    {
      name: "Yes",
      value: 1,
    },
    {
      name: "No",
      value: 0,
    },
  ];

  const dateHoliday =
    holidayData.holiday_date !== ""
      ? dayjs(holidayData.holiday_date, { format: "DD/MM/YYYY" })
      : null;
  const initialState = {
    holiday_no: holidayData.holiday_no,
    holiday_name: holidayData.holiday_name,
    detail: holidayData.detail,
    holiday_date: holidayData.holiday_date,
    status: holidayData.status
  };

  const getAllHoliday = async () => {
    const result = await getHoliday(Holidayid.id);
    if (result?.status === 200) {
      setHolidayData(result.data);
    } else {
      console.error("Failed to fetch Holiday data");
    }
  };
  useEffect(() => {
    getAllHoliday();
  }, []);

  // update user
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const result = await updateHoliday(Holidayid.id, values);
    if (result.status === 200) {
      setLoading(false);
      resetForm();
      toast.success(result.message);
      navigate(Routing.AllHolidays);
    } else {
      setLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div>
        <Box>
          <Breadcrumb
            title="Add Holiday"
            sub_page="Holidays"
            curent_page="Edit Holiday"
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
          <Box sx={{ margin: "1.5rem" }}>
            <Formik
              initialValues={initialState}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={true}
              enableReinitialize={true}
              validationSchema={AddHolidayValidator}
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
                          <Field
                            label="Holiday No*"
                            name="holiday_no"
                            placeHolder="Holiday No*"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="holiday_no"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <Field
                            label="Holiday Name*"
                            name="holiday_name"
                            placeHolder="Holiday Name*"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="holiday_name"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Holiday Date
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{ width: "100%" }}
                              name="holiday_date"
                              value={dateHoliday}
                              onChange={(date) =>
                                props.setFieldValue(
                                  "holiday_date",
                                  date ? dayjs(date).valueOf() : null
                                )
                              }
                            />
                          </LocalizationProvider>
                          <ErrorMessage
                            name="holiday_date"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <Field
                            label="Holiday Details"
                            name="detail"
                            component={FormikInput}
                          />
                          <ErrorMessage
                            name="detail"
                            component={ShowInputError}
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <Typography
                            style={{
                              marginBottom: "11px",
                              color: "#1E1E1E",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            Show Employee
                          </Typography>
                          <Field
                            name="status"
                            options={status?.map((type) => ({
                              title: type.name,
                              value: type.value,
                            }))}
                            component={FormikSelect}
                          />
                          <ErrorMessage
                            name="status"
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
                          onClick={() => navigate(Routing.AllHolidays)}
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
      </div>
    </>
  );
};

export default EditHoliday;
