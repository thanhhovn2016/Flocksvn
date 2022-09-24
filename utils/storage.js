const accessTokenName = 'A**33##Jq';
const refreshTokenName = 'R#*#*Qj!!';
const userTypeName = "U99!!&&f";

export const setAccessToken = (token) => (
    typeof window !== "undefined" && localStorage.setItem(accessTokenName, token)
);

export const getAccessToken = () => (
    typeof window !== "undefined" && localStorage.getItem(accessTokenName)
)

export const removeAccessToken = () => (
    typeof window !== "undefined" && localStorage.removeItem(accessTokenName)
)

export const setRefreshToken = (token) => (
    typeof window !== "undefined" && localStorage.setItem(refreshTokenName, token)
);

export const getRefreshToken = () => (
    typeof window !== "undefined" && localStorage.getItem(refreshTokenName)
)

export const removeRefreshToken = () => (
    typeof window !== "undefined" && localStorage.removeItem(refreshTokenName)
)

export const setUserType = (userType) => (
    typeof window !== "undefined" && localStorage.setItem(userTypeName, userType)
);

export const getUserType = () => (
    typeof window !== "undefined" && localStorage.getItem(userTypeName)
)

export const removeUserType = () => (
    typeof window !== "undefined" && localStorage.removeItem(userTypeName)
)