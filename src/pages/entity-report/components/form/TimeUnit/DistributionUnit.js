//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {ButtonGroup, Row, Col} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {REPORT_INPUT_NAME, TimeUnits} from 'constants/report';
import {getDistributionUnits} from 'pages/entity-report/utils/getDistributionUnit';
import TimeUnitItem from './TimeUnitItem';
import {ErrorMessageStyled} from '../styled';
import {useIsChartCompareInForm} from 'pages/entity-report/hooks';

const propTypes = {
  defaultValue: PropTypes.object,
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date)
};

const unitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;

const DistributionUnit = ({defaultValue, startTime, endTime}) => {
  const {watch} = useFormContext();
  const isChartCompare = useIsChartCompareInForm();
  const timeUnitSelect = watch(unitName);

  const {register, setValue, errors} = useFormContext();
  const error = errors?.api?.time_unit || undefined;

  const units = React.useMemo(() => {
    return getDistributionUnits({startTime, endTime}) || [];
  }, [endTime, startTime]);

  const allowSelect = units?.length > 1 ? true : false; //---> Only allow select when having larger 2 unit

  React.useEffect(() => {
    if (isChartCompare) {
      setValue(unitName, TimeUnits.GLOBAL, {
        shouldValidate: true,
        shouldDirty: true
      });
    } else {
      //---> Only reset if new time range select not include current unit
      setValue(unitName, units?.[0]?.value, {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  }, [setValue, isChartCompare, units]);

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();
    setValue(unitName, selectedOption?.value, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <>
      <Row className="ml-2">
        <Col md={12} className="d-flex flex-column align-items-start">
          <div className="mr-2 font-weight-bold mb-2">Unit</div>
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
            {error && (
              <ErrorMessageStyled>Please select unit</ErrorMessageStyled>
            )}
          </div>

          <input name={unitName} ref={register()} type="hidden" />
        </Col>
      </Row>
    </>
  );
};

DistributionUnit.propTypes = propTypes;

export default DistributionUnit;
