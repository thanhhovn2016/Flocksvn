import { 
    signUpWithEmail, 
    signInWithEmail, 
    generateSocialUrl, 
    signInWithSocial, 
    verifyEmail,
    resendVerifyEmail,
    refreshToken,
    requestPasswordReset,
    confirmPasswordReset 
} from "./auth";
import { getUserProfile, editUserProfile } from "./user"
import { getInvestmentQuestions, createInvestmentProfile } from "./investment";
import { getCompanyQuestions, createCompanyProfile, getAllCompanies, createProject, getProjectCategories, getAllProjects, getTrendProjects, getHotProjects } from "./fundRaising";
import { uploadMediaFile, uploadMediaFiles } from "./common";
import { sendContactForm } from "./contact";
import { checkUserVerificationStatus, uploadVerificationId } from "./verification";
import { getCategoryPosts, getPostsWithCategory, getPost, getAllSlugs, getAllCategoryIds, getRelatedPosts, getSearchedPosts } from "./blog";
import { getAllEvents, getEventIds, getEvent } from "./events";
import { getFaqCategories, getFaqCategoryItems, getSearchedFaqs } from "./faq";

export {
    // auth
    signUpWithEmail,
    signInWithEmail,
    generateSocialUrl,
    signInWithSocial,
    verifyEmail,
    resendVerifyEmail,
    refreshToken,
    requestPasswordReset,
    confirmPasswordReset,


    //user
    getUserProfile,
    editUserProfile,

    
    // investment
    getInvestmentQuestions,
    createInvestmentProfile,


    // fund raising
    getCompanyQuestions,
    createCompanyProfile,
    getAllCompanies,
    createProject,
    getProjectCategories,
    getAllProjects, 
    getTrendProjects, 
    getHotProjects,


    // media
    uploadMediaFile,
    uploadMediaFiles,

    // contact
    sendContactForm,

    // verification
    checkUserVerificationStatus,
    uploadVerificationId,

    // Blog
    getCategoryPosts,
    getPostsWithCategory,
    getPost,
    getAllSlugs,
    getAllCategoryIds,
    getRelatedPosts,
    getSearchedPosts,

    // Events
    getAllEvents,
    getEvent,
    getEventIds,

    // FAQ
    getFaqCategories,
    getFaqCategoryItems,
    getSearchedFaqs
}