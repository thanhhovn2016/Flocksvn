import axiosInstance from "./axiosWithoutAuth";
import { apiRoutes } from "../utils/constants";

export const signUpWithEmail = async (values) => {
    
    return await axiosInstance.post(apiRoutes.signUpWithEmail, {
        ...values,
        signup_platform:"website"
    })
}

export const signInWithEmail = async (values) => {
    return await axiosInstance.post(apiRoutes.signInWithEmail, {
        ...values
    })
}

export const generateSocialUrl = async (provider) => {
    return await axiosInstance.get(`${apiRoutes.generateSocialUrl}?provider=${provider}`)
}


export const signInWithSocial = async (values) => {
    return await axiosInstance.post(apiRoutes.signInWithSocial, {
        ...values
    })
}

export const verifyEmail = async ({token}) => {
    return await axiosInstance.post(apiRoutes.verifyEmail, {
        token
    })
}

export const resendVerifyEmail = async ({email}) => {
    return await axiosInstance.post(apiRoutes.resendVerifyEmail, {
        email
    })
}


export const refreshToken = async () => {
    return await axiosInstance.get(apiRoutes.refreshToken)
}

export const requestPasswordReset = async ({email}) => {
    return await axiosInstance.post(apiRoutes.passwordResetCode, {
        email,
        signup_platform:"website"
    })
}

export const confirmPasswordReset = async ({password, token}) => {
    return await axiosInstance.post(apiRoutes.passwordResetConfirm, {
        password,
        token
    })
}