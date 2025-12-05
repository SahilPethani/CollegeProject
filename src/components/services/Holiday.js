import axios from "axios";
import { baseURL } from "./URL";


export const AllHoliday = async (EmployeeDataGrid) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}holiday/all?page_no=${EmployeeDataGrid.page}&search_text=${EmployeeDataGrid.search_text}&items_per_page=${EmployeeDataGrid.pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteHoliday = async (deleteholidayId) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseURL}holiday/delete/${deleteholidayId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getHoliday = async (Holidayid) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}holiday/${Holidayid}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateHoliday = async (Holidayid, values) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${baseURL}holiday/edit/${Holidayid}`,
      data: values,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
export const addHoliday = async (values) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}holiday/add`,
      data: values,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
