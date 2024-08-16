import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./feature/User/UserSlice";
import ProductSlice from "./feature/product/ProductSlice";
import CartSlice from "./feature/Cart/CartSlice";

export const store = configureStore({
  reducer: {
    User: UserSlice,
    Product: ProductSlice,
    Cart: CartSlice,
  },
});
