import axiosInstance from "./axiosInstance";

const DataSevices = {
  getDataUsers: (values) => {
    return axiosInstance.get(`/user/getDataUsers/${values}`);
  },
  getInfPersonal: (values) => {
    return axiosInstance.get(`/user/getInfPersonal/${values}`);
  },
  getDecentralization: (values) => {
    return axiosInstance.get(`/user/getDecentralization/${values}`);
  },
  updateDecentralization: (values) =>
    axiosInstance.put(`/user/updateDecentralization`, values),
  addDecentralization: (values) =>
    axiosInstance.post(`/user/addDecentralization`, values),
  deleteDecentralization: (values) =>
    axiosInstance.post(`/user/deleteDecentralization`, values),
};

export default DataSevices;
