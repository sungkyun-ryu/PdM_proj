import ReactECharts from 'echarts-for-react';
import { useEffect, useRef } from 'react';


export default function Chart({ key, cols, vis, data }) {

  const chartRef = useRef(null);

  const features = cols;
  const visibility = vis;

  const selected_features = features.reduce((acc, series) => {
    acc[series] = series === visibility
    return acc;
  }
    , {}); // json데이터... trues and falses ... 

  const transformData = (data, feature) => {
    return data.map(item =>
      [item.created_at * 1000, item[feature]],
    )
  };

  const seriesData = features.map(feature => ({
    name: feature,
    type: 'line',
    data: transformData(data, feature),
    symbol: 'none',
  }));


  const options = {
    title: {
      text: `${vis} chart`,
      top: 'center',
      left: '0%'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: features,
      selected: selected_features,
      top: '5%',
      left: 'center',
      bottom: '0%'
    },
    grid: {
      left: '15%',
      right: '10%',
      bottom: '10%',
      top: '30%'
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);
          return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
    dataZoom:
    {
      type: 'inside',
      start: 0,
      end: 100,
    }
  };

  useEffect(() => {
    const chartInstance = chartRef.current?.getEchartsInstance();
    console.log(chartInstance)

    const handleChartClick = (e) => {
      console.log('Clicked:', e);
      // You can handle the click event here
      // For example, you can check which data point was clicked
    };

    if (chartInstance) {
      chartInstance.on('click', handleChartClick);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (chartInstance) {
        chartInstance.off('click', handleChartClick);
      }
    };
  }, [data]);
  


  return (
    <div>
      <ReactECharts option={options} ref={chartRef} />
    </div>
  )
}
