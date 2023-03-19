import axiosApi from "./axiosApi";

const employeeApi = {
    getEmployee: (params) => {
        const url = "/user/get-all";
        return axiosApi.get(url, params);
    },
    addEmployee: (params) => {
        const url = "/register";
        return axiosApi.post(url, params,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    
}