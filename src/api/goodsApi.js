import axiosApi from "./axiosApi";
import { message } from "antd";
const goodsApi = {
  addGoods: (data) => {
    const url = "/goods/add";
    return axiosApi
      .post(url, data)
      .then((res) => {
        message.success("Tạo sản phẩm thành công!");
        return res;
      })
      .catch((err) => {
        console.error("err", err);
        if (err.response.data.statusCode === 409) {
          
          throw err;
        }
      });
  },
  getGoods: () => {
    const url = "/goods/get-all";
    return axiosApi.get(url);
  },
  getPageOfGoods: (page, size) => {
    const url = `/goods/get-page?page=${page}&size=${size}`;
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
  searchGoods: (keyword, page, size) => {
    const url = `/goods/search/${keyword}?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  updateGoods: (id, data) => {
    const url = `/goods/update/${id}`;
    return axiosApi.post(url, data);
  },
  getCurrentQuantityByGoodsCode: (id) => {
    const url = `/goods/get-current-quantity-by/${id}`;
    return axiosApi.get(url);
  },
  getCurrentQuantityAllGoods: () => {
    const url = `/goods/count-quantity`;
    return axiosApi.get(url);
  },
  getGoodsByWarehouseCode: (warehouseCode) => { 
    const url =`/goods/get-all-in-warehouse-by/${warehouseCode}`;
    return axiosApi.get(url);
  }
};

export default goodsApi;
