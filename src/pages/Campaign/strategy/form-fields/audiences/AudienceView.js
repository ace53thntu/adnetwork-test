//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext, Controller} from 'react-hook-form';
import {Badge} from 'reactstrap';
import moment from 'moment';

//---> Internal Modules
import {NoAudienceStyled} from 'pages/Audience/components/audience-list/styled';
import {List} from 'components/list';

const AudienceView = ({defaultAudiences = [], audienceInStrategy = []}) => {
  const {control, setValue} = useFormContext();
  const [checkedAudiences, setCheckedAudiences] = React.useState([]);

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
    <div>
      {audienceInStrategy?.length > 0 ? (
        <List
          data={audienceInStrategy}
          columns={columns}
          handleClickItem={onClickItem}
        />
      ) : (
        <NoAudienceStyled>No audience</NoAudienceStyled>
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
    </div>
  );
};

export default AudienceView;
