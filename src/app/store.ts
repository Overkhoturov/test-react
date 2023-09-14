import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import amountReducer from "./reducers/amountReducer"

export const store = configureStore({
  reducer: {
    amount: amountReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
