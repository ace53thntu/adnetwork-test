import PropTypes from 'prop-types';
import * as React from 'react';
import {Card} from 'reactstrap';

function Count(props) {
  const {type, className, label, count} = props;

  return (
    <Card
      className={`card-shadow-${type} widget-chart widget-chart2 text-left border-${type} card-btm-border ${className}`}
    >
      <div className="widget-chat-wrapper-outer">
        <div className="widget-chart-content">
          <h6 className="widget-subheading">{label}</h6>
          <div className="widget-chart-flex">
            <div className="widget-numbers mb-0 w-100">
              <div className="widget-chart-flex">
                <div className="fsize-4">{count}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

Count.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.string
};
Count.defaultProps = {
  count: '',
  label: 'Pages',
  type: 'primary',
  className: ''
};

export default Count;
