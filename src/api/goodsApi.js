import axiosApi from "./axisosApi";

const productApi = {
    getGoods: () => {
        return axiosApi.get("/product");
    },
    addGoods: () =>{
        return axiosApi.post("/goods/add");
    } 
}