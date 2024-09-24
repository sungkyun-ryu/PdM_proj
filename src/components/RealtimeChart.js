import ReactECharts from 'echarts-for-react';
import { useEffect, useRef, useState } from 'react';

export default function RealtimeChart({ data , axis, colour }) {

  const chartRef = useRef(null);
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  const oneMinutesAgo = Date.now() - 1 * 60 * 1000;
  const threeSecondsAgo = Date.now() - 3 * 1000;
  const [zoomState, setZoomState] = useState({ start: 0, end: 100 });

  const transformData = (data) => {
    return data.map(item =>
      [item.time, item.value],
    )
  };

  console.log('data', data)

  const seriesData = [{
    name: axis,
    type: 'line',
    data: transformData(data.filter(item => 
        new Date(item.time).getTime() >= fiveMinutesAgo)),
        // new Date(item.time).getTime() >= threeSecondsAgo)),
    symbol: 'circle',
    symbolSize: 3,
    color: colour,
    emphasis: {
      itemStyle: {
        color: '#FF0000',
        symbolSize: 50,
      },
    },
}]
 

  const options = {
    title: {
      text: `${axis} chart`,
      top: 'center',
      left: '0%'
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '20%',
      right: '10%',
      bottom: '10%',
      top: '30%'
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      ...seriesData,
    ],
    dataZoom:
    {
      type: 'inside',
      start: zoomState.start,
      end: zoomState.end,
    }
  };



  return (
    <div>
      <ReactECharts option={options} ref={chartRef} />
    </div>
  )
}
