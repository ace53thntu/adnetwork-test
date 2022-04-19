import React from 'react';

export const useChartOptions = ({format, title = '', unit = ''}) => {
  return React.useMemo(() => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: !!title,
          text: title
        }
      },
      scales: {
        x: {
          type: 'time',
          gridLines: {
            lineWidth: 2
          },
          time: {
            // parser: format,
            tooltipFormat: format,
            unit
          }
          // ticks: {
          //   source: 'labels',
          //   callback: function (value, index) {
          //     console.log(' ==== callback', this.getLabelForValue(value));
          //   }
          // }
        },
        y: {
          beginAtZero: true
        }
      }
      // options: {
      //   scales: {
      //     x: {
      //       type: 'time',
      //       gridLines: {
      //         lineWidth: 2
      //       },
      //       time: {
      //         parser: format,
      //         tooltipFormat: format,
      //         unit
      //       },
      //       ticks: {
      //         source: 'labels',
      //         callback: function (value, index) {
      //           console.log(' ==== callback', this.getLabelForValue(value));
      //         }
      //       },
      //       color: 'red'
      //     },
      //     y: {
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }
      //   }
      // }
    };
    return options;
  }, [format, title, unit]);
};
