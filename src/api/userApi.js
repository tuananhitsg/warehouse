import axiosApi from './axiosApi';

const userApi = {
    login: (params) => {
        const url = "/auth/login";
        return axiosApi.post(url,params);
    },
    forgetPassword: (params) => {
        const url = "/auth/forget";
        return axiosApi.post(url, params);
    }
};


export default userApi;
