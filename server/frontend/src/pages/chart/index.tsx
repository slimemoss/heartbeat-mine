import * as React from 'react'
import { ChartFace, Interval } from './face';
import { Alert, Button } from 'react-bootstrap';

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

  const maxEndDate = 24
  const step_days = 4

  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - endDate + 1)
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - endDate - step_days + 1)
  const filteredDates = dates.filter(d => d >= start && d < end)
  const intervals = getIntervalsWithFlags(filteredDates, start, end)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "8px", boxSizing: "border-box" }}>
      <Alert variant="light">赤線: 現在時刻</Alert>
      <Alert variant="light">青線: 上がON、下がOFF</Alert>
      <div style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
	<Button
          size="sm"
          variant="secondary"
          onClick={() => setEndDate(prev => prev + step_days)}
          disabled={endDate >= maxEndDate}
	>
          {step_days}日前
	</Button>
	<Button
          size="sm"
          variant="secondary"
          onClick={() => setEndDate(prev => Math.max(prev - step_days, 0))}
          disabled={endDate <= 0}
	>
          {step_days}日後
	</Button>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
	<ChartFace intervals={intervals} />
      </div>
    </div>
  )
}
