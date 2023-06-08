import axiosApi from "./axiosApi";
import { message } from "antd";

const uploadApi = {
  upload: (formData) => {
    const url = "/upload";
    return axiosApi
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
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
};
export default uploadApi;
