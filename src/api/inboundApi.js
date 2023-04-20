import axiosApi from "./axiosApi";
import { message } from "antd";
const InboundApi = {
  //tao phieu mua
  createPurchaseReceipt: (params) => {
    const url = "/purchase-receipt/create";
    return axiosApi
      .post(url, params)
      .then((res) => {
        message.success("Tạo phiếu nhập thành công!");
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Tạo phiếu nhập thất bại!");
        throw err;
      });
  },
  getAllPurchaseReceipt:() => {
    const url = "/purchase-receipt/get-all";
    return axiosApi.get(url);
  },
  getByCodePurchaseReceipt: (code) => {
    const url = `/purchase-receipt/get-by/${code}`;
    return axiosApi.get(url);
  },
  //tao phieu nhap
  createReceipt: (code, param) => {
    const url = `/receipt-voucher/create/${code}`;
    return axiosApi.post(url,param).then((res) => {
      message.success("Tạo phiếu nhập thành công!");
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      message.error("Tạo phiếu nhập thất bại!");
      throw err;
    }
    );
  },
  getAllReceipt: () => {
    const url = "/receipt-voucher/get-all";
    return axiosApi.get(url);
  },
  getPageOfReceipt: (page, size) => {
    const url = `/receipt-voucher/get-page?page=${page}&size=${size}`;
    return axiosApi.get(url);
  },
  getReceiptDetailById: (id) => {
    const url = `/receipt-voucher/get-receipt-voucher-by/${id}`;
    return axiosApi.get(url);
  },
  //nhap
  putGoodsIntoShelf: (id) => {
    const url = `/receipt-voucher/put-goods-on-shelf/${id}`;
    return axiosApi.post(url);
  },
  getReceiptDetailById: (id) => {
    const url = `/receipt-voucher/get-receipt-voucher-by/${id}`;
    return axiosApi.get(url);
  },

};
export default InboundApi;
