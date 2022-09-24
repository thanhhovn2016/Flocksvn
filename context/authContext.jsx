import React from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";

import {
  signInWithEmail,
  checkUserVerificationStatus,
  getUserProfile,
  refreshToken,
} from "../services";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
  getUserType,
  removeUserType,
} from "../utils/storage";
import { getUrlAfterLogin } from "../utils/functions";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const locale = router.locale;
  const userType = getUserType();
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [init, setInit] = React.useState(true);
  const [token, setToken] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [companyId, setCompanyId] = React.useState(null);
  const userProfileQuery = useQuery("userProfile", getUserProfile, {
    enabled: getAccessToken() !== null ? true : false,
    onSuccess: (data) => {
      setUser(data?.data);
      setIsAuthenticated(true);
    },
  });
  // const verificationStatusQuery = useQuery(
  //   "userVerificationStatus",
  //   checkUserVerificationStatus,
  //   {
  //     enabled: getAccessToken() !== null ? true : false,
  //   }
  // );

  React.useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken();
      return token;
    };

    getToken()
      .then((token) => setToken(token))
      .then(() => setInit(false));
  }, [token]);

  const mutation = useMutation(signInWithEmail, {
    onSuccess: async (data) => {
      console.log("data sign in " , data)
      setIsAuthenticated(true);
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      setToken(data.data.accessToken);
      setUser(data.data.userDetails);
      const redirectAfterLogin = getUrlAfterLogin(userType, locale);
      router.push(redirectAfterLogin);
    },
    onError: (err) => {
      setIsAuthenticated(false);
      setErrorMsg(err.message);
      setErrors(err.response?.data);
    },
  });

  const isLoading = mutation.isLoading;
  const isError = mutation.isError;

  const login = async (email, password) => {
    return mutation.mutate({ email, password });
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUserType();
    setUser(null);
    setToken(null);
    router.push("/sign-in");
  };
  const value = {
    init,
    token,
    user,
    isAuthenticated,
    userProfileQuery,
    // verificationStatusQuery,
    setUser,
    setToken,
    isError,
    isLoading,
    errors,
    setErrors,
    errorMsg,
    setErrorMsg,
    login,
    logout,
    companyId,
    setCompanyId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
