import * as React from 'react';
import {ButtonGroup, Button} from 'reactstrap';
import {useFormContext} from 'react-hook-form';
import {INPUT_NAME, METRIC_TIMERANGES} from 'constants/report';

export default function TimeRange({defaultValue}) {
  const {register, setValue, errors} = useFormContext();
  const [activeTimeRange, setActiveTimeRange] = React.useState(null);
  const error = errors?.api?.time_range || undefined;

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();
    setActiveTimeRange(selectedOption);
    setValue(INPUT_NAME.TIME_RANGE, JSON.stringify(selectedOption), {
      shouldValidate: true,
      shouldDirty: true
    });
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
      {error && <div className="error-msg">Please select time range</div>}
    </div>
  );
}
