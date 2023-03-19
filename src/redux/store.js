import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import reloadReducer from "./reloadSlice";

const rootReducer = {
    userReducer,
    reloadReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
