import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import requestReducer from "./RequestSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        request: requestReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store