import axiosApi from "./axiosApi";

const categoryApi = {
    getCategories: () => {
        const url = "/category/get-all";
        return axiosApi.get(url);
    },
    addCategory: (params) => {
        const url = "/category/add";
        return axiosApi.post(url, params);
    },
    getCategoryById: (id,params) => {
        const url = `/category/get-by/${id}`;
        return axiosApi.get(url,params);
    }
}
export default categoryApi;