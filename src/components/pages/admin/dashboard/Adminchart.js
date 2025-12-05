import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { EmployeeChart } from "../../../services/dashboard";
import dayjs from "dayjs";

function ApexColumnBarChart() {
  const [chartdata, setChartdata] = useState([]);
  const [value, setValue] = useState({
    date: [],
    present: [],
    Absent: [],
  });

  const GetChartData = async () => {
    const result = await EmployeeChart();
    if (result?.status === 200) {
      setChartdata(result.data);
    }
  };
  useEffect(() => {
    GetChartData();
  }, []);

  const Setchartvalue = () => {
    let date = [];
    let present = [];
    let Absent = [];
    chartdata?.employeeAttendanceCounts?.forEach((element) => {
      date.push(dayjs(element.date).format("YYYY/MM/DD"));
      present.push(element.presentEmployeesCount);
      Absent.push(element.absentEmployeesCount);
    });
    setValue({ date, present, Absent });
  };

  useEffect(() => {
    Setchartvalue();
  }, [chartdata]);

  const data = {
    series: [
      {
        name: "Present",
        data: value.present,
      },
      {
        name: "Absent",
        data: value.Absent,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: value.date,
      },
      yaxis: {
        title: {
          text: "Employee",
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#008000", "#ff0000"],
    },
  };

  return (
    <>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </>
  );
}
export default ApexColumnBarChart;
