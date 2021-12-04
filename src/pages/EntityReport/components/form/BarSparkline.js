import React from 'react';
import Chart from 'react-apexcharts';

const WIDTH = 90;
const HEIGHT = 70;

const BarSparkline = ({metricSet = []}) => {
  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 55, 60, 70, 91]
    }
  ];

  const config = {
    options: {
      chart: {
        id: 'basic-spartline',
        sparkline: {
          enabled: true
        }
      },
      tooltip: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      },
      colors: ['#4361ee', '#bc6c25']
    },
    series
  };

  return (
    <>
      <Chart
        options={config.options}
        series={config.series}
        type="bar"
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

export default React.memo(BarSparkline);
