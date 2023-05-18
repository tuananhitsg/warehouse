import axiosApi from "./axiosApi";
import { message } from "antd";
const partnerApi = {
  create: (params) => {
    const url = "/partner/create";
    return axiosApi
      .post(url, params)
      .then((res) => {
        message.success("Tạo đối tác thành công!");
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.data.status === 500) {
          message.error("Lỗi server!");
          throw err;
        }
      });
  },
  getAll: () => {
    const url = "/partner/get-all";
    return axiosApi.get(url);
  },
  getPageOfPartner: (page, size) => {
    const url = `/partner/get-page?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  getById: (id) => {
    const url = `/partner/get-by/${id}`;
    return axiosApi.get(url);
  },
  getByPhone: (phone) => {
    const url = `/partner/get-by/${phone}`;
    return axiosApi.get(url);
  },
  searchPartner: (keyword,page,size) => {
    const url = `/partner/search/${keyword}?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  update: (id, params) => {
    const url = `/partner/update/${id}`;
    return axiosApi
      .post(url, params)
      .then((res) => {
        message.success("Cập nhật đối tác thành công!");
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.data.status === 500) {
          message.error("Lỗi server!");
          throw err;
        }
      });
  }
};

export default partnerApi;
