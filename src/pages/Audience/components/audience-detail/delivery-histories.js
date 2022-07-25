//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Badge, Col, Row} from 'reactstrap';

//---> Internal Modules
import {useGetDeliveryTrackerHistory} from 'queries/audience/useGetDeliveryTrackerHistory';
import {ErrorBoundary} from 'components/common';
import Table from 'components/table';
import {useDestructureDeliveryHistory} from 'pages/Audience/hooks/useDestructureDeliveryHistory';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {IS_RESPONSE_ALL} from 'constants/misc';

const TRANSFER_STATUS = {
  preparing: 'info',
  transfering: 'primary',
  success: 'success',
  error: 'warning'
};

const DeliveryHistories = ({audienceUuid}) => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const {data, isFetching} = useGetDeliveryTrackerHistory({
    params: {
      audience_uuid: audienceUuid,
      page,
      per_page: pageSize
    },
    enabled: !!audienceUuid
  });

  const dataList = useDestructureDeliveryHistory({
    deliveryHistories: getResponseData(data, IS_RESPONSE_ALL)
  });

  const columns = React.useMemo(
    () => [
      {
        columns: [
          {
            Header: 'Group ID',
            accessor: 'group_id',
            width: 150,
            Cell: ({value}) => {
              return <div style={{wordWrap: 'anywhere'}}>{value}</div>;
            }
          },
          {
            Header: 'Index',
            accessor: 'batch'
          },
          {
            Header: 'Sent date',
            accessor: 'sent_date'
          },
          {
            Header: 'Total users',
            accessor: 'total_users'
          },

          {
            Header: 'Amount',
            accessor: 'amount'
          },
          {
            Header: 'Sender code',
            accessor: 'sender_code'
          },
          {
            Header: 'Vendor code',
            accessor: 'vendor_code'
          },
          {
            Header: 'Status',
            accessor: 'status',
            width: 120,
            Cell: ({value}) => {
              return <Badge color={TRANSFER_STATUS[value]}>{value}</Badge>;
            }
          },
          {
            Header: 'Error message',
            accessor: 'note',
            Cell: ({value}) => {
              return (
                <div>
                  <code>{value}</code>
                </div>
              );
            }
          }
        ]
      }
    ],
    []
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const totalItems = getResponsePagination(data)?.totalItems;
  const totalPage =
    totalItems && totalItems ? Math.ceil(totalItems / pageSize) : 1;

  return (
    <Row>
      <Col sm="12">
        <h5 className="mt-3">Historical</h5>
        <ErrorBoundary>
          <Table
            data={isFetching ? [] : dataList ?? []}
            columns={columns}
            className="-striped -highlight"
            pages={totalPage}
            pageSize={pageSize}
            manual
            loading={isFetching}
            onFetchData={async (state, instance) => {
              if (state?.filtered?.length) {
                const params = {};
                state.filtered.forEach(({id, value}) => {
                  if (id === 'account_status' && value === 'all') {
                    // do nothing
                  } else {
                    params[id] =
                      typeof value === 'string' ? value.trim() : value;
                  }
                });

                // setQueryParams(params);
              }
              setPage(state.page + 1);
              setPageSize(state.pageSize);
              scrollToTop();
            }}
          />
        </ErrorBoundary>
      </Col>
    </Row>
  );
};

DeliveryHistories.propTypes = {
  audienceUuid: PropTypes.string.isRequired
};

export default DeliveryHistories;
