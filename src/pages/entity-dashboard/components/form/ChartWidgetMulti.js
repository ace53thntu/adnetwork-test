import React from 'react';
import {UncontrolledTooltip} from 'reactstrap';

const ChartWidgetMulti = ({type = 'multiline', style}) => {
  const colorVal = type === 'multiline' ? 'success' : 'primary';

  return (
    <>
      <div
        id={`UncontrolledTooltip${type}Chart`}
        className={`card widget-chart widget-chart2 text-left card-btm-border card-shadow-${colorVal} border-${colorVal}`}
        style={style}
      >
        <div className="widget-chat-wrapper-outer">
          <div>
            {(type === 'multiline' || type === 'line') && <div>line</div>}
            {type === 'pie' && <div>Pie</div>}
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

export default React.memo(ChartWidgetMulti);
