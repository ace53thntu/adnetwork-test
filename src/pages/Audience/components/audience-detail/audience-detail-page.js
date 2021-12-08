//---> Build-in Modules
import React from 'react';
import {AudienceContentLayout} from '../audience-layout';

//---> Internal Modules
import AudienceDetail from './audience-detail';

const AudienceDetailPage = props => {
  return (
    <AudienceContentLayout heading="Audience Detail">
      <AudienceDetail />
    </AudienceContentLayout>
  );
};

export default React.memo(AudienceDetailPage);
