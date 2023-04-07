import axiosApi from './axiosApi';

const outboundApi = {
    createDelivery: (data)=>{
        const url = '/delivery-voucher/create';
        return axiosApi.post(url, data);
    },
    exportGoods: (id)=>{
        const url = `/delivery-voucher/export-goods/${id}`;
        return axiosApi.post(url);
    }

}; export default outboundApi;