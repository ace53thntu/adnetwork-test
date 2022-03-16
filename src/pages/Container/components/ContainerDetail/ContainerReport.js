//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
import {EntityTypes} from 'constants/report';
import {ContainerBodyLayout} from '../Layouts';
import {useTranslation} from 'react-i18next';

const ContainerReport = () => {
  const {t} = useTranslation();
  const {cid: containerId} = useParams();

  return (
    <ContainerBodyLayout heading={t('containerReport')} subHeading="">
      <EntityReport
        entity={EntityTypes.CONTAINER}
        entityId={containerId}
        ownerId={containerId}
        ownerRole={USER_ROLE.PUBLISHER}
      />
    </ContainerBodyLayout>
  );
};

export default React.memo(ContainerReport);
