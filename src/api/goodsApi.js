import axiosApi from "./axisosApi";

const productApi = {
    getProducts: () => {
        return axiosApi.get("/product");
    },
}