import axiosApi from "./axiosApi";

const employeeApi = {
    getEmployee: () => {
        const url = "/user/get-all";
        return axiosApi.get(url);
    },
    addEmployee: (params) => {
        const url = "/register";
        return axiosApi.post(url, params);
    },
    
}
export default employeeApi;