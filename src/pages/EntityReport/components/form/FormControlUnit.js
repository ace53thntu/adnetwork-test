import {INPUT_NAME} from 'constants/report';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {ButtonGroup, Button, Row, Col} from 'reactstrap';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export default function FormControlUnit({defaultValue}) {
  const [activeUnit, setActiveUnit] = React.useState(null);

  const {watch, register, setValue, errors} = useFormContext();
  const error = errors?.api?.unit || undefined;
  const timeRangeSelected = watch('api.time_range');

  const units = React.useMemo(() => {
    try {
      return JSON.parse(timeRangeSelected)?.units || [];
    } catch (error) {
      return null;
    }
  }, [timeRangeSelected]);

  const allowSelect = units?.length > 1 ? true : false; //---> Only allow select when having larger 2 unit

  const onClickTimeRange = (evt, selectedOption) => {
    evt.preventDefault();
    setActiveUnit(selectedOption);
    setValue(INPUT_NAME.UNIT, JSON.stringify(selectedOption), {
      shouldValidate: true,
      shouldDirty: true
    });
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
              <Button
                key={`pr-${index}`}
                style={{fontSize: '12px', textTransform: 'capitalize'}}
                onClick={evt => onClickTimeRange(evt, item)}
                color="warning"
                outline
                active={!allowSelect || activeUnit?.value === item?.value}
                disabled={!allowSelect}
                size="small"
              >
                {item?.label}
              </Button>
            ))}
          </ButtonGroup>
          {error && <div className="error-msg">Please select unit</div>}
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
