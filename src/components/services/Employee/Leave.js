import axios from "axios";
import { baseURL } from "../URL";

export const Addleaves = async (formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}leave/apply`,
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

export const getAllleaveData = async (data) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}leave/employee/${data.id}?page_no=${data.page}&items_per_page=${data.pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteLeaveData = async (Id) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseURL}leave/delete/${Id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};