import React from 'react';
import Chart from 'react-apexcharts';

const WIDTH = 90;
const HEIGHT = 70;

const LineSparkline = ({metricSet = []}) => {
  const series = React.useMemo(() => {
    if (metricSet?.length >= 2) {
      return [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 55, 60, 70, 91]
        },
        {
          name: 'series-2',
          data: [135, 145, 147, 100, 80, 50, 105, 150]
        }
      ];
    } else {
      return [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 55, 60, 70, 91]
        }
      ];
    }
  }, [metricSet?.length]);
  const config = {
    options: {
      chart: {
        id: 'basic-spartline',
        sparkline: {
          enabled: true
        }
      },
      tooltip: {
        enabled: false,
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return '';
            }
          }
        },
        marker: {
          show: false
        }
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
        type="line"
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

export default React.memo(LineSparkline);
