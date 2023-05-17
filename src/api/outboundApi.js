import axiosApi from "./axiosApi";

const OutboundApi = {
  // sale receipt
  createSalesReceipt: (data) => {
    const url = "/sale-receipt/create";
    return axiosApi.post(url, data);
  },
  getAllSalesReceipts: () => {
    const url = "/sale-receipt/get-all";
    return axiosApi.get(url);
  },
  getSalesReceiptByCode: (code) => {
    const url = `/sale-receipt/get-by/${code}`;
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
  createDelivery: (id, data) => {
    const url = `/delivery-voucher/create/${id}`;
    return axiosApi.post(url, data);
  },
  exportGoods: (id) => {
    const url = `/delivery-voucher/export-goods/${id}`;
    return axiosApi.post(url);
  },
  cancelDeliveryVoucher: (id) => {
    const url = `/delivery-voucher/cancel/${id}`;
    return axiosApi.post(url);
  },
  searchDeliveryVoucher: (page, size, code, date, createdBy) => {
    const url = `/delivery-voucher/search-by/?page=${page}&size=${size}&date=${date}&createdBy=${createdBy}&code=${code}`;
    return axiosApi.get(url);
  },
};
export default OutboundApi;
