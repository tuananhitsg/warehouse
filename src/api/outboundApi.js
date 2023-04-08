import axiosApi from "./axiosApi";

const OutboundApi = {
  getAllDelivery: () => {
    const url = "/delivery-voucher/get-all";
    return axiosApi.get(url);
  },
  createDelivery: (data) => {
    const url = "/delivery-voucher/create";
    return axiosApi.post(url, data);
  },
  exportGoods: (id) => {
    const url = `/delivery-voucher/export-goods/${id}`;
    return axiosApi.post(url);
  },
};
export default OutboundApi;
