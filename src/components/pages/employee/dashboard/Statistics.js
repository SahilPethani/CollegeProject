import {
  Box,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { HolidayList } from "../../../services/Employee/Dashboard";
import dayjs from "dayjs";

const Statistics = () => {
  const [holiday, setHoliday] = useState([]);
  const GetHolidayData = async () => {
    const result = await HolidayList();
    if (result?.status === 200) {
      setHoliday(result.data);
    }
  };
  useEffect(() => {
    GetHolidayData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginTop: "10px",
          maxHeight: "295px !important",
          overflow: "auto",
          "&>*:nth-of-type(odd)": {
            backgroundColor: "#ecf0f4",
          },
        }}
      >
        {holiday.map((holidatList, index) => (
          <>
            <Grid Grid
              container
              key={index}
              sx={{
                paddingY: "10px",
                paddingX: "10px",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <Grid item lg={2}>
                <Typography color={"#000"} fontWeight={600}>
                  {index + 1}.
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography color={"#000"} fontWeight={600}>
                  {holidatList.holiday_name}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography color={"#000"} fontWeight={600}>
                  {dayjs(holidatList.holiday_date).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
              <Grid item lg={2}>
                <Chip
                  label={"Holiday"}
                  color={"primary"}
                  variant="filled"
                  sx={{ borderRadius: "5px" }}
                />
              </Grid>
            </Grid>
          </>
        )
        )}

      </Box>
    </>
  );
};

export default Statistics;
