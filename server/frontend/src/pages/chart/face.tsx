import * as React from 'react'

export interface Interval {
  start: Date
  hasDate: boolean
}

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

export const ChartFace  = (props: {intervals: Interval[]}) => {
  const { intervals } = props

  const data = {
    labels: intervals.map((i) => i.start),
    datasets: [
      {
	data: intervals.map((i) => (i.hasDate ? 1 : 0)),
	borderColor: "cyan",
	backgroundColor: "rgba(0, 255, 255, 0.3)",
	tension: 0.1,
      },
    ],
  }

  const options = {
    scales: {
      x: {
	type: "time" as const,
	time: {
	  unit: "hour" as const,
	  tooltipFormat: "yyyy-MM-dd HH:mm"
	},
	ticks: {
	  color: "#FFFFFF",
	  callback: function(value: any) {
	    const date = new Date(value);
	    const hour = date.getHours();
            return `${date.getMonth() + 1}/${date.getDate()} ${hour}:00`;
	  }
	},
	grid: { color: "#444444" }
      },
      y: {
	min: 0,
	max: 1,
	ticks: {
          stepSize: 1,
          color: "#FFFFFF"
        },
        grid: { color: "#444444" }
      }
    },
    plugins: {
      title: {
        display: true,
        text: "PC電源ON/OFF",
        color: "#FFFFFF",
        font: { size: 16 }
      },
      legend: { display: false },
      tooltip: {
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        backgroundColor: "#222222",
        borderColor: "#444444",
        borderWidth: 1
      }
    }
  }

  return (
    <Line data={data} options={options} />
  )
}
