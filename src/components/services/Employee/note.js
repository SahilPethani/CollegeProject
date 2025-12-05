import axios from "axios";
import { baseURL } from "../URL";

export const getNotes = async (data) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}note?page_no=${data.page}&items_per_page=${data.pageSize}&show_dash=${data.show_dash}&status=${data.status}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getOneNote = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}note/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const editNote = async (note_id, values) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${baseURL}note/${note_id}`,
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

export const addNote = async (values) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}note`,
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

export const changeNoteStatus = async (id) => {
  try {
    let response = await axios({
      method: "GET",
      url: `${baseURL}note/status/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteNote = async (id) => {
  try {
    let response = await axios({
      method: "DELETE",
      url: `${baseURL}note/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const addComment = async (id, values) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}note/comment/${id}`,
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
