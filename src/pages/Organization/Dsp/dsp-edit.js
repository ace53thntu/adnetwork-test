//---> Build-in Modules
import {LoadingIndicator} from 'components/common';
import {useGetDsp} from 'queries/dsp';
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {DspForm} from './components';
import DspLayout from './dsp-layout';

const DspEdit = () => {
  const {dspId} = useParams();
  const {data: dspData, isFetching} = useGetDsp(dspId, !!dspId);

  return (
    <DspLayout pageTitle="Dsp Edit">
      {isFetching && <LoadingIndicator />}
      {dspData && <DspForm dspData={dspData} isEdit />}
    </DspLayout>
  );
};

export default React.memo(DspEdit);
