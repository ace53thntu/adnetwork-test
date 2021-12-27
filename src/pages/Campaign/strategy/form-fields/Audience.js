//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {useForm, FormProvider} from 'react-hook-form';
import {Form, Badge} from 'reactstrap';
import moment from 'moment';

//---> Internal Modules
import {Pagination} from 'components/list/pagination';
import {useGetAudiencesInfinity} from 'queries/audience';
import {NoAudienceStyled} from 'pages/Audience/components/audience-list/styled';
import {List} from 'components/list';
import {LoadingIndicator} from 'components/common';
import {capitalize} from 'utils/helpers/string.helpers';
import {AUDIENCES_INFINITY} from 'queries/audience/constants';
import {useDestructureAudiences} from 'pages/Audience/hooks';
import Status from 'components/list/status';

const getStatus = ({row, statusProps}) => {
  switch (row?.value) {
    case 'active':
      statusProps.color = 'success';
      break;
    case 'pending':
      statusProps.color = 'warning';
      break;
    case 'completed':
      statusProps.color = 'info';
      break;
    default:
      statusProps.color = 'secondary';
      break;
  }

  return statusProps;
};

const Audience = ({
  goTo,
  footer = true,
  listAudiences = [],
  currentStrategy = {},
  setDataStrategy,
  setListErrors,
  viewOnly
}) => {
  const [checkedAudiences, setCheckedAudiences] = React.useState([]);
  const {
    data: {pages = []} = {},
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetAudiencesInfinity({
    enabled: true,
    key: AUDIENCES_INFINITY
  });

  const audiences = useDestructureAudiences({pages});
  const methods = useForm({});
  const {handleSubmit} = methods;

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Role',
        accessor: 'role'
      },
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Audience Type',
        accessor: 'audience_type'
      },
      {
        header: 'Send Code',
        accessor: 'send_code',
        cell: row => {
          return row?.value ? <code>{row.value}</code> : null;
        }
      },
      {
        header: 'Vendor Code',
        accessor: 'vendor_code',
        cell: row => {
          return row?.value ? <Badge>{row.value}</Badge> : null;
        }
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: row.value ? capitalize(row.value) : 'Unknown'
          };
          statusProps = getStatus({row, statusProps});
          return <Status {...statusProps} noHeader />;
        }
      },
      {
        header: 'Start Date',
        accessor: 'start_date',
        cell: row => {
          return row.value ? (
            <code>{moment(row.value).format('DD/MM/YYYY')}</code>
          ) : null;
        }
      },
      {
        header: 'Last Transfer Date',
        accessor: 'last_transfer_date',
        cell: row => {
          return row.value ? (
            <code>{moment(row.value).format('DD/MM/YYYY')}</code>
          ) : null;
        }
      }
    ];
  }, []);

  function onClickItem(item) {
    let tmpArr = [...checkedAudiences];
    const foundAudience = tmpArr.find(tmpItem => tmpItem === item.id);

    if (foundAudience) {
      tmpArr = [...tmpArr].filter(tmpItem => tmpItem !== item.id);
    } else {
      tmpArr.push(item?.id);
    }
    setCheckedAudiences(tmpArr);
  }

  const onSubmit = useCallback(async () => {
    goTo({nextTab: 'concept'});
  }, [goTo]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {isFetching && <LoadingIndicator />}
        {audiences?.length > 0 ? (
          <List
            data={audiences}
            columns={columns}
            checkable
            handleClickItem={onClickItem}
            checkedValues={checkedAudiences}
          />
        ) : (
          <NoAudienceStyled>No data available</NoAudienceStyled>
        )}
        {hasNextPage && (
          <Pagination
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </Form>
    </FormProvider>
  );
};

export default Audience;
