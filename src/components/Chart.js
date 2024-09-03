import { useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';

export default function Chart({ vis, wave_data }) {

  const features = ['X-Axis', 'Y-Axis', 'Z-Axis'];
  const visibility = { vis };

  const selected_features = features.reduce((acc, series) => {
    acc[series] = series === visibility
    return acc;
  }
    , {});

  const generateTimeSeriesData = (wave_data) => {
    const startTime = new Date(wave_data['created_at']);
    const interval = 78; // 1 second interval
    return wave_data['spectrum_x_amp'].map((value, index) => [new Date(startTime.getTime() + index * interval).toISOString(), value]);
  };

  const xAxisData = generateTimeSeriesData(wave_data);

  const options = {
    title: {
      text: `${vis} Chart`,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: features,
      selected: selected_features,
    },
    xAxis: {
      type: 'time',
      data:  xAxisData
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'X-Axis',
        data:  wave_data.spectrum_x_amp ,
        type: 'line',
      },
      {
        name: 'Y-Axis',
        data: [['2024-08-01T00:00:00Z', 320],
        ['2024-08-02T00:00:00Z', 332],
        ['2024-08-03T00:00:00Z', 301],
        ['2024-08-04T00:00:00Z', 334],
        ['2024-08-05T00:00:00Z', 390],
        ['2024-08-06T00:00:00Z', 330],
        ['2024-08-07T00:00:00Z', 320],
        ],
        type: 'line',
      },
      {
        name: 'Z-Axis',
        data: [['2024-08-01T00:00:00Z', 320],
        ['2024-08-02T00:00:00Z', 446],
        ['2024-08-03T00:00:00Z', 501],
        ['2024-08-04T00:00:00Z', 434],
        ['2024-08-05T00:00:00Z', 490],
        ['2024-08-06T00:00:00Z', 530],
        ['2024-08-07T00:00:00Z', 520],
        ],
        type: 'line',
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={options} />
    </div>
  )
}
