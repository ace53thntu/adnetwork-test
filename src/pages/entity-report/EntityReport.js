//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import ReportList from './ReportList';
import ReportForm from './ReportForm';
import {EntityTypes, METRIC_TYPES} from 'constants/report';
import {LoadingIndicator} from 'components/common';
import {useGetReportsInfinite} from 'queries/report/useGetReports';
import {Pagination} from 'components/list/pagination';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {IS_RESPONSE_ALL, Statuses} from 'constants/misc';
import {useDispatch} from 'react-redux';
import {
  resetReportRedux,
  setEntityNameRedux,
  setReportGroupRedux
} from 'store/reducers/entity-report';
import {ReportGroupTypes} from './constants.js/index.js';

const NUMBER_OF_PAGE = 10;

const propTypes = {
  entity: PropTypes.string,
  entityName: PropTypes.string,
  entityId: PropTypes.string,
  ownerId: PropTypes.string,
  ownerRole: PropTypes.string
};

const EntityReport = ({
  entity = EntityTypes.STRATEGY,
  entityName = '',
  entityId = null,
  ownerId,
  ownerRole
}) => {
  const dispatch = useDispatch();
  const entityType = entity;
  const distributionBy =
    entityType === EntityTypes.ORGANIZATION ? 'manager' : entityType;
  const metricType = METRIC_TYPES[entity];
  const {
    data: {pages} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetReportsInfinite({
    params: {
      source_uuid: entityId,
      per_page: NUMBER_OF_PAGE,
      sort: 'created_at DESC',
      status: Statuses.ACTIVE
    },
    enabled: true,
    reportType: entityType
  });

  const reports = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const reportData = getResponseData(page, IS_RESPONSE_ALL);
      return [...acc, ...reportData];
    }, []);
  }, [pages]);

  React.useEffect(
    function setReportGroupType() {
      if (
        [
          EntityTypes.PUBLISHER,
          EntityTypes.CONTAINER,
          EntityTypes.INVENTORY
        ].includes(entityType)
      ) {
        dispatch(setReportGroupRedux(ReportGroupTypes.PUBLISHER));
        return;
      }
      dispatch(setReportGroupRedux(ReportGroupTypes.ADVERTISER));
    },
    [dispatch, entityType]
  );

  React.useEffect(() => {
    // Set entity name
    dispatch(setEntityNameRedux(entityName));
  }, [dispatch, entityName]);

  React.useEffect(() => {
    // ReSet entity name
    return () => dispatch(resetReportRedux());
  }, [dispatch]);

  return (
    <div style={{minHeight: 400, padding: 15}}>
      {isFetching && <LoadingIndicator title="Loading..." type="" />}
      <Row className="mb-3">
        <Col sm={12}>
          <ReportList
            reports={reports}
            entityId={entityId}
            metricType={metricType}
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

EntityReport.propTypes = propTypes;

export default EntityReport;
