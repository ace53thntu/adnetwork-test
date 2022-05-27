import React from 'react';
import {PublisherForm} from './components';
import PublisherLayout from './publisher-layout';

const PublisherCreate = () => {
  return (
    <PublisherLayout pageTitle="Publisher create">
      <div>
        <PublisherForm />
      </div>
    </PublisherLayout>
  );
};

export default React.memo(PublisherCreate);
