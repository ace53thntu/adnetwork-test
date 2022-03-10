import * as React from 'react';
import {ButtonGroup, Button} from 'reactstrap';
import {useFormContext, useWatch} from 'react-hook-form';
import {INPUT_NAME, METRIC_TIMERANGES} from 'constants/report';
import {validTimeRange} from 'pages/entity-report/utils/validateReportTime';
import {ErrorMessageStyled} from './styled';

export default function TimeRange({defaultValue}) {
  const {register, setValue, errors, control} = useFormContext();
  const currentUnit = useWatch({name: INPUT_NAME.UNIT, control});

  const [activeTimeRange, setActiveTimeRange] = React.useState(null);
  const error = errors?.api?.time_range || undefined;

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();

    setActiveTimeRange(selectedOption);
    setValue(INPUT_NAME.TIME_RANGE, JSON.stringify(selectedOption), {
      shouldValidate: true,
      shouldDirty: true
    });
    if (
      validTimeRange({
        timeRange: selectedOption,
        unit: currentUnit?.value
      })
    ) {
      //---> If time range only 1 unit -> using this unit is default,
      //---> Else get unit from user selection.
      // const unit = currentUnit?.value || selectedOption?.units?.[0]?.value;
      // let newUrl = replaceQueryParam({
      //   url: metricUrl,
      //   paramName: 'range',
      //   paramValue: selectedOption?.value
      // });
      // newUrl = replaceQueryParam({
      //   url: newUrl,
      //   paramName: 'unit',
      //   paramValue: unit
      // });
      // dispatch(setMetricUrlRedux(newUrl));
    }
  };

  React.useEffect(() => {
    setActiveTimeRange(defaultValue);
    setValue(INPUT_NAME.TIME_RANGE, JSON.stringify(defaultValue), {
      shouldValidate: false,
      shouldDirty: false
    });
  }, [defaultValue, setValue]);

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
          name={INPUT_NAME.TIME_RANGE}
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
