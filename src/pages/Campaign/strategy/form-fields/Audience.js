//---> Build-in Modules
import React from 'react';

//---> External Modules

import {useFormContext, Controller} from 'react-hook-form';
import {Badge} from 'reactstrap';
import moment from 'moment';

//---> Internal Modules
import {Pagination} from 'components/list/pagination';
import {useGetAudiencesInfinity} from 'queries/audience';
import {NoAudienceStyled} from 'pages/Audience/components/audience-list/styled';
import {List} from 'components/list';
import {AUDIENCES_INFINITY} from 'queries/audience/constants';
import {useDestructureAudiences} from 'pages/Audience/hooks';
import {DEFAULT_PAGINATION} from 'constants/misc';

const Audience = ({defaultAudiences = []}) => {
  const {control, setValue} = useFormContext();
  const [checkedAudiences, setCheckedAudiences] = React.useState([]);
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetAudiencesInfinity({
    enabled: true,
    page: 1,
    per_page: DEFAULT_PAGINATION,
    key: AUDIENCES_INFINITY
  });

  const audiences = useDestructureAudiences({pages});

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Role',
        accessor: 'role'
      },
      {
        header: 'Name',
        accessor: 'audience_name'
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

  React.useEffect(() => {
    setCheckedAudiences(defaultAudiences);
  }, [defaultAudiences]);

  React.useEffect(() => {
    setValue('audience_uuids', checkedAudiences, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [setValue, checkedAudiences]);

  return (
    <>
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
      {checkedAudiences &&
        checkedAudiences?.map((item, index) => (
          <Controller
            key={`pr-${item}`}
            render={({field}) => <input {...field} type="hidden" />}
            name={`audience_uuids[${index}]`}
            control={control}
          />
        ))}
    </>
  );
};

export default Audience;
