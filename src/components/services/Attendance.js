import axios from "axios";
import { baseURL } from "./URL";



export const employeeAttendanceSheetdata = async (monthName) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/sheet?monthName=${monthName}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const allEmployeeAttedance = async (EmployeeDataGrid) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/today?page_no=${EmployeeDataGrid.page}&search_text=${EmployeeDataGrid.search_text}&items_per_page=${EmployeeDataGrid.pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const oneEmployeeTodayAttendance = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/today/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const oneEmployeeAttendanceDetail = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/detail/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const oneEmployeeAttendanceList = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/employee/list/${id}?page_no=&items_per_page=`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const oneAttendanceDetail = async (id, date) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/employee/${id}?date=${date}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const editAttendance = async (id, formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}attendance/manual/${id}`,
      data: formData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};