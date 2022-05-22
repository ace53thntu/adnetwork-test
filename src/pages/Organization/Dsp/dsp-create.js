import React from 'react';
import {DspForm} from './components';
import DspLayout from './dsp-layout';

const DspCreate = () => {
  return (
    <DspLayout pageTitle="Dsp Create">
      <DspForm isCreate />
    </DspLayout>
  );
};

export default React.memo(DspCreate);
