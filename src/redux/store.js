import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import updatedOrderDetailSlice from "./updatedOrderDetailSlice";

const store = configureStore({
    reducer: {
        notifications: notificationSlice.reducer,
        updatedOrderDetails: updatedOrderDetailSlice.reducer 
    },
})

export default store;