import axiosWithApikey from "./axiosWithApikey";
import { apiRoutes, baseURL } from "../utils/constants";

export const getAllEvents = async (page=1) => {

    const {data} = await axiosWithApikey.get(`${baseURL}${apiRoutes.allEvents}?expand=header_image,page=${page}`);

    return data;
}

export const getEventIds = async () => {

    const {data} = await axiosWithApikey.get(`${baseURL}${apiRoutes.allEvents}?fields=id`);

    return data;
}

export const getEvent = async (eventId) => {

    const {data} = await axiosWithApikey.get(`${baseURL}${apiRoutes.singleEvent}${eventId}?expand=header_image`);

    return data;
}

