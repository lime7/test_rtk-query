import themeReducer from "./slices/themeSlice";
import { goodsApi } from "./services/goodsApi";
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    themes: themeReducer,
    [goodsApi.reducerPath]: goodsApi.reducer
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({}).concat([goodsApi.middleware])]
});
