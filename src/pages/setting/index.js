import {ErrorBoundary} from 'components/common';
import React from 'react';

const DomainList = React.lazy(() =>
  import('./domain/DomainList' /* webpackChunkName: "domain-list" */)
);

function DomainListPage() {
  return (
    <ErrorBoundary>
      <DomainList />
    </ErrorBoundary>
  );
}

const DomainGroupList = React.lazy(() =>
  import(
    './domain-group/DomainGroupList' /* webpackChunkName: "domain-group-list" */
  )
);

function DomainGroupListPage() {
  return (
    <ErrorBoundary>
      <DomainGroupList />
    </ErrorBoundary>
  );
}

const KeywordList = React.lazy(() =>
  import('./keyword-list/KeywordList' /* webpackChunkName: "keyword-lists" */)
);

function KeywordListPage() {
  return (
    <ErrorBoundary>
      <KeywordList />
    </ErrorBoundary>
  );
}

const PositionList = React.lazy(() =>
  import('./position/PositionList' /* webpackChunkName: "position-list" */)
);

function PositionListPage() {
  return (
    <ErrorBoundary>
      <PositionList />
    </ErrorBoundary>
  );
}

const TrackerTemplateList = React.lazy(() =>
  import(
    './tracker-template/TrackerTemplateList' /* webpackChunkName: "tracker-template-list" */
  )
);

const TrackerTemplateCreate = React.lazy(() =>
  import(
    './tracker-template/TrackerTemplateCreate' /* webpackChunkName: "tracker-template-create" */
  )
);

const TrackerTemplateEdit = React.lazy(() =>
  import(
    './tracker-template/TrackerTemplateEdit' /* webpackChunkName: "tracker-template-edit" */
  )
);

function TrackerTemplateListPage() {
  return (
    <ErrorBoundary>
      <TrackerTemplateList />
    </ErrorBoundary>
  );
}

function TrackerTemplateCreatePage() {
  return (
    <ErrorBoundary>
      <TrackerTemplateCreate />
    </ErrorBoundary>
  );
}

function TrackerTemplateEditPage() {
  return (
    <ErrorBoundary>
      <TrackerTemplateEdit />
    </ErrorBoundary>
  );
}

const TrackerList = React.lazy(() =>
  import('./tracker/TrackerList' /* webpackChunkName: "tracker-list" */)
);

function TrackerListPage() {
  return (
    <ErrorBoundary>
      <TrackerList />
    </ErrorBoundary>
  );
}

const LocationList = React.lazy(() =>
  import('./location/LocationList' /* webpackChunkName: "location-list" */)
);

function LocationListPage() {
  return (
    <ErrorBoundary>
      <LocationList />
    </ErrorBoundary>
  );
}

export {
  DomainListPage,
  DomainGroupListPage,
  KeywordListPage,
  PositionListPage,
  TrackerTemplateListPage,
  TrackerTemplateCreatePage,
  TrackerTemplateEditPage,
  TrackerListPage,
  LocationListPage
};
