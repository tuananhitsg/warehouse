import axiosApi from './axiosApi';

const userApi = {
    login: (params) => {
        const url = "/auth/login";
        return axiosApi.post(url,params);
    },
};

export default userApi;
