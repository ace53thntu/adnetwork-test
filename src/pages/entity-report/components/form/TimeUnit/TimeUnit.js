//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';
import {ButtonGroup, Row, Col} from 'reactstrap';

//---> Internal Modules
import {REPORT_INPUT_NAME, TimeUnits} from 'constants/report';

//---> Styles
import {ErrorMessageStyled} from '../styled';
import TimeUnitItem from './TimeUnitItem';
import {getTimeUnitsFromTimeRange} from 'pages/entity-report/utils/getTimeUnitsFromTimeRange';
import {useIsChartCompareInForm} from 'pages/entity-report/hooks';

const unitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;

const propTypes = {
  defaultTimeRange: PropTypes.string,
  defaultTimeUnit: PropTypes.string
};

export default function TimeUnit({
  defaultTimeRange = '',
  defaultTimeUnit = ''
}) {
  const isChartCompare = useIsChartCompareInForm();
  const {watch, register, setValue, errors} = useFormContext();
  const error = errors?.api?.time_unit || undefined;
  const timeRangeSelected = watch('api.time_range');
  const timeUnitSelect = watch(unitName);

  //---> Get units by time range
  const units = React.useMemo(
    () => getTimeUnitsFromTimeRange({timeRange: timeRangeSelected}),
    [timeRangeSelected]
  );

  //---> Only allow select when having larger 2 unit
  const allowSelect = React.useMemo(() => (units?.length > 1 ? true : false), [
    units?.length
  ]);

  React.useEffect(() => {
    //---> Reset select unit when time range changed
    if (timeRangeSelected !== defaultTimeRange) {
      try {
        const unitFromTimeRange = getTimeUnitsFromTimeRange({
          timeRange: timeRangeSelected
        });
        const existedUnit = unitFromTimeRange.find(
          item => item.value === timeUnitSelect
        );
        if (!existedUnit) {
          //---> Only reset if new time range select not include current unit
          //---> Always init default time unit when change time range
          setValue(unitName, unitFromTimeRange?.[0]?.value, {
            shouldValidate: true,
            shouldDirty: true
          });
        }
      } catch (err) {}
    }
  }, [
    defaultTimeRange,
    isChartCompare,
    setValue,
    timeRangeSelected,
    timeUnitSelect
  ]);

  //---> Handle time unit when the chart is compared chart (pie/bar)
  React.useEffect(() => {
    if (isChartCompare && defaultTimeUnit === TimeUnits.GLOBAL) {
      return;
    }

    if (isChartCompare) {
      setValue(unitName, TimeUnits.GLOBAL, {
        shouldValidate: true,
        shouldDirty: true
      });
    } else {
      if (timeRangeSelected === defaultTimeRange || !defaultTimeRange) {
        const unitFromTimeRange = getTimeUnitsFromTimeRange({
          timeRange: timeRangeSelected
        });

        if (!unitFromTimeRange.find(item => item.value !== defaultTimeUnit)) {
          //---> Only reset if new time range select not include current unit
          setValue(unitName, unitFromTimeRange?.[0]?.value, {
            shouldValidate: true,
            shouldDirty: true
          });
        } else {
          setValue(unitName, defaultTimeUnit, {
            shouldValidate: true,
            shouldDirty: true
          });
        }
      }
    }
  }, [
    setValue,
    isChartCompare,
    timeRangeSelected,
    defaultTimeUnit,
    defaultTimeRange
  ]);

  const isRender = React.useMemo(
    () => timeRangeSelected && timeRangeSelected !== 'null',
    [timeRangeSelected]
  );

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();
    setValue(unitName, selectedOption?.value, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return isRender ? (
    <Row className="ml-2" style={{display: isChartCompare ? 'none' : 'flex'}}>
      <Col md={12} className="d-flex align-items-start">
        <div className="mr-2 font-weight-bold">Unit</div>
        <div>
          <ButtonGroup size="small">
            {units?.map((item, index) => (
              <TimeUnitItem
                key={`pr-${index}`}
                onClickTimeRange={evt => onClickTimeRange(evt, item)}
                readOnly={!allowSelect}
                active={!allowSelect || item?.value === timeUnitSelect}
                label={item?.label}
              />
            ))}
          </ButtonGroup>
          {error && <ErrorMessageStyled>Please select unit</ErrorMessageStyled>}
        </div>

        <input name={unitName} ref={register()} type="hidden" />
      </Col>
    </Row>
  ) : null;
}

TimeUnit.propTypes = propTypes;
