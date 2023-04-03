import axiosApi from "./axiosApi";

const employeeApi = {
    getEmployee: () => {
        const url = "/user/get-all";
        return axiosApi.get(url);
    },
    getEmployeeById: (id) => {
        const url = `/user/get-by/${id}`;
        return axiosApi.get(url);
    },
    addEmployee: (params) => {
        const url = "/register";
        return axiosApi.post(url, params);
    },
    updateEmployee: (id, params) => {
        const url = `/user/update/${id}`;
        return axiosApi.post(url, params);
    }
    
}
export default employeeApi;