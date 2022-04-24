//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Tooltip} from '@material-ui/core';
import {useFormContext} from 'react-hook-form';
import PropTypes from 'prop-types';

//---> Internal Modules
import {ChartTypes, REPORT_INPUT_NAME} from 'constants/report';
import PieSparkline from '../PieSparkline';
import BarSparkline from '../BarSparkline';
import LineSparkline from '../LineSparkline';
import {useIsChartCompareInForm} from 'pages/entity-report/hooks';

const chartTypeName = `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`;

const propTypes = {
  chartTypeList: PropTypes.array,
  metricSet: PropTypes.any,
  defaultChartType: PropTypes.string
};

const ChartTypeSelect = ({
  chartTypeList = [],
  metricSet,
  defaultChartType = ''
}) => {
  const {setValue, watch} = useFormContext();
  const isChartCompare = useIsChartCompareInForm();
  const chartTypeSelected = watch(chartTypeName);

  React.useEffect(() => {
    if (
      isChartCompare &&
      [ChartTypes.PIE, ChartTypes.BAR].includes(defaultChartType)
    ) {
      return;
    }
    if (
      isChartCompare &&
      ![ChartTypes.PIE, ChartTypes.BAR].includes(defaultChartType)
    ) {
      console.log('===== 1-1');
      setValue(chartTypeName, ChartTypes.PIE);
    } else if (![ChartTypes.LINE, ChartTypes.BAR].includes(defaultChartType)) {
      console.log('===== 1-2');

      setValue(chartTypeName, ChartTypes.LINE);
    } else {
      console.log('===== 1-3');

      setValue(chartTypeName, defaultChartType);
    }
  }, [defaultChartType, isChartCompare, setValue]);

  const onClickChartType = React.useCallback(
    (evt, _chartType) => {
      evt.preventDefault();
      setValue(chartTypeName, _chartType);
    },
    [setValue]
  );

  return (
    <div className="chart-wrap">
      {chartTypeList.map((typeItem, idx) => {
        return (
          <React.Fragment key={`pr-${idx}`}>
            <Tooltip
              title={
                <span className="text-capitalize">{`${typeItem} chart`}</span>
              }
            >
              <div
                id={`tooltip-${typeItem}-chart`}
                className={`c-chart-item ${
                  chartTypeSelected === typeItem ? 'border-activated' : ''
                }`}
                onClick={evt => onClickChartType(evt, typeItem)}
              >
                {typeItem === ChartTypes.PIE && <PieSparkline />}
                {typeItem === ChartTypes.BAR && <BarSparkline />}
                {typeItem === ChartTypes.LINE && (
                  <LineSparkline metricSet={metricSet} />
                )}
              </div>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </div>
  );
};

ChartTypeSelect.propTypes = propTypes;

export default ChartTypeSelect;
