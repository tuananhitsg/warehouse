import axiosApi from "./axiosApi";

const InboundApi = {
    createReceipt: (data) => {
        const url = "/receipt-voucher/create";
        return axiosApi.post(url, data);
    },
    getAllReceipt:()=>{
        const url = "/receipt-voucher/get-all";
        return axiosApi.get(url);
    },
    putGoodsIntoShelf: (data, id) => {
        const url = `/receipt-voucher/put-goods-on-shelf/${id}`;
        return axiosApi.put(url, data);
    }
}
export default InboundApi;