import { configureStore } from "@reduxjs/toolkit";
import { catalogApiSlice } from "@/features/catalog/catalogApiSlice";
import { uiSlice } from "../layout/uiSlice";
import { errorApiSlice } from "../api/errorApi";
import { basketApiSlice } from "@/features/basket/basketApiSlice";
import { catalogSlice } from "@/features/catalog/catalogSlice";
import { accountApiSlice } from "@/features/account/accountApiSlice";
import { checkoutApiSlice } from "@/features/checkout/checkoutApiSlice";

export const store = configureStore({
  reducer: {
    [catalogApiSlice.reducerPath]: catalogApiSlice.reducer,
    [errorApiSlice.reducerPath]: errorApiSlice.reducer,
    [basketApiSlice.reducerPath]: basketApiSlice.reducer,
    [accountApiSlice.reducerPath]: accountApiSlice.reducer,
    [checkoutApiSlice.reducerPath]: checkoutApiSlice.reducer,
    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApiSlice.middleware,
      errorApiSlice.middleware,
      basketApiSlice.middleware,
      accountApiSlice.middleware,
      checkoutApiSlice.middleware
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
