import axios from "axios";
import { baseURL } from "./URL";

export const addEmployee = async (formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}employee/add`,
      data: formData,
      headers: {
        Authorization: localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const allEmployee = async (EmployeeDataGrid) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}employee/all?page_no=${EmployeeDataGrid.page}&search_text=${EmployeeDataGrid.search_text}&items_per_page=${EmployeeDataGrid.pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getEmployee = async (Employeeid) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}employee/${Employeeid}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateEmployee = async (Employeeid, formData) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${baseURL}employee/edit/${Employeeid}`,
      data: formData,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteEmployee = async (Employeeid) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseURL}employee/delete/${Employeeid}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};