import { createSlice } from "@reduxjs/toolkit";

const inboundSlice = createSlice({
  name: "inbound",
  initialState: {},
  reducers: {
    setPartner: (state, action) => {
      state.info = action.payload;
    },
    setGoods: (state, action) => {
      state.goods = action.payload;
    },
    setPurchased: (state, action) => {
      state.purchased = action.payload;
    },
    setSalesVoucher: (state, action) => {
      state.salesVoucher = action.payload;
    },
    setBinCode: (state, action) => {
      state.binCode = action.payload;
    },
    // setReceipt: (state, action) => {
    //   if (state.receipt && Array.isArray(state.receipt)) {
    //     state.receipt = [...state.receipt, action.payload];
    //   } else {
    //     state.receipt = [action.payload];
    //   }
    // },
    setReceipt: (state, action) => {
      const {binLocationCode, goodsCode, quantity, } = action.payload;
      if (state.receipt) {
        const index = state.receipt.findIndex(
          (receipt) => receipt.goodsCode === goodsCode
        );
        if (index !== -1) {
          state.receipt[index].quantity = quantity;
          state.receipt[index].binLocationCode = binLocationCode;
        } else {
          state.receipt.push(action.payload);
        }
      } else {
        state.receipt = [action.payload];
      }
    },
    resetReceipt: (state) => {
      state.receipt = null;
    },
  },
});

export const { setPartner, setGoods, setPurchased, setSalesVoucher,setBinCode, setReceipt,resetReceipt } =
  inboundSlice.actions;
export default inboundSlice.reducer;
