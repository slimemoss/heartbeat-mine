import * as React from 'react'
import useSWR from 'swr'

import fetch from 'cross-fetch'
import { Chart } from './chart';

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface PingStoreI {
  dates: string[]; // ISO8601 形式の文字列
}

const App = () => {
  const { data, error } = useSWR<PingStoreI>('/api/', fetcher, { suspense: true })

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if(!data) {
    return <div>no data</div>
  }

  const dates = data.dates.map(d => new Date(d))

  return (
    <div>
      <Chart dates={dates}></Chart>
    </div>
  )
}

export const Page = () => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <App/>
    </React.Suspense>
  )
}
