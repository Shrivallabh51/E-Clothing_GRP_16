import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./feature/User/UserSlice";
import ProductSlice from "./feature/product/ProductSlice";

export const store = configureStore({
  reducer: {
    User: UserSlice,
    Product: ProductSlice,
  },
});
