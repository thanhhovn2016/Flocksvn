import axiosInstance from "./axiosWithAuth";
import axiosWithApikey from "./axiosWithApikey";
import { apiRoutes, baseURL } from "../utils/constants";

export const getCompanyQuestions = async () => {

    const {data} = await axiosWithApikey.get(`${baseURL}${apiRoutes.companyQuestions}?fields=*,question_set.*,question_set.default_answer_set&expand=question_set,question_set.default_answer_set&page_size=100`)

    return data;
}

export const createCompanyProfile = async ({companyProfile, companyDetails}) => {
    const res = await axiosInstance.post(`${apiRoutes.createCompanyProfile}`, {
        companyProfile,
        companyDetails
    });

    return res;
}

export const getAllCompanies = async () => {

    const {data} = await axiosInstance.get(`${apiRoutes.allCompanies}`)

    return data;
}

export const createProject = async (values) => {
    const res = await axiosInstance.post(`${apiRoutes.createProject}`, values);

    return res;
}

export const updateProject = async (values) => {
    const res = await axiosInstance.put(`${apiRoutes.company}${values?.id}/update_presentation/`, values);

    return res;
}

export const getProject = async (values) => {
    const {data} = await axiosInstance.get(`${apiRoutes.company}${values?.id}?expand=company,coverImage,logoImage`);

    return data;
}


export const getProjectCategories = async () => {

    const {data} = await axiosInstance.get(`${apiRoutes.projectCategories}`)

    return data;
}

export const getAllProjects = async () => {

    // const {data} = await axiosInstance.get(`${apiRoutes.allProjects}?expand=logo_image,cover_image`)
    // const {data} = await axiosInstance.get(apiRoutes.companyUserRelatedCompany + "?expand=logo_image,cover_image")
    const {data} = await axiosInstance.get(apiRoutes.companyUserAppliedProject + "?expand=logo_image,cover_image")

    return data;
}

export const getTrendProjects = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.trendProjects}?expand=company_category,logo_image,cover_image`)

    return data;
}

export const getHotProjects = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.hotProject}?expand=logo_image,cover_image`)


    return data;
}