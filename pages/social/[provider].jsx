import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMutation } from "react-query";
import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Box,
} from "@mui/material";

import { signInWithSocial } from "../../services";
import { useAuth, useTranslation } from "../../hooks";
import {
  setAccessToken,
  setRefreshToken,
  getUserType,
} from "../../utils/storage";
import axiosInstance from "../../services/axiosWithAuth";
import { ErrorStack, SingleError, AppPapper } from "../../components/common";
import {
  googleRedirectUriEn,
  googleRedirectUriVi,
  facebookRedirectUriEn,
  facebookRedirectUriVi,
  appleRedirectUriEn,
  appleRedirectUriVi,
} from "../../utils/constants";

const SocialProvider = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = router.locale;
  const query = router.query;
  const provider = query.provider;
  const code = query.code;
  const state = query.state ? query.state : "none";
  const auth = useAuth();
  const userType = getUserType();
  const [errors, setErrors] = React.useState({});
  const [errMsg, setErrMsg] = React.useState();
  const [errStatus, setErrStatus] = React.useState();

  const mutation = useMutation(signInWithSocial, {
    onSuccess: (data) => {
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${data?.data?.details?.accessToken}`;
      setAccessToken(data?.data?.details?.accessToken);
      setRefreshToken(data?.data?.details?.refreshToken);
      auth.setToken(data?.data?.details?.accessToken);
      auth.setUser(data?.data?.details?.userDetails);
      const status = data?.data?.status;
      const redirectAfterLogin =
        locale == "en-US" ? `/${userType}/` : `/vi/${userType}/`;
      const redirectAfterSignUp =
        locale == "en-US" ? "/profile/edit" : "/vi/profile/edit";
      // router.push(
      //   status == "sign_up" ? redirectAfterSignUp : redirectAfterLogin
      // );
      router.push("/");
    },
    onError: (err) => {
      setErrStatus(err.response.status);
      setErrors(err.response.data);
      setErrMsg(err.message);
    },
  });

  React.useEffect(() => {
    if (code && provider) {
      const redirectUriEn =
        provider === "google"
          ? googleRedirectUriEn
          : provider === "facebook"
          ? facebookRedirectUriEn
          : appleRedirectUriEn;
      const redirectUriVi =
        provider === "google"
          ? googleRedirectUriVi
          : provider === "facebook"
          ? facebookRedirectUriVi
          : appleRedirectUriVi;
      mutation.mutate({
        code,
        state,
        provider,
        redirectUrl: locale == "en-US" ? redirectUriEn : redirectUriVi,
      });
    }
  }, [code, state, provider]);

  return (
    <>
      <Head>
        <title>
          {t?.title} | {t?.social_login}
        </title>
        <meta name="description" content="Social Login" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Box sx={{ minHeight: "100vh" }} py={10}>
        {mutation.isLoading && (
          <Grid container justifyContent="center" my={5} py={5}>
            <Grid item md={4} xs={12} py={5}>
              <Card variant="outlined" sx={{ minHeight: 150, borderRadius: 5 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <CircularProgress />
                  <Typography>
                    {t?.social_login_message} &#160;
                    {provider.toLowerCase()} account.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        <Grid container justifyContent="center" py={5}>
          <Grid item md={4} xs={12}>
            {errors && (
              <ErrorStack
                errors={errors}
                setErrors={setErrors}
                errStatus={errStatus}
                setErrStatus={setErrStatus}
              />
            )}
            {/* {errMsg && <SingleError error={errMsg} setError={setErrMsg} />} */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SocialProvider;
