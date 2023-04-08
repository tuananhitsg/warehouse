import axiosApi from "./axiosApi";

const InboundApi = {
  getAllReceipt: () => {
    const url = "/receipt-voucher/get-all";
    return axiosApi.get(url);
  },
  createReceipt: (data) => {
    const url = "/receipt-voucher/create";
    return axiosApi.post(url, data);
  },

  putGoodsIntoShelf: (id) => {
    const url = `/receipt-voucher/put-goods-on-shelf/${id}`;
    return axiosApi.post(url);
  },
};
export default InboundApi;
