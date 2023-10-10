import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// redux store setup
// 1.configureStore creates the store
// 2.add all your slices to reducer: {}
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSilce.middleware)
    middleware: [apiSlice.middleware],
    devTools: true
})