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
import {useOnClickOutside} from 'hooks/useOnClickOutside';
import {useDispatch} from 'react-redux';
import {
  setChartTypeSelectedRedux,
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {ChartTypes} from 'constants/report';

const DropdownChartType = ({
  metricSet = [],
  onChangeColor = () => null,
  onSelectType = () => null,
  colors = [],
  chartType = 'line',
  isChartCompare = false
}) => {
  const dispatch = useDispatch();

  const metricBody = useMetricsBodySelector();

  const initChartTypes = React.useMemo(() => {
    if (isChartCompare) {
      return ['pie', 'line'];
    }
    return ['line', 'bar'];
  }, [isChartCompare]);

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
    dispatch(setChartTypeSelectedRedux(type));
    if (type === ChartTypes.PIE && metricBody.time_unit !== 'global') {
      dispatch(
        setMetricBodyRedux({
          ...metricBody,
          time_unit: 'global'
        })
      );
    }
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
                          chartType === typeItem ? 'border-activated' : ''
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
