import axiosApi from "./axiosApi";

const statisticApi = {
    getGoodsQtyInWarehouse: (warehouseId) => {
        const url = `/goods/count-quantity-by/${warehouseId}`;
        return axiosApi.get(url);
    },
    getQtyExportedByDate: (date) => {
        const url = `/goods/report-exported-quantity-by/${date}`;
        return axiosApi.get(url);
    },
    getQtyImportedByDate: (date) => {
        const url = `/goods/report-imported-quantity-by/${date}`;
        return axiosApi.get(url);
    },
    getQtyExportedByPeriod: (from, to) => {
        const url = `/goods/report-total-quantity-exported-by-period?fromDate=${from}&toDate=${to}`;
        return axiosApi.get(url);
    },
    getQtyImportedByPeriod: (from, to) => {
        const url = `/goods/report-total-quantity-imported-by-period?fromDate=${from}&toDate=${to}`;
        return axiosApi.get(url);
    },
    getTop5ExportedInMonth: (month) => {
        const url =`/goods/statistic-of-the-top5-exported-products-by/${month}`
        return axiosApi.get(url);
    },
    getTop5ImportedInMonth: (month) => {
        const url =`/goods/statistic-of-the-top5-imported-products-by/${month}`;
        return axiosApi.get(url);
    },
    getQtyImAndExInCurrentMonth: () => {
        const url =`/goods/statistic-of-the-total-imported_exported-products-by-current-month`;
        return axiosApi.get(url);
    },
    getTop1GoodsImported: () => {
        const url = `/goods/statistic-of-the-top1-imported-products-by/05`;
        return axiosApi.get(url);
    },
    getTop1GoodsExported: () => {
        const url = `/goods/statistic-of-the-top1-exported-products-by/05`;
        return axiosApi.get(url);
    },

};
export default statisticApi;
