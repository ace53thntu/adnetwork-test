import {INPUT_NAME} from 'constants/report';
import {validTimeRange} from 'pages/entity-report/utils/validateReportTime';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {ButtonGroup, Row, Col} from 'reactstrap';
import {
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {ErrorMessageStyled, UnitButton} from './styled';

export default function TimeUnit({defaultValue}) {
  const dispatch = useDispatch();
  const metricBody = useMetricsBodySelector();
  const [activeUnit, setActiveUnit] = React.useState(null);

  const {watch, register, setValue, errors} = useFormContext();
  const error = errors?.api?.time_unit || undefined;
  const timeRangeSelected = watch('api.time_range');

  React.useEffect(() => {
    //---> Reset select unit when time range changed
    if (typeof timeRangeSelected === 'string') {
      try {
        const timeRangeParsed = JSON.parse(timeRangeSelected);
        const existedUnit = timeRangeParsed?.units?.find(
          item => item.value === defaultValue?.value
        );
        if (!existedUnit) {
          //---> Only reset if new time range select not include current unit
          setActiveUnit(null);
          setValue(INPUT_NAME.UNIT, '', {
            shouldValidate: true,
            shouldDirty: true
          });
        }
      } catch (err) {}
    }
  }, [defaultValue?.value, setValue, timeRangeSelected]);

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
    console.log(
      '🚀 ~ file: FormControlUnit.js ~ line 62 ~ onClickTimeRange ~ selectedOption',
      selectedOption
    );
    evt.preventDefault();
    setActiveUnit(selectedOption);
    setValue(INPUT_NAME.UNIT, JSON.stringify(selectedOption), {
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
      setValue(INPUT_NAME.UNIT, JSON.stringify(units[0]), {
        shouldValidate: true,
        shouldDirty: true
      });
      setActiveUnit(units[0]);
    }
  }, [setValue, units]);

  React.useEffect(() => {
    setValue(INPUT_NAME.UNIT, JSON.stringify(defaultValue), {
      shouldValidate: true,
      shouldDirty: true
    });
    setActiveUnit(defaultValue);
  }, [setValue, defaultValue]);

  return timeRangeSelected && timeRangeSelected !== 'null' ? (
    <Row className="ml-2">
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
                active={!allowSelect || activeUnit?.value === item?.value}
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
          name={INPUT_NAME.UNIT}
          value={JSON.stringify(activeUnit) || ''}
          ref={register()}
          type="hidden"
        />
      </Col>
    </Row>
  ) : null;
}
