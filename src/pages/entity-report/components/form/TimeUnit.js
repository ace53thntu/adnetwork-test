//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {ButtonGroup, Row, Col} from 'reactstrap';

//---> Internal Modules
import {ChartTypes, REPORT_INPUT_NAME} from 'constants/report';
import {validTimeRange} from 'pages/entity-report/utils/validateReportTime';
import {
  setMetricBodyRedux,
  useChartTypeSelectedSelector,
  useIsChartCompareSelector,
  useMetricsBodySelector,
  useTimeUnitSelector
} from 'store/reducers/entity-report';
import {validArray} from 'utils/helpers/dataStructure.helpers';

//---> Styles
import {ErrorMessageStyled, UnitButton} from './styled';

const unitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;

const propTypes = {
  defaultValue: PropTypes.object
};

export default function TimeUnit({defaultValue}) {
  const dispatch = useDispatch();
  const timeUnitRedux = useTimeUnitSelector();
  console.log(
    '🚀 ~ file: TimeUnit.js ~ line 34 ~ TimeUnit ~ timeUnitRedux',
    timeUnitRedux
  );

  const metricBody = useMetricsBodySelector();
  const chartTypeRedux = useChartTypeSelectedSelector();
  console.log(
    '🚀 ~ file: TimeUnit.js ~ line 35 ~ TimeUnit ~ chartTypeRedux',
    chartTypeRedux
  );
  const isChartCompare = useIsChartCompareSelector();
  const [activeUnit, setActiveUnit] = React.useState(null);

  const {watch, register, setValue, errors} = useFormContext();
  const error = errors?.api?.time_unit || undefined;
  const timeRangeSelected = watch('api.time_range');

  // React.useEffect(() => {
  //   //---> Reset select unit when time range changed
  //   if (typeof timeRangeSelected === 'string') {
  //     try {
  //       const timeRangeParsed = JSON.parse(timeRangeSelected);
  //       const existedUnit = timeRangeParsed?.units?.find(
  //         item => item.value === defaultValue?.value
  //       );
  //       if (!existedUnit) {
  //         //---> Only reset if new time range select not include current unit
  //         setActiveUnit(null);
  //         setValue(unitName, '', {
  //           shouldValidate: true,
  //           shouldDirty: true
  //         });
  //       }
  //     } catch (err) {}
  //   }
  // }, [defaultValue?.value, setValue, timeRangeSelected]);

  const units = React.useMemo(() => {
    try {
      return JSON.parse(timeRangeSelected)?.units || [];
    } catch (error) {
      return null;
    }
  }, [timeRangeSelected]);

  const allowSelect = units?.length > 1 ? true : false; //---> Only allow select when having larger 2 unit

  function parseTimeRange(timeRange) {
    try {
      return JSON.parse(timeRange);
    } catch (err) {
      return null;
    }
  }

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();
    setActiveUnit(selectedOption);
    setValue(unitName, JSON.stringify(selectedOption), {
      shouldValidate: true,
      shouldDirty: true
    });
    const timeRange = parseTimeRange(timeRangeSelected);

    if (
      validTimeRange({
        timeRange,
        unit: selectedOption?.value
      })
    ) {
      //---> If time range only 1 unit -> using this unit is default,
      //---> Else get unit from user selection.
      const unit = selectedOption?.value || timeRange?.units?.[0]?.value;
      if (metricBody?.time_unit !== unit) {
        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            time_unit: unit,
            time_range: timeRange?.value
          })
        );
      }
    }
  };

  React.useEffect(() => {
    if (validArray({list: units}) && units.length === 1) {
      setValue(unitName, JSON.stringify(units[0]), {
        shouldValidate: true,
        shouldDirty: true
      });
      setActiveUnit(units[0]);
    }
  }, [setValue, units]);

  React.useEffect(() => {
    setValue(unitName, JSON.stringify(defaultValue), {
      shouldValidate: true,
      shouldDirty: true
    });
    setActiveUnit(defaultValue);
  }, [setValue, defaultValue]);

  React.useEffect(() => {
    if (chartTypeRedux === ChartTypes.PIE) {
      setValue(unitName, JSON.stringify({value: 'global', label: 'Global'}), {
        shouldValidate: true,
        shouldDirty: true
      });
      setActiveUnit({value: 'global', label: 'Global'});
    }
  }, [setValue, chartTypeRedux]);

  return timeRangeSelected && timeRangeSelected !== 'null' ? (
    <Row className="ml-2" style={{display: isChartCompare ? 'none' : 'flex'}}>
      <Col md={12} className="d-flex align-items-start">
        <div className="mr-2 font-weight-bold">Unit</div>
        <div>
          <ButtonGroup size="small">
            {units?.map((item, index) => (
              <UnitButton
                key={`pr-${index}`}
                style={{fontSize: '12px', textTransform: 'capitalize'}}
                onClick={evt => onClickTimeRange(evt, item)}
                color="warning"
                outline
                active={!allowSelect || item?.value === timeUnitRedux}
                readOnly={!allowSelect}
                size="small"
              >
                {item?.label}
              </UnitButton>
            ))}
          </ButtonGroup>
          {error && <ErrorMessageStyled>Please select unit</ErrorMessageStyled>}
        </div>

        <input
          name={unitName}
          value={JSON.stringify(activeUnit) || ''}
          ref={register()}
          type="hidden"
        />
      </Col>
    </Row>
  ) : null;
}

TimeUnit.propTypes = propTypes;
