import { configureStore } from "@reduxjs/toolkit";
import { catalogApiSlice } from "@/features/catalog/catalogApiSlice";
import { uiSlice } from "../layout/uiSlice";
import { errorApiSlice } from "../api/errorApi";

export const store = configureStore({
  reducer: {
    [catalogApiSlice.reducerPath]: catalogApiSlice.reducer,
    [errorApiSlice.reducerPath]: errorApiSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApiSlice.middleware,
      errorApiSlice.middleware
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
