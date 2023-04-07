import axiosApi from "./axiosApi";

const goodsApi = {
  addGoods: (data) => {
    const url = "/goods/add";
    return axiosApi.post(url, data);
  },
  getGoods: () => {
    const url = "/goods/get-all";
    return axiosApi.get(url);
  },
  getGoodsById: (id) => {
    const url = `/goods/get-by/${id}`;
    return axiosApi.get(url);
  },
  getGoodsByCategory: (category) => {
    const url = `/goods/get-all-by/${category}`;
    return axiosApi.get(url);
  },
  searchGoods: (keyword) => {
    const url = `/goods/search/${keyword}`;
    return axiosApi.get(url);
  },
};

export default goodsApi;
