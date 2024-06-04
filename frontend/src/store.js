import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSlice, { logout } from "./slices/authSlice";

const loggingMiddleware = (store) => (next) => (action) => {
    if (action.type.startsWith("api/") && action.payload) {
        if (action.payload.status === 401) {
            // console.log("Unauthorized request");
            store.dispatch(logout());
        }
    }

    return next(action);
};

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, loggingMiddleware),
});

export default store;
