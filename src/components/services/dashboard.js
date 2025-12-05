import axios from "axios";
import { baseURL } from "./URL";

export const getemployeesummary = async (date) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/summary?date=${date}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getDashbordCount = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}admin/dashbord`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const EmployeeChart = async () => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}attendance/week`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
