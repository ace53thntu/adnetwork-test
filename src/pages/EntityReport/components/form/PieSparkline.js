import React from 'react';
import Chart from 'react-apexcharts';

const WIDTH = 90;
const HEIGHT = 70;

const PieSparkline = () => {
  const config = {
    series: [43, 32, 12, 9],
    options: {
      chart: {
        type: 'pie',
        width: WIDTH,
        height: HEIGHT,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        width: 1
      },
      tooltip: {
        enabled: false,
        fixed: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    }
  };

  return (
    <>
      <Chart
        options={config.options}
        series={config.series}
        type="pie"
        height={HEIGHT}
        width={WIDTH}
      />
    </>
  );
};

export default React.memo(PieSparkline);
