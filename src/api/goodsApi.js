import axiosApi from "./axiosApi";

const goodsApi = {
    getGoods: () => {
        const url= "/goods/get-all";
        return axiosApi.get(url);
    },
    getGoodsById: (id) => {
        const url = `/goods/get-by/${id}`;
        return axiosApi.get(url);
    },
    addGoods: (data) =>{
        const url = "/goods/add";
        return axiosApi.post(url, data);
    } 
}

export default goodsApi;