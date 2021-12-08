//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import {AudienceContentLayout} from '../audience-layout';
import {AudienceList} from '.';

function AudienceListPage(props) {
  return (
    <AudienceContentLayout heading="Audience List">
      <AudienceList />
    </AudienceContentLayout>
  );
}

export default React.memo(AudienceListPage);
