import axios from "axios";
import { baseURL } from "./URL";


export const getAdminAllleaveData = async (data) => {
    try {
        let response = await axios({
            method: "GET",
            url: `${baseURL}leave/all?status=&fromDate=&toDate=&type=&search_text&items_per_page=${data.pageSize}&page_no=${data.page}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const updateLeaveStatus = async (formData) => {
    try {
        let response = await axios({
            method: "PUT",
            url: `${baseURL}leave/status-update`,
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