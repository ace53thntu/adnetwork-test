import {List} from 'components/list';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Badge} from 'reactstrap';
import {CAPPINGS} from './mockData';

const CappingList = () => {
  const {t} = useTranslation();
  const cappings = React.useMemo(
    () =>
      CAPPINGS?.map(item => ({
        ...item,
        id: item?.uuid,
        smooth: item?.smooth ? 'true' : 'false',
        climit: item?.climit?.toString() || '',
        time_frame: item?.time_frame?.toString() || ''
      })),
    []
  );

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Capping type',
        accessor: 'ctype'
      },
      {
        header: 'Time frame',
        accessor: 'time_frame',
        cell: row => (
          <Badge color="primary" pill>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Limit',
        accessor: 'climit',
        cell: row => (
          <Badge color="primary" pill>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Smooth',
        accessor: 'smooth',
        cell: row => {
          return (
            <Badge color={row?.value === 'true' ? 'success' : 'warning'}>
              {row?.value}
            </Badge>
          );
        }
      }
    ];
  }, []);

  function onClickMenu() {}

  function onClickItem() {}

  return (
    <div>
      <List
        data={cappings || []}
        columns={columns}
        showAction
        actions={[t('edit'), t('delete')]}
        handleAction={onClickMenu}
        handleClickItem={onClickItem}
      />
    </div>
  );
};

export default CappingList;
