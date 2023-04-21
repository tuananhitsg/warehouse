import axiosApi from "./axiosApi";
import { message } from "antd";
const employeeApi = {
  getEmployee: () => {
    const url = "/user/get-all";
    return axiosApi.get(url);
  },
  getEmployeeById: (id) => {
    const url = `/user/get-by/${id}`;
    return axiosApi.get(url);
  },
  addEmployee: (params) => {
    const url = "/register";
    return axiosApi
      .post(url, params)
      .then((res) => {
        console.log("res trong api:", res);
        message.success("Tạo nhân viên thành công!");
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.data.statusCode === 409) {
          message.error("Email đã tồn tại!");
          throw err;
        }
      
      });
  },
  updateEmployee: (id, params) => {
    const url = `/user/update/${id}`;
    return axiosApi.post(url, params);
  },
  changeAccountStatus: (id) => {
    const url = `/user/deactivate-by/${id}`;
    return axiosApi.post(url);
  }
};
export default employeeApi;
