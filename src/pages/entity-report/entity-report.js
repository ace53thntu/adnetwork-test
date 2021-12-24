//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import ReportList from './report-list';
import ReportForm from './report.form';
import {EntityTypes, METRIC_TYPES} from 'constants/report';
import {LoadingIndicator} from 'components/common';
import {useGetReportsInfinite} from 'queries/report/useGetReports';
import {Pagination} from 'components/list/pagination';

const NUMBER_OF_PAGE = 10;

const EntityReport = ({
  entity = EntityTypes.STRATEGY,
  entityId = null,
  ownerId,
  ownerRole
}) => {
  const entityType = entity;
  const distributionBy =
    entityType === EntityTypes.ORGANIZATION ? 'manager' : entityType;
  const metricType = METRIC_TYPES[entity];
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetReportsInfinite({
    params: {
      entity_uuid: entityId,
      entity_type: entityType,
      limit: NUMBER_OF_PAGE
    },
    enabled: true
  });

  const reports = React.useMemo(() => {
    return pages?.reduce((acc, item) => {
      const {items = []} = item;
      return [...acc, ...items];
    }, []);
  }, [pages]);

  return (
    <div style={{minHeight: 400, padding: 15}}>
      {isFetching && <LoadingIndicator title="Loading..." type="" />}
      <Row className="mb-3">
        <Col sm={12}>
          <ReportList
            reports={reports}
            entityId={entityId}
            entityType={entityType}
            metricType={metricType}
            distributionBy={distributionBy}
          />
          {hasNextPage && (
            <Pagination
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
          <hr />
          <ReportForm
            entityId={entityId}
            entityType={entityType}
            distributionBy={distributionBy}
            metricType={metricType}
            ownerId={ownerId}
            ownerRole={ownerRole}
          />
        </Col>
      </Row>
    </div>
  );
};

EntityReport.propTypes = {
  entityId: PropTypes.string,
  entityType: PropTypes.string
};

export default EntityReport;