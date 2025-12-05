import axios from "axios";
import { baseURL } from "./URL";

export const addProject = async (formData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}admin/project/add`,
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

export const allProject = async (project) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}admin/project/all?page_no=${project.page}&search_text=${project.search_text}&items_per_page=${project.pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getProject = async (project_id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}project/one/${project_id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateProject = async (project_id, formData) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${baseURL}admin/project/update/${project_id}`,
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

export const deleteProject = async (project_id) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseURL}admin/project/delete/${project_id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};