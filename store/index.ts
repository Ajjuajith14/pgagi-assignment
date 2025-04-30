import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { weatherApi } from "./apis/weatherApi"
import { newsApi } from "./apis/newsApi"
import { stocksApi } from "./apis/stocksApi"
import dashboardReducer from "./slices/dashboardSlice"
import themeReducer from "./slices/themeSlice"

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
    theme: themeReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, newsApi.middleware, stocksApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch