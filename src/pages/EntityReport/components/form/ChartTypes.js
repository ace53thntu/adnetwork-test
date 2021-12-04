import React from 'react';
import ChartWidget from './ChartWidget';
import '../../styles/styles.scss';

//---> Define constants
const CHART_TYPES = ['line', 'bar'];

export default function ChartType({onSelectType, typeSelected = 'line'}) {
  return (
    <div className="d-flex justify-content-between w-100">
      {CHART_TYPES.map((item, idx) => (
        <div
          key={`pr-${idx}`}
          className="flex-1 pr-1"
          onClick={evt => onSelectType(item)}
        >
          <ChartWidget
            style={{
              background:
                typeSelected === item ? 'rgba(0, 0, 0, 0.04)' : '#FFFFFF'
            }}
            type={item}
          />
        </div>
      ))}
    </div>
  );
}
