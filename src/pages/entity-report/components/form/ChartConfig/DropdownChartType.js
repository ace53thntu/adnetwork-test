//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//---> Internal Modules
import {useOnClickOutside} from 'hooks/useOnClickOutside';
import {ChartTypes} from 'constants/report';
import ColorSliderContainer from './ColorSlider';
import ChartTypeSelect from './ChartTypeSelect';
import '../../../styles/styles.scss';
import {useIsChartCompareInForm} from 'pages/entity-report/hooks';

const DropdownChartType = ({metricSet = [], defaultChartType = ''}) => {
  const isChartCompare = useIsChartCompareInForm();

  const initChartTypes = React.useMemo(() => {
    if (isChartCompare) {
      return [ChartTypes.PIE, ChartTypes.BAR];
    }
    return [ChartTypes.LINE, ChartTypes.BAR];
  }, [isChartCompare]);

  const [showDropdown, setShowDropdown] = React.useState(false);
  const ref = React.useRef();
  //---> Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setShowDropdown(false));

  function onClickDropdown(evt) {
    evt.preventDefault();
    setShowDropdown(true);
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
          {!isChartCompare && false && (
            <div className="c-menu-item mb-2" style={{display: isChartCompare}}>
              <ColorSliderContainer />
            </div>
          )}

          <div className="c-menu-item">
            <div className="font-weight-bold mb-1">Chart</div>
            <ChartTypeSelect
              chartTypeList={initChartTypes}
              metricSet={metricSet}
              defaultChartType={defaultChartType}
            />
          </div>
        </div>
      </div>
    </>
  );
};

DropdownChartType.propTypes = {
  metricSet: PropTypes.array,
  isChartCompare: PropTypes.bool,
  defaultChartType: PropTypes.string
};

export default DropdownChartType;
