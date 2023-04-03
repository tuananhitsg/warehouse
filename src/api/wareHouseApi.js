import axiosApi from "./axiosApi";

const wareHouserApi = {
  getAllWareHouse: () => {
    const url = "/warehouse/get-all";
    return axiosApi.get(url);
  },
  getWareHouseById: (id) => {
    const url = `/warehouse/get-by/${id}`;
    return axiosApi.get(url);
  },
  addWareHouse: (data) => {
    const url = "/warehouse/add";
    return axiosApi.post(url, data);
  },
  getAllShelves: () => {
    const url = "/shelve-storage/get-all";
    return axiosApi.get(url);
  },
  getShelvesById: (id) => {
    const url = `/shelve-storage/get-by/${id}`;
    return axiosApi.get(url);
  },
  getAllColumn: () =>{
    const url = "/column-location/get-all";
    return axiosApi.get(url);
  },
  getColumnById: (id) =>{
    const url = `/column-location/get-by/${id}`;
    return axiosApi.get(url);
  },
  getAllRow: () =>{
    const url = "/row-location/get-all";
    return axiosApi.get(url);
  },
  getRowById: (id) =>{
    const url = `/row-location/get-by/${id}`;
    return axiosApi.get(url);
  },
  getShelvesByWarehouseId:(id)=>{
    const url =`/row-location/get-all-by/${id}`;
    return axiosApi.get(url);
  }
};
export default wareHouserApi;