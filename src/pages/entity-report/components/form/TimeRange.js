//---> Build-in Modules
import * as React from 'react';

//---> External Modules
import {ButtonGroup, Button} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {REPORT_INPUT_NAME, METRIC_TIMERANGES} from 'constants/report';
import {ErrorMessageStyled} from './styled';

const timeRangeName = `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIME_RANGE}`;

export default function TimeRange({defaultValue}) {
  const {register, setValue, errors, watch} = useFormContext();
  const error = errors?.api?.time_range || undefined;
  const watchTimeRange = watch(timeRangeName);

  // React.useEffect(() => {
  //   setValue(timeRangeName, defaultValue, {
  //     shouldValidate: false,
  //     shouldDirty: false
  //   });
  // }, [defaultValue, setValue]);

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();

    setValue(timeRangeName, selectedOption?.value, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

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
              active={watchTimeRange === item?.value}
            >
              {item?.label}
            </Button>
          ))}
        </ButtonGroup>
        <input name={timeRangeName} ref={register()} type="hidden" />
      </div>
      {error && (
        <ErrorMessageStyled>Please select time range</ErrorMessageStyled>
      )}
    </div>
  );
}
