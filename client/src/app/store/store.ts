import { configureStore } from "@reduxjs/toolkit";
import { catalogApiSlice } from "@/features/catalog/catalogApiSlice";

export const store = configureStore({
  reducer: {
    [catalogApiSlice.reducerPath]: catalogApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
