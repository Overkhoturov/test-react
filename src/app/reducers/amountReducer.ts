import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { AmountType } from "../../Types"

export interface CounterState {
  incomes: AmountType[]
  expenses: AmountType[]
}

const initialState: CounterState = {
  incomes: [],
  expenses: [],
}

export const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    addAmount: (
      state,
      action: PayloadAction<{
        type: "incomes" | "expenses"
        data: AmountType
      }>,
    ) => {
      const { type, data } = action.payload
      state[type].push(data)
    },
  },
})

export const { addAmount } = amountSlice.actions
export const selectIncomes = (state: RootState) => state.amount.incomes
export const selectExpenses = (state: RootState) => state.amount.expenses

export default amountSlice.reducer
