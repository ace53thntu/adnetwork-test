// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Badge} from 'reactstrap';
import PropTypes from 'prop-types';

// Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import {renderCappingTypeColor} from '../dto';
import {Collapse} from 'components/common';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {CappingTypes} from 'constants/misc';
import {isArray} from 'lodash';
import NoDataAvailable from 'components/list/no-data';

const propTypes = {
  list: PropTypes.array,
  onClickItem: PropTypes.func,
  onClickMenu: PropTypes.func,
  title: PropTypes.string
};

const ScheduleList = ({
  title = 'Keyword',
  list = [],
  onClickMenu = () => null,
  onClickItem = () => null
}) => {
  const {t} = useTranslation();

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Capping type',
        accessor: 'type',
        cell: row => (
          <Badge color={renderCappingTypeColor(row?.value)}>
            {Object.entries(CappingTypes).find(
              ([key, type]) => type.value === row?.value
            )?.[1]?.label || ''}
          </Badge>
        )
      },
      {
        header: 'Keyword white list',
        accessor: 'keywords_list_white',
        cell: row => {
          const dataList = row?.value;
          if (isArray(dataList)) {
            return dataList.map(item => item.name || '');
          }
          return null;
        }
      },
      {
        header: 'Keyword black list',
        accessor: 'keywords_list_black',
        cell: row => {
          const dataList = row?.value;
          if (isArray(dataList)) {
            return dataList.map(item => item.name || '');
          }
          return null;
        }
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
