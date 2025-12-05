import axios from "axios";
import { baseURL } from "../URL";

export const PunchInAPI = async (id, formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}punch-in/${id}`,
      data: { note: formData },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const PunchOutAPI = async (id, formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}punch-out/${id}`,
      data: { note: formData },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// break -----------------------------------------------------------------------------------------------------
export const BreakInAPI = async (id, formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}break-in/${id}`,
      data: { note: formData },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const BreakOutAPI = async (id, formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}break-out/${id}`,
      data: { note: formData },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const HolidayList = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}holiday/employee/currentmonth`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getDashbordData = async (Employeeid) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}employee/dashbord/${Employeeid}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

