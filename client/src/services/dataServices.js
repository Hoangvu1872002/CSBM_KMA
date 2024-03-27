import axiosInstance from "./axiosInstance";

const DataSevices = {
  getDataUsers: (values) => {
    return axiosInstance.get(`/users/getDataUsers/${values}`);
  },
  getInfPersonal: (values) => {
    return axiosInstance.get(`/users/getInfPersonal/${values}`);
  },
  getDecentralization: (values) => {
    return axiosInstance.get(`/users/getDecentralization/${values}`);
  },
  updateDecentralization: (values) =>
    axiosInstance.put(`/users/updateDecentralization`, values),
  addDecentralization: (values) =>
    axiosInstance.post(`/users/addDecentralization`, values),
  deleteDecentralization: (values) =>
    axiosInstance.post(`/users/deleteDecentralization`, values),
};

export default DataSevices;
