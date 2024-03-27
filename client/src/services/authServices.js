import axiosInstance from "./axiosInstance";

const AuthServices = {
  login: (values) => {
    return axiosInstance.post("/users/login", values);
  },
  register: (values) => {
    return axiosInstance.post("/users/register", values);
  },
  logout: (values) => {
    return axiosInstance.post("/users/logout", values);
  },
};

export default AuthServices;
