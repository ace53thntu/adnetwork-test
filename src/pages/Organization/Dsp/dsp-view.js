import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {useParams} from 'react-router-dom';

import DspLayout from './dsp-layout';
import {useGetDsp} from 'queries/dsp';

const DspView = ({children}) => {
  const {dspId} = useParams();
  const {data: dsp} = useGetDsp(dspId);
  return (
    <DspLayout pageTitle="Dsp Details">
      <Card>
        <CardHeader>Dsp name: {dsp?.name}</CardHeader>
        <CardBody></CardBody>
      </Card>
    </DspLayout>
  );
};

export default React.memo(DspView);
