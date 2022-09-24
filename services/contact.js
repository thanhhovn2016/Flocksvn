import axiosInstance from "./axiosWithoutAuth";
import { apiRoutes } from "../utils/constants";


export const sendContactForm = async (values) => {
    const res = await axiosInstance.post(`${apiRoutes.contactForm}`, {
        ...values
    });

    return res;
}