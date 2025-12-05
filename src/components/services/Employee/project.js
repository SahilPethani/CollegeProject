import axios from "axios";
import { baseURL } from "../URL";

export const allProjectEmployee = async (project) => {
    try {
        let response = await axios({
            method: "GET",
            url: `${baseURL}employee/project/${project._id}?page_no=${project.page}&search_text=${project.search_text}&items_per_page=${project.pageSize}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};