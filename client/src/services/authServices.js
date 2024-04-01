import axiosInstance from "./axiosInstance";

const AuthServices = {
  login: (values) => {
    return axiosInstance.post("/user/login", values);
  },
  register: (values) => {
    return axiosInstance.post("/user/register", values);
  },
  logout: (values) => {
    return axiosInstance.post("/user/logout", values);
  },
};

export default AuthServices;
