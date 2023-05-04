import { configureStore } from "@reduxjs/toolkit";
import cartCountSliceReducer from "./slices/cartCountSlice";
import restaurantSliceReducer from "./slices/restaurantSlice";
import authSliceReducer from "./slices/Slices/authSlice";
export const store = configureStore({
  reducer: {
    counter: cartCountSliceReducer,
    restaurant: restaurantSliceReducer,
    auth: authSliceReducer,
  },
});
