import axiosApi from "./axiosApi";

const OutboundApi = {
  // sale receipt
  createSalesReceipt: () => {
    const url = "/sales-receipt/create";
    return axiosApi.post(url);
  },
  getAllSalesReceipts: () => {
    const url = "/sales-receipt/get-all";
    return axiosApi.get(url);
  },
  getSalesReceiptByCode: (code) => {
    const url = `/sales-receipt/get-by/${code}`;
    return axiosApi.get(url);
  },
  //delivery voucher
  getAllDelivery: () => {
    const url = "/delivery-voucher/get-all";
    return axiosApi.get(url);
  },
  getPageOfDelivery: (page, size) => {
    const url = `/delivery-voucher/get-page?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  getDeliveryByVoucherCode: (code) => {
    const url = `/delivery-voucher/get-delivery-by/${code}`;
    return axiosApi.get(url);
  },
  createDelivery: (id,data) => {
    const url = `/delivery-voucher/create/${id}`;
    return axiosApi.post(url, data);
  },
  exportGoods: (id) => {
    const url = `/delivery-voucher/export-goods/${id}`;
    return axiosApi.post(url);
  },
};
export default OutboundApi;
