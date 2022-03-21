import * as React from 'react';
import {ButtonGroup, Button} from 'reactstrap';
import {useFormContext, useWatch} from 'react-hook-form';
import {REPORT_INPUT_NAME, METRIC_TIMERANGES} from 'constants/report';
import {validTimeRange} from 'pages/entity-report/utils/validateReportTime';
import {ErrorMessageStyled} from './styled';
import {useDispatch} from 'react-redux';
import {
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';

const timeRangeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIME_RANGE}`;
const unitName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`;

export default function TimeRange({defaultValue}) {
  const dispatch = useDispatch();
  const metricBodyRequest = useMetricsBodySelector();
  const {register, setValue, errors, control} = useFormContext();
  const currentUnit = useWatch({name: unitName, control});

  const [activeTimeRange, setActiveTimeRange] = React.useState(null);
  const error = errors?.api?.time_range || undefined;

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();

    setActiveTimeRange(selectedOption);
    setValue(timeRangeName, JSON.stringify(selectedOption), {
      shouldValidate: true,
      shouldDirty: true
    });
    console.log(
      '===== validate time range',
      selectedOption,
      validTimeRange({
        timeRange: selectedOption,
        unit: currentUnit?.value
      })
    );
    if (
      validTimeRange({
        timeRange: selectedOption,
        unit: currentUnit?.value
      })
    ) {
      if (metricBodyRequest.time_range !== selectedOption.value) {
        const timeUnit =
          selectedOption?.units?.length === 1
            ? selectedOption?.units[0]?.value
            : metricBodyRequest.time_unit;
        dispatch(
          setMetricBodyRedux({
            ...metricBodyRequest,
            time_range: selectedOption.value,
            time_unit: timeUnit
          })
        );
      }
    }
  };

  React.useEffect(() => {
    try {
      const timeRangeParsed = JSON.parse(defaultValue);
      setActiveTimeRange(timeRangeParsed);
      setValue(timeRangeName, defaultValue, {
        shouldValidate: false,
        shouldDirty: false
      });
    } catch (error) {}
  }, [defaultValue, setValue]);

  React.useEffect(() => {}, []);

  return (
    <div>
      <div>
        <ButtonGroup size="small">
          {METRIC_TIMERANGES.map((item, index) => (
            <Button
              key={`pr-${index}`}
              style={{fontSize: '12px', textTransform: 'capitalize'}}
              onClick={evt => onClickTimeRange(evt, item)}
              color="primary"
              outline
              active={activeTimeRange?.value === item?.value}
            >
              {item?.label}
            </Button>
          ))}
        </ButtonGroup>
        <input
          name={timeRangeName}
          value={JSON.stringify(activeTimeRange) || ''}
          ref={register()}
          type="hidden"
        />
      </div>
      {error && (
        <ErrorMessageStyled>Please select time range</ErrorMessageStyled>
      )}
    </div>
  );
}
