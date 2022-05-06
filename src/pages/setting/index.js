import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const DomainList = lazyWithRetry(() =>
  import('./domain/DomainList' /* webpackChunkName: "domain-list" */)
);

function DomainListPage() {
  return (
    <ErrorBoundary>
      <DomainList />
    </ErrorBoundary>
  );
}

const DomainGroupList = lazyWithRetry(() =>
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

const KeywordList = lazyWithRetry(() =>
  import('./keyword-list/KeywordList' /* webpackChunkName: "keyword-lists" */)
);

function KeywordListPage() {
  return (
    <ErrorBoundary>
      <KeywordList />
    </ErrorBoundary>
  );
}

const PositionList = lazyWithRetry(() =>
  import('./position/PositionList' /* webpackChunkName: "position-list" */)
);

function PositionListPage() {
  return (
    <ErrorBoundary>
      <PositionList />
    </ErrorBoundary>
  );
}

const TrackerTemplateList = lazyWithRetry(() =>
  import(
    './tracker-template/TrackerTemplateList' /* webpackChunkName: "tracker-template-list" */
  )
);

function TrackerTemplateListPage() {
  return (
    <ErrorBoundary>
      <TrackerTemplateList />
    </ErrorBoundary>
  );
}

const TrackerList = lazyWithRetry(() =>
  import('./tracker/TrackerList' /* webpackChunkName: "tracker-list" */)
);

function TrackerListPage() {
  return (
    <ErrorBoundary>
      <TrackerList />
    </ErrorBoundary>
  );
}

const LocationList = lazyWithRetry(() =>
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
  TrackerListPage,
  LocationListPage
};
