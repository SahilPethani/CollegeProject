import axios from "axios";
import { baseURL } from "../URL";

export const EmployeeAttedanceTodayList = async (EmployeeAttedanceList) => {
  try {
    let response = await axios({
      method: "GET",

      url: `${baseURL}attendance/employee/list/${EmployeeAttedanceList.employeeId}?page_no=${EmployeeAttedanceList.page}&items_per_page=${EmployeeAttedanceList.pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const getDatailsEmployee = async (employeeId, date) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/employee/${employeeId}?date=${date}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
