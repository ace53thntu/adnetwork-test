import {LoadingIndicator} from 'components/common';
import {QueryStatuses} from 'constants/react-query';
import {useGetTrackerTemplate} from 'queries/tracker-template';
import React from 'react';
import {useParams} from 'react-router-dom';
import TrackerTemplateForm from './components/tracker-template.form';
import TrackerTemplateLayout from './TrackerTemplateLayout';

const TrackerTemplateEdit = () => {
  const {trkTemplateId} = useParams();
  const {data: trackerTemplate, isLoading, status} = useGetTrackerTemplate({
    trackTempId: trkTemplateId,
    enabled: !!trkTemplateId
  });

  return (
    <TrackerTemplateLayout pageTitle="Tracker template edit">
      {isLoading && <LoadingIndicator />}
      {status === QueryStatuses.SUCCESS && (
        <TrackerTemplateForm trackerTemplate={trackerTemplate} isEdit />
      )}
    </TrackerTemplateLayout>
  );
};

export default TrackerTemplateEdit;
