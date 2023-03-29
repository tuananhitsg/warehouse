import axiosApi from './axiosApi';

const userApi = {
    login: (params) => {
        const url = "/auth/login";
        return axiosApi.post(url,params);
    },
    forgetPassword: (params) => {
        const url = "/auth/forget";
        return axiosApi.post(url, params);
    },
    changePassword: (params) => {
        const url = "/auth/reset-password";
        return axiosApi.post(url, params);
    },
    updateInfor:(id,params) => {
        const url = `/user/update/${id}`;
        return axiosApi.post(url, params);
    }
    
};


export default userApi;
