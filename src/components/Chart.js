import { useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';

export default function Chart({visibilities =[]}) {

    const features = ['Temp', 'Accel', 'Axis'];
    const visibility = visibilities[0];

    const selected_features = features.reduce((acc, series) =>{
      acc[series] = series === visibility
      return acc; }
    , {}) ;

    const options = {
        title: {
          text: `${visibility} Chart`,
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
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Temp',
            data: [
              ['2024-08-01T00:00:00Z', 150],
              ['2024-08-02T00:00:00Z', 230],
              ['2024-08-03T00:00:00Z', 224],
              ['2024-08-04T00:00:00Z', 218],
              ['2024-08-05T00:00:00Z', 135],
              ['2024-08-06T00:00:00Z', 147],
              ['2024-08-07T00:00:00Z', 260],
            ],
            type: 'line',
          },
          {
            name: 'Accel',
            data: [ ['2024-08-01T00:00:00Z', 320],
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
            name: 'Axis',
            data: [ ['2024-08-01T00:00:00Z', 320],
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
