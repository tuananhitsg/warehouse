import axiosApi from "./axiosApi";

const categoryApi = {
    getCategories: () => {
        const url = "/category/";
        return axiosApi.get(url);
    },
    addCategory: (params) => {
        const url = "/category/add";
        return axiosApi.post(url, params);
    }
}
export default categoryApi;