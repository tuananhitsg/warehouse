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
  //shelfController
  getAllShelves: () => {
    const url = "/shelve-storage/get-all";
    return axiosApi.get(url);
  },
  getShelvesById: (id) => {
    const url = `/shelve-storage/get-by/${id}`;
    return axiosApi.get(url);
  },
  getAllColumn: () => {
    const url = "/column-location/get-all";
    return axiosApi.get(url);
  },
  getColumnById: (id) => {
    const url = `/column-location/get-by/${id}`;
    return axiosApi.get(url);
  },
  //BinController
  getAllRow: () => {
    const url = "/bin-location/get-all";
    return axiosApi.get(url);
  },
  getBinById: (id) => {
    const url = `/bin-location/get-by/${id}`;
    return axiosApi.get(url);
  },
  getShelvesByWarehouseId: (id) => {
    const url = `/bin-location/get-all-by/${id}`;
    return axiosApi.get(url);
  },
  getReportStock: (id) => {
    const url = `/bin-location/report-stock-position/${id}`;
    return axiosApi.get(url);
  },

  getUsableBin: (codeWarehouse, params) => {
    const url = `/bin-location/usable-position-by-goods/${codeWarehouse}`;
    return axiosApi.post(url, params);
  },
  getBinsByStatus: (codeWarehouse, status) => {
    const url = `/bin-location/filter-status-by/${codeWarehouse}`;
    return axiosApi.post(url, { status });
  },
  getBinByGoodsCode: (goodsCode) => {
    const url = `/bin-location/find-all-by/${goodsCode}`;
    return axiosApi.get(url);
  },
  moveGoodsToBin: (binId, params) => {
    const url = `/bin-location/move/${binId}`;
    return axiosApi.post(url, params);
  },
};
export default wareHouserApi;
