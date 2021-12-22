import React from 'react';
import {Sparklines, SparklinesBars, SparklinesCurve} from 'react-sparklines';
import {UncontrolledTooltip} from 'reactstrap';

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w;

  return (function () {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}
function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}
const sampleData = randomData(10);

const ChartWidget = ({type = 'line', style}) => {
  const colorVal = type === 'line' ? 'success' : 'primary';
  return (
    <>
      <div
        id={`UncontrolledTooltip${type}Chart`}
        className={`card widget-chart widget-chart2 text-left card-btm-border card-shadow-${colorVal} border-${colorVal}`}
        style={style}
      >
        <div className="widget-chat-wrapper-outer">
          <div>
            {type === 'line' ? (
              <Sparklines data={sampleData}>
                <SparklinesCurve
                  style={{
                    strokeWidth: 3,
                    stroke: 'var(--success)',
                    fill: 'none'
                  }}
                />
              </Sparklines>
            ) : (
              <Sparklines data={sampleData}>
                <SparklinesBars
                  style={{stroke: 'white', fill: '#4361ee', fillOpacity: '1'}}
                />
              </Sparklines>
            )}
          </div>
        </div>
      </div>
      <UncontrolledTooltip
        placement="bottom"
        target={`UncontrolledTooltip${type}Chart`}
      >
        <span className="text-capitalize">{`${type} chart`}</span>
      </UncontrolledTooltip>
    </>
  );
};

export default React.memo(ChartWidget);
