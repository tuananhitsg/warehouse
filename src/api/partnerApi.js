import axiosApi from "./axiosApi";

const partnerApi = {
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