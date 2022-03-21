//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {ButtonGroup, Row, Col} from 'reactstrap';

//---> Internal Modules
import {getDistributionUnits} from 'pages/entity-report/utils/getDistributionUnit';
import {ErrorMessageStyled, UnitButton} from './styled';
import {
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {useFormContext} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {REPORT_INPUT_NAME} from 'constants/report';
import {validArray} from 'utils/helpers/dataStructure.helpers';

const propTypes = {
  defaultValue: PropTypes.object,
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date)
};

const unitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;

const DistributionUnit = ({defaultValue, startTime, endTime}) => {
  console.log(
    '🚀 ~ file: DistributionUnit.js ~ line 29 ~ DistributionUnit ~ defaultValue',
    defaultValue
  );
  const dispatch = useDispatch();
  const metricBody = useMetricsBodySelector();
  const [activeUnit, setActiveUnit] = React.useState(null);

  const {register, setValue, errors} = useFormContext();
  const error = errors?.api?.time_unit || undefined;
  const units = React.useMemo(() => {
    return getDistributionUnits({startTime, endTime}) || [];
  }, [endTime, startTime]);
  console.log('🚀 ~ file: TimeUnit.js ~ line 45 ~ distributionUnits', units);
  const allowSelect = units?.length > 1 ? true : false; //---> Only allow select when having larger 2 unit

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();
    setActiveUnit(selectedOption);
    setValue(unitName, JSON.stringify(selectedOption), {
      shouldValidate: true,
      shouldDirty: true
    });

    if (metricBody?.time_unit !== activeUnit?.value) {
      dispatch(
        setMetricBodyRedux({
          ...metricBody,
          time_unit: activeUnit?.value
        })
      );
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

  return (
    <>
      <Row className="ml-2">
        <Col md={12} className="d-flex flex-column align-items-start">
          <div className="mr-2 font-weight-bold mb-2">Unit</div>
          <div>
            <ButtonGroup size="small">
              {units?.map((item, index) => (
                <UnitButton
                  key={`pr-${index}`}
                  style={{fontSize: '12px', textTransform: 'capitalize'}}
                  onClick={evt => onClickTimeRange(evt, item)}
                  color="warning"
                  outline
                  active={!allowSelect || activeUnit?.value === item?.value}
                  readOnly={!allowSelect}
                  size="small"
                >
                  {item?.label}
                </UnitButton>
              ))}
            </ButtonGroup>
            {error && (
              <ErrorMessageStyled>Please select unit</ErrorMessageStyled>
            )}
          </div>

          <input
            name={unitName}
            value={JSON.stringify(activeUnit) || ''}
            ref={register()}
            type="hidden"
          />
        </Col>
      </Row>
    </>
  );
};

DistributionUnit.propTypes = propTypes;

export default DistributionUnit;
