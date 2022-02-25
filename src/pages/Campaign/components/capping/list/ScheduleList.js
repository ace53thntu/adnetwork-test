// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

// Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import {Collapse} from 'components/common';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {isArray} from 'lodash';
import NoDataAvailable from 'components/list/no-data';
import {WEEK_DAYS} from 'pages/Campaign/constants';
import {Chip} from '@material-ui/core';

const propTypes = {
  list: PropTypes.array,
  onClickItem: PropTypes.func,
  onClickMenu: PropTypes.func,
  title: PropTypes.string
};

const ScheduleList = ({
  title = 'Schedule',
  list = [],
  onClickMenu = () => null,
  onClickItem = () => null
}) => {
  const {t} = useTranslation();

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Week days',
        accessor: 'week_days',
        cell: row => {
          return row?.value?.map(item => (
            <Chip
              className="ml-1 mb-1"
              size="small"
              label={
                WEEK_DAYS.find(weekDay => weekDay.value === item)?.label || ''
              }
            />
          ));
        }
      },
      {
        header: 'Start hour',
        accessor: 'start_hour',
        cell: row => row?.value?.toString()
      },
      {
        header: 'Start minute',
        accessor: 'start_minute',
        cell: row => row?.value?.toString()
      },
      {
        header: 'End hour',
        accessor: 'end_hour',
        cell: row => row?.value?.toString()
      },
      {
        header: 'End minute',
        accessor: 'end_minute',
        cell: row => row?.value?.toString()
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: capitalize(row?.value)
          };
          switch (row.value) {
            case 'active':
              statusProps.color = 'success';
              break;
            default:
              statusProps.color = 'error';
              break;
          }
          return <CustomStatus {...statusProps} />;
        }
      }
    ];
  }, []);

  return (
    <Collapse title={title} initialOpen unMount={false}>
      {isArray(list) && list.length > 0 ? (
        <List
          data={list || []}
          columns={columns}
          showAction
          actions={[t('edit'), t('delete')]}
          handleAction={onClickMenu}
          handleClickItem={onClickItem}
        />
      ) : (
        <NoDataAvailable />
      )}
    </Collapse>
  );
};

ScheduleList.propTypes = propTypes;

export default React.memo(ScheduleList);
