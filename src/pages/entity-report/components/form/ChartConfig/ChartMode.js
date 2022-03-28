import {ChartModes, REPORT_INPUT_NAME} from 'constants/report';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Button, ButtonGroup} from 'reactstrap';
import {
  setChartModeRedux,
  useChartModeSelector
} from 'store/reducers/entity-report';

const ModeList = [ChartModes.BY, ChartModes.CUMULATIVE];
const modeName = `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.MODE}`;
const ChartMode = ({defaultValue}) => {
  const dispatch = useDispatch();
  const chartMode = useChartModeSelector();
  const {watch, setValue, register, unregister} = useFormContext();
  const unitSelected = watch(
    `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`
  );
  const unitText = React.useMemo(() => {
    try {
      if (typeof unitSelected === 'string') {
        return JSON.parse(unitSelected)?.label;
      }
      return unitSelected?.label;
    } catch (err) {
      return '';
    }
  }, [unitSelected]);

  React.useEffect(
    function initializingChartMode() {
      dispatch(setChartModeRedux(defaultValue));
    },
    [defaultValue, dispatch]
  );

  function onChangeChartMode(evt, _mode) {
    evt.preventDefault();
    setValue(modeName, _mode);
    dispatch(setChartModeRedux(_mode));
  }

  return (
    <div>
      <ButtonGroup className="ml-2" size="small">
        {ModeList.map((item, idx) => (
          <Button
            key={`pr-${idx}`}
            color="primary"
            outline
            size="small"
            active={item === chartMode}
            className="text-capitalize"
            type="button"
            onClick={evt => onChangeChartMode(evt, item)}
          >
            {idx === 0 ? `By ${unitText}` : item}
          </Button>
        ))}
      </ButtonGroup>
      <CustomInput
        register={register}
        unregister={unregister}
        setValue={setValue}
        name={modeName}
        defaultValue={defaultValue}
      />
    </div>
  );
};

const CustomInput = React.memo(
  ({register, unregister, setValue, name, defaultValue}) => {
    React.useEffect(() => {
      register({name});
      return () => unregister(name);
    }, [name, register, unregister]);

    React.useEffect(() => {
      setValue(name, defaultValue);
    }, [defaultValue, name, setValue]);

    return <input type="hidden" name={name} />;
  }
);

export default ChartMode;
