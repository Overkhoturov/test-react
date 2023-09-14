import logo from "./logo.svg"
import Counter from "./features/counter/Counter"
import "./App.css"
import AmountTable from "./features/AmountTable"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  selectExpenses,
  selectIncomes,
  addAmount,
} from "./app/reducers/amountReducer"
import { useMemo } from "react"
import { AmountType } from "./Types"
import OverviewTable from "./features/OverviewTable"

function App() {
  const incomes = useAppSelector(selectIncomes)
  const expenses = useAppSelector(selectExpenses)
  const dispatch = useAppDispatch()

  const balance = useMemo(() => {
    const resObj = { incRes: 0, expRes: 0 }

    incomes.forEach((item) => (resObj.incRes += item.amount))
    expenses.forEach((item) => (resObj.expRes += item.amount))

    return resObj.incRes - resObj.expRes
  }, [incomes, expenses])

  return (
    <div className="App">
      <h1 className="header">Balance: {balance}</h1>

      <div className="amount-tables">
        <AmountTable
          title="Income"
          onAdd={(data: AmountType) =>
            dispatch(addAmount({ type: "incomes", data }))
          }
          data={incomes}
        />
        <AmountTable
          onAdd={(data: AmountType) =>
            dispatch(addAmount({ type: "expenses", data }))
          }
          title="Expenses"
          data={expenses}
        />
      </div>
      <OverviewTable />
    </div>
  )
}

export default App
