import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { historyReducer } from "./slice/historySlice"

const rootReducer = combineReducers({
  history: historyReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }),
  devTools: true,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
