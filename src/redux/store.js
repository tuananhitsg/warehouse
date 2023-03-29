import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import reloadReducer from "./reloadSlice";
import wareHouseReducer from "./wareHouseSlice";
const rootReducer = {
    userReducer,
    reloadReducer,
    wareHouseReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
