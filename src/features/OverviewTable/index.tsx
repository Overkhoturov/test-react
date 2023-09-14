import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import "./index.css"
import { useAppSelector } from "../../app/hooks"
import { selectExpenses, selectIncomes } from "../../app/reducers/amountReducer"
import { useMemo } from "react"
import { AmountType } from "../../Types"

dayjs.extend(isBetween)

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
]

const groupData = (data: AmountType[]) =>
  data.reduce((acc, item) => {
    const month = dayjs(item.date).format("MM")

    if (!acc[month]) {
      acc[month] = 0
    }

    acc[month] += item.amount

    return acc
  }, {})

const OverviewTable = () => {
  const incomes = useAppSelector(selectIncomes)
  const expenses = useAppSelector(selectExpenses)

  const balanceByMonths = useMemo(() => {
    const incomesGroup = groupData(incomes)
    const expensesGroup = groupData(expenses)
    const result = months.map((month) => ({
      month,
      income: incomesGroup[month] || 0,
      expenses: expensesGroup[month] || 0,
    }))

    return result
  }, [incomes, expenses])

  return (
    <div className="months">
      <h3 className="months__title">Yearly Overview</h3>
      <table>
        <thead>
          {months.map((month) => (
            <th key={month}>{`${month}/${dayjs().year()}`}</th>
          ))}
        </thead>
        <tbody>
          <tr>
            {balanceByMonths.map((balance) => (
              <td key={balance.month} style={{ color: "green" }}>
                {balance.income}
              </td>
            ))}
          </tr>
          <tr>
            {balanceByMonths.map((balance) => (
              <td key={balance.month} style={{ color: "red" }}>
                {balance.expenses}
              </td>
            ))}
          </tr>
          <tr>
            {balanceByMonths.map((balance) => (
              <td key={balance.month} style={{ borderTop: "1px solid" }}>
                {balance.income - balance.expenses}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OverviewTable
