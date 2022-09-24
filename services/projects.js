
import axiosWithApikey from "./axiosWithApikey";
import { apiRoutes, baseURL } from "../utils/constants";


export const getProjects = async ( page=1 , page_size=10) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.company}?expand=company_category,cover_image,logo_image&page=${page}&page_size=${page_size}`);

    return data;
}

export const getProjectCategories = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.projectCategories}`);
    console.log(data)

    return data;
}

export const getProjectDetails = async (id) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.company}${id}?expand=logo_image,cover_image,company_category,company_present_team_member,company_present_team_member.image,present_details,present_documents,present_documents.file`);

    return data;
}

export const getSearchedProjects = async (query) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.company}?expand=company_category,cover_image,logo_image&page=1&search=${query}`);

    return data;
}
export const filterCategoriesProjects = async (query) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.company}?expand=company_category,cover_image,logo_image&page=1&company_category__in=${query}`);

    return data;
}