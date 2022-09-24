import React from "react";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

import { useAuth } from "../../hooks";
import { getAccessToken } from "../../utils/storage";

const AuthGruard = ({ children }) => {
  const router = useRouter();
  const auth = useAuth();

  React.useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/sign-in");
    }
  }, []);

  if (auth.init) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return <>{children}</>;
};

export default AuthGruard;
