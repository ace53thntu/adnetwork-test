//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import LineSparkline from './LineSparkline';
import PieSparkline from './PieSparkline';
import '../../styles/styles.scss';
import ColorSlider from './ColorSlider';
import BarSparkline from './BarSparkline';
import {Tooltip} from '@material-ui/core';

function useOnClickOutside(ref, handler) {
  React.useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

const DropdownChartType = ({
  metricSet = [],
  onChangeColor = () => null,
  onSelectType = () => null,
  colors = [],
  chartType = 'line'
}) => {
  const initChartTypes = React.useMemo(
    () => (metricSet?.length >= 2 ? ['line', 'pie'] : ['line', 'bar']),
    [metricSet?.length]
  );
  const [showDropdown, setShowDropdown] = React.useState(false);
  const ref = React.useRef();
  //---> Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setShowDropdown(false));

  function onClickDropdown(evt) {
    evt.preventDefault();
    setShowDropdown(true);
  }

  function onClickChartType(evt, type) {
    evt.preventDefault();
    onSelectType(type);
  }

  return (
    <>
      <div className="dropdown-chart-type">
        <div className="c-dropdown-btn" onClick={onClickDropdown}>
          <Button outline color="primary">
            <FontAwesomeIcon icon={faCogs} />
          </Button>
        </div>
        <div
          ref={ref}
          className={`c-dropdown-menu ${showDropdown ? 'show' : ''}`}
        >
          <div className="c-menu-item mb-2">
            <div className="color-wrap">
              {colors?.map((colorItem, idx) => {
                return (
                  <div key={`pr-${idx}`} className="c-color-item mb-2">
                    <ColorSlider
                      color={colorItem}
                      onChangeColor={onChangeColor}
                      index={idx}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="c-menu-item">
            <div className="font-weight-bold mb-1">Chart</div>
            <div className="chart-wrap">
              {initChartTypes.map((typeItem, idx) => {
                return (
                  <React.Fragment key={`pr-${idx}`}>
                    <Tooltip
                      title={
                        <span className="text-capitalize">{`${typeItem} chart`}</span>
                      }
                    >
                      <div
                        key={`pr-${idx}`}
                        id={`tooltip-${typeItem}-chart`}
                        className={`c-chart-item ${
                          chartType === typeItem ? 'border-actived' : ''
                        }`}
                        onClick={evt => onClickChartType(evt, typeItem)}
                      >
                        {typeItem === 'pie' && <PieSparkline />}
                        {typeItem === 'bar' && <BarSparkline />}
                        {typeItem === 'line' && (
                          <LineSparkline metricSet={metricSet} />
                        )}
                      </div>
                    </Tooltip>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DropdownChartType.propTypes = {
  metricSet: PropTypes.array,
  onChangeColor: PropTypes.func,
  onSelectType: PropTypes.func,
  colors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  chartType: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default DropdownChartType;
