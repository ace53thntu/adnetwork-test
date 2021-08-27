//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import ContainerSideBar from '../ContainerSideBar';
import AppContent from 'components/layouts/Admin/components/AppContent';

function ContainerTreeTags() {
  return (
    <>
      <ContainerSideBar />
      <AppContent>
        <div>Loading...</div>
      </AppContent>
    </>
  );
}

export default ContainerTreeTags;
