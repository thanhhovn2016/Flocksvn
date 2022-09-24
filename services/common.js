import axiosInstance from "./axiosWithAuth";
import { apiRoutes } from "../utils/constants";

export const uploadMediaFile = async ({file, onUploadProgress}) => {

    let formData = new FormData();
    formData.append('file',file)
    const res = await axiosInstance.post(`${apiRoutes.mediaUpload}`, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress:onUploadProgress
    });

    return res;
}


export const uploadMediaFiles = async ({files, onUploadProgress}) => {
    
    let formData = new FormData();
    files.map((file, index) => formData.append(`[${index}]file`, file));
    const res = await axiosInstance.post(`${apiRoutes.mediaMultiUpload}`, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress:onUploadProgress
    });

    return res;
}
