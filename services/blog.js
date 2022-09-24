import axiosWithApikey from "./axiosWithApikey";
import { apiRoutes, baseURL } from "../utils/constants";

export const getPostsWithCategory = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.blogPostsWithCategory}`);

    return data;
}

export const getCategoryPosts = async (categoryId, page=1) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.blogCategoriesWithPosts}${categoryId}/post?expand=header_image,author&page=${page}`);
   
    return data;
}

export const getPost = async (slug) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.singleBlog}${slug}?expand=header_image,author`);

    return data;
}

export const getRelatedPosts = async (slug) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.singleBlog}${slug}/related?expand=header_image,author`);

    return data;
}

export const getAllSlugs = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.blog}?fields=slug`);

    return data;
}


export const getSearchedPosts = async (query) => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.blog}?search=${query}&expand=header_image,author`);

    return data;
}

export const getAllCategoryIds = async () => {

    const {data} = await axiosWithApikey.get(`${apiRoutes.blogCategory}?fields=id`);

    return data;
}