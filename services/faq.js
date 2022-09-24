import axiosWithApikey from "./axiosWithApikey";
import { apiRoutes } from "../utils/constants";

export const getFaqCategories = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.faqCategories}?page_size=100000`);

    return data;
}

export const getFaqCategoryItems = async (categoryId) => {


    const {data} = await axiosWithApikey.get(`${apiRoutes.faqCategoryItems}${categoryId}/questions`);

    return data;
}

export const getSearchedFaqs = async (query) => {


    const {data} = await axiosWithApikey.get(`${apiRoutes.faq}?search=${query}`);

    return data;
}
