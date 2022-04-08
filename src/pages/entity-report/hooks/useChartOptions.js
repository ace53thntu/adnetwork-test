import React from 'react';

export const useChartOptions = ({format, title = ''}) => {
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
        },
        scales: {
          x: {
            type: 'time',
            gridLines: {
              lineWidth: 2
            },
            time: {
              parser: format,
              tooltipFormat: 'DD/MM/YYYY HH:mm:ss'
            },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              major: {
                enabled: true
              },
              font: function (context) {
                if (context.tick && context.tick.major) {
                  return {
                    weight: 'bold'
                  };
                }
              }
            }
          },
          y: {
            ticks: {
              beginAtZero: true
            }
          }
        }
      }
    };
    return options;
  }, [format, title]);
};
