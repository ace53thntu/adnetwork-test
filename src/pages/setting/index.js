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

export {DomainListPage, DomainGroupListPage, KeywordListPage};
