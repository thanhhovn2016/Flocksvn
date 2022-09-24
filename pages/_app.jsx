import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import NextNprogress from "nextjs-progressbar";

import createEmotionCache from "../createEmotionCache";
import { useAppTheme } from "../hooks";
import { Layout } from "../components/layout";
import { AuthGruard } from "../components/auth";
import AuthProvider from "../context/authContext";
import { useRouter } from "next/router";
import DashboardLayout from '../components/layout/userDashboard/layout'
import axios from 'axios'
import ErrorServer from "../components/error_server";


// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

const clientSideEmotionCache = createEmotionCache();

// const stripePromise = loadStripe('pk_test_51L4KnuK1X9tURHXdnk32noSqMinvtZlzV8aSz49LQMVEz9HyyIgJpXu0VHZObgvnNls4PxYVtBFzJ8WQrf5N3cSl009jQgjbPc');



function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const theme = useAppTheme();
  const router = useRouter()
  // const [clientSecretState , setClientSecretState] = useState(false)

  // useEffect(() => {
  //   if (!clientSecretState){
  //     getOption()
  //   }
  // },[clientSecretState])

  // const getOption = async () =>{
  //   const {data} = await axios.post("http://192.168.2.226:8000/api/v1/payment/created_payment_intent/")
  //   console.log("data" , data)
  //   setClientSecretState(data)
  //   // const options = {
  //   //   clientSecret:`{${data}}`
  //   // }
  //   // return options
  // }
  // const options = {
  //   // passing the client secret obtained from the server
  //   // clientSecret: '{{CLIENT_SECRET}}',
  //   // clientSecret:`pi_3L7H1RK1X9tURHXd1qmZ7Ozw_secret_gsERyp5ulbxBZneZUO78A8HoA`
  //   clientSecret:clientSecretState,
  //   // style: {
  //   //   paymentRequestButton: {
  //   //     // One of 'default', 'book', 'buy', or 'donate'
  //   //     type: 'default',
  //   //     // Defaults to 'default'
  
  //   //     theme: 'dark',
  //   //     // One of 'dark', 'light', or 'light-outline'
  //   //     // Defaults to 'dark'
  
  //   //     height: '64px',
  //   //     // Defaults to '40px'. The width is always '100%'.
  //   //   },
  //   // }
  //   CustomerLocation:"United States (USD)"

  // };
  const [queryClient] = React.useState(() => new QueryClient());
  // if (!clientSecretState){
  //   return "loading...."
  // }

  // return <ThemeProvider theme={theme}>
    
  //   <Component {...pageProps} />
  //   </ThemeProvider>

  if (router?.pathname === "/investor_profile" || 
  router?.pathname === "/company_profile" || 
  router?.pathname === "/investor_profile/participate_projects"||
  router?.pathname === "/company_profile/applied_projects"||
  router?.pathname === "/company_profile/presentation_projects"||
  router?.pathname === "/company_profile/create_presentation"||
  router?.pathname === "/company_profile/update_presentation"||
  router?.pathname === "/setting"
  ){
    return(
      <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider>
            {/* <Elements stripe={stripePromise} options={options}> */}
              <DashboardLayout>
                <NextNprogress height={8} color={theme.palette.primary.main} />
                {Component.requireAuth ? (
                  <AuthGruard>
                    <Component {...pageProps} />
                  </AuthGruard>
                ) : (
                  <Component {...pageProps} />
                )}
              </DashboardLayout>
              {/* </Elements > */}
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
    )
  }
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider>
            {/* <Elements stripe={stripePromise} options={options}> */}
              <Layout>
                <NextNprogress height={8} color={theme.palette.primary.main} />
                {Component.requireAuth ? (
                  <AuthGruard>
                    <Component {...pageProps} />
                  </AuthGruard>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
              {/* </Elements > */}
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
