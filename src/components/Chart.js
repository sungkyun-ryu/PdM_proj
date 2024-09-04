// import { useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';
// import moment from 'moment';
// import { parseISO, getTime } from 'date-fns';

export default function Chart({ key, cols, vis, data }) {

  const features = cols
  const visibility = vis;

  const selected_features = features.reduce((acc, series) => {
    acc[series] = series === visibility
    return acc;
  }
    , {}); // json데이터... trues and falses ... 

  // console.log('===> selectedfeatures', selected_features)

  const transformData = (data, feature) => {
    return data.map(item => [
      item.created_at* 1000, 
      item[feature]
    ]);
  };

  // const transformData = (data, feature) => {
  //   return data.map(item => [
  //     // new Date(item.local_time).getTime(), 
  //     // moment(item.local_time, moment.ISO_8601).valueOf(),
  //     getTime(parseISO(item.local_time)), 
  //     item[feature]
  //   ]);
  // };

  // const transformData = (data, feature) => {
  //   return data.map(item => {
  //     const date = moment(item.local_time, moment.ISO_8601, true); // 'true' enables strict parsing
  //     const timestamp = date.isValid() ? date.valueOf() : NaN;
  //     console.log(`local_time: ${item.local_time}, timestamp: ${timestamp}`);
  //     return [timestamp, item[feature]];
  //   });
  // };

  const seriesData = features.map(feature => ({
    name: feature,
    type: 'line',
    data: transformData(data, feature),
    symbol: 'none'
  }));

  // console.log('==>sereisData', seriesData);

  console.log('===> trans', transformData(data, features))


  const options = {
    title: {
      text: `${vis} chart`,
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
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);
          // Customize the format as needed
          return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
        },
        // rotate: 45, 
        // formatter: (value) => {
        //   // Format the time label to make it more readable
        //   const date = new Date(value);
        //   return `${date.getMonth() + 1}/${date.getDate()}`;
        // },
      },
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
  };

  console.log('===> options', options)
  return (
    <div>
      <ReactECharts option={options} />
    </div>
  )
}
