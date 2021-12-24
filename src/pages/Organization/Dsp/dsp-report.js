import {EntityTypes} from 'constants/report';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
//---> Build-in Modules
import React from 'react';
//---> External Modules
import {useParams} from 'react-router-dom';

import DspLayout from './dsp-layout';

const DspReport = () => {
  const {dspId} = useParams();

  return (
    <DspLayout pageTitle="Dsp Reports">
      <EntityReport
        entity={EntityTypes.DSP}
        entityId={dspId}
        ownerId={dspId}
        ownerRole={USER_ROLE.DSP}
      />
    </DspLayout>
  );
};

export default DspReport;
