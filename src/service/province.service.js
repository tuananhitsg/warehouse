import addressApi from "../api/addressApi";

export const getProvinceList = async () => {
  try {
    const response = await addressApi.getList("/p");
    if (response) {
      const newResponse = response.map((val) => {
        return {
          value: val.code,
          label: val.name,
        };
      });
      return newResponse;
    }
  } catch (error) {
    console.log("Failed to fetch province list: ", error);
  }
};

export const getDistrictList = async (id) => {
  try {
    const response = await addressApi.getList(`/p/${id}?depth=2`);

    console.log("province res:", response);
    if (response) {
      const { districts } = response;
      const newDistricts = districts.map((val) => {
        return {
          value: val.code,
          label: val.name,
        };
      });
      return newDistricts;
    }
  } catch (error) {
    console.log("Failed to fetch district list: ", error);
  }
};

export const getWardList = async (id) => {
  try {
    const response = await addressApi.getList(`/d/${id}?depth=2`);

    console.log(response);
    if (response) {
      const { wards } = response;
      const newWards = wards.map((val) => {
        return {
          value: val.code,
          label: val.name,
        };
      });
      return newWards;
    }
  } catch (error) {
    console.log("Failed to fetch ward list: ", error);
  }
};
// ó thể import và sử dụng như sau:

// import { getProvinceList, getDistrictList, getWardList } from "đường_dẫn_tới_province.service.js";

// const fetchData = async () => {
//   const newProvinceList = await getProvinceList();
//   setProvince(newProvinceList);
// };

// const handleProvinceChange = async (value) => {
//   const newDistrictList = await getDistrictList(value);
//   setDistricts(newDistrictList);
// };

// const handleDistrictChange = async (value) => {
//   const newWardList = await getWardList(value);
//   setWards(newWardList);
// };
