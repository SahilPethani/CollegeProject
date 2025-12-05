import axios from "axios";
import { baseURL } from "./URL";

export const userLogin = async (body) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}auth/login`,
      data: body,
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const SendNotification = async (body) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${baseURL}send-notification`,
      data: body,
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};