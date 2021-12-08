//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import {AudienceLayout} from './components/audience-layout';

const AudiencePage = () => {
  return <AudienceLayout />;
};

export default React.memo(AudiencePage);
