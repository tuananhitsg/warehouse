import { createSlice } from "@reduxjs/toolkit";

const outboundSlice = createSlice({
  name: "outbound",
  initialState: {},
  reducers: {
    setPartner: (state, action) => {
      state.info = action.payload;
    },
    setGoods: (state, action) => {
      state.goods = action.payload;
    },
    setSalesVoucher: (state, action) => {
      state.salesVoucher = action.payload;
    },
    // setReceipt: (state, action) => {
    //   if (state.receipt && Array.isArray(state.receipt)) {
    //     state.receipt = [...state.receipt, action.payload];
    //   } else {
    //     state.receipt = [action.payload];
    //   }
    // },
    setReceipt: (state, action) => {
      const { goodCode, quantity } = action.payload;
      if (state.receipt) {
        const index = state.receipt.findIndex(
          (receipt) => receipt.goodCode === goodCode
        );
        if (index !== -1) {
          state.receipt[index].quantity = quantity;
        } else {
          state.receipt.push(action.payload);
        }
      } else {
        state.receipt = [action.payload];
      }
    },
    resetVoucher: (state) => {
      state.receipt = null;
    },
  },
});

export const { setPartner, setGoods, setSalesVoucher, setReceipt,resetVoucher } =
  outboundSlice.actions;
export default outboundSlice.reducer;
