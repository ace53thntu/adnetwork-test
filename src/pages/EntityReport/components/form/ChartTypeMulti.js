import React from 'react';
import ChartWidgetMulti from './ChartWidgetMulti';
import '../../styles/styles.scss';

//---> Define constants
const CHART_TYPES = ['line', 'pie'];

export default function ChartTypeMulti({
  onSelectType,
  typeSelected = 'multiline'
}) {
  return (
    <div className="d-flex justify-content-between w-100">
      {CHART_TYPES.map((item, idx) => (
        <div
          key={`pr-${idx}`}
          className="flex-1 pr-1"
          onClick={evt => onSelectType(item)}
        >
          <ChartWidgetMulti
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
