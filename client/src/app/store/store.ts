import { configureStore } from "@reduxjs/toolkit";
import { catalogApiSlice } from "@/features/catalog/catalogApiSlice";
import { uiSlice } from "../layout/uiSlice";

export const store = configureStore({
  reducer: {
    [catalogApiSlice.reducerPath]: catalogApiSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
