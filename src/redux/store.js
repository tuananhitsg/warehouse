import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import reloadReducer from "./reloadSlice";
import wareHouseReducer from "./wareHouseSlice";
import inboundReducer from "./inboundSlice";
import outboundReducer from "./outboundSlice";
const rootReducer = {
    userReducer,
    reloadReducer,
    wareHouseReducer,
    inboundReducer,
    outboundReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
