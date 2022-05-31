import React from 'react';
import TrackerTemplateForm from './components/tracker-template.form';
import TrackerTemplateLayout from './TrackerTemplateLayout';

const TrackerTemplateCreate = () => {
  return (
    <TrackerTemplateLayout pageTitle="Tracker template create">
      <TrackerTemplateForm />
    </TrackerTemplateLayout>
  );
};

export default React.memo(TrackerTemplateCreate);
