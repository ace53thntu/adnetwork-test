//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import EntityReport from 'pages/entity-report';
import DspLayout from './dsp-layout';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';

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
