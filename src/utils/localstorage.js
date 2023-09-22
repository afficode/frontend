import secureLocalStorage from "react-secure-storage";
export const setUser = (user) => {
  secureLocalStorage.setItem("user", user);
};

export const getUserFromLocalStorage = () => {
  return secureLocalStorage.getItem("user");
};

export const setToken = (token) => {
  secureLocalStorage.setItem("token", token);
  return true;
}

export const getToken = () => {
  return secureLocalStorage.getItem("token")
}

export const clearLocalStorage = () => {
  secureLocalStorage.clear();
}

export const setRefreshToken = (refresh_token) => {
  secureLocalStorage.setItem("refresh_token", refresh_token)
}

export const getRefreshToken = () => {
  secureLocalStorage.getItem("refresh_token");
}
