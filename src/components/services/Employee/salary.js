import axios from "axios";
import { baseURL } from "../URL";

export const getSalaryData = async (formData) => {
    try {
      let response = await axios({
        method: "POST",
        url: `${baseURL}employee/salary`,
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