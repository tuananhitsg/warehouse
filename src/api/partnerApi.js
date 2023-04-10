import axiosApi from "./axiosApi";

const partnerApi = {
    create: (data)=>{
        const url = '/partner/create';
        return axiosApi.post(url, data);
    },
    getAll: ()=>{
        const url = '/partner/get-all';
        return axiosApi.get(url);
    },
    getById: (id)=>{
        const url = `/partner/get-by/${id}`;
        return axiosApi.get(url);
    },
    getByPhone: (phone)=>{
        const url = `/partner/get-by/${phone}`;
        return axiosApi.get(url);
    },
};

export default partnerApi;