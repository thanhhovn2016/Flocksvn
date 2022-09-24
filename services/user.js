import axiosInstance from "./axiosWithAuth";
import { apiRoutes } from "../utils/constants";

export const getUserProfile = async () => {
    const res = await axiosInstance.get(`${apiRoutes.userProfile}?expand=avatar,cover_photo`);

    return res;
}

export const editUserProfile = async (values) => {
    const res = await axiosInstance.patch(`${apiRoutes.userProfile}`, {
        ...values
    });

    return res;
}

export const changePasswordUser = async (values) => {
    const res = await axiosInstance.post(`${apiRoutes.userProfile}change_password/`, {
        ...values
    });

    return res;
}