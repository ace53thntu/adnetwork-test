//---> Build-in Modules

import React from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {REPORT_INPUT_NAME} from 'constants/report';

const ConfigChart = ({chartTypeDefault, colorDefault, children}) => {
  const {register} = useFormContext();

  // React.useEffect(() => {
  //   setValue(
  //     `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
  //     chartTypeDefault
  //   );
  // }, [chartTypeDefault, setValue]);

  // React.useEffect(() => {
  //   setValue(
  //     `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
  //     colorDefault
  //   );
  // }, [chartTypeDefault, colorDefault, setValue]);

  return (
    <div className="d-flex">
      {/* Custom dropdown select chart type */}
      {children}

      {/* Register hidden inputs to submit to API */}
      <input
        type="hidden"
        name={`${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`}
        ref={register()}
      />
      <input
        type="hidden"
        name={`${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`}
        ref={register()}
      />
    </div>
  );
};

export default ConfigChart;
