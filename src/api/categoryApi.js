import axiosApi from "./axiosApi";
import { message } from "antd";
const categoryApi = {
    getCategories: () => {
        const url = "/category/get-all";
        return axiosApi.get(url);
    },
    addCategory: (params) => {
        const url = "/category/add";
        return axiosApi.post(url, params).then((res) => {
            message.success("Tạo loại sản phẩm thành công!");
            return res;
        }).catch((err) => {
            if (err.response.data.statusCode === 409) {
                message.error("Tên loại sản phẩm đã tồn tại!");
                throw err;
            }
        });

    },
    getCategoryById: (id,params) => {
        const url = `/category/get-by/${id}`;
        return axiosApi.get(url,params);
    }
}
export default categoryApi;