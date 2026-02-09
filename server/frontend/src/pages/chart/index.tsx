import * as React from 'react'
import { ChartFace, Interval } from './face';
import { Button } from 'react-bootstrap';

function getIntervalsWithFlags(dates: Date[], begin: Date, end: Date): Interval[] {
  const intervalMs = 10 * 60 * 1000; // 10分ごと
  const intervals: Interval[] = []

  for (let t = begin.getTime(); t <= end.getTime(); t += intervalMs) {
    const start = new Date(t)
    const intervalEnd = new Date(t + intervalMs)
    const hasDate = dates.some(date => date >= start && date < intervalEnd)
    intervals.push({ start, hasDate })
  }

  return intervals
}


export const Chart = (props: { dates: Date[] }) => {
  const { dates } = props
  const [endDate, setEndDate] = React.useState(0)

  const maxEndDate = 8

  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - endDate + 1)
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - endDate - 1)
  const filteredDates = dates.filter(d => d >= start && d < end)

  const intervals = getIntervalsWithFlags(filteredDates, start, end)

return (
  <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "8px", boxSizing: "border-box" }}>
    <div style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setEndDate(prev => prev + 2)}
        disabled={endDate >= maxEndDate}
      >
        ２日前
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setEndDate(prev => Math.max(prev - 2, 0))}
        disabled={endDate <= 0}
      >
        ２日後
      </Button>
    </div>
    <div style={{ flex: 1, overflow: "hidden" }}>
      <ChartFace intervals={intervals} />
    </div>
  </div>
)
}
