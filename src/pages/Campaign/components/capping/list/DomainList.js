// Build-in Modules
import React from 'react';

// External Modules
import { useTranslation } from 'react-i18next';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

// Internal Modules
import { capitalize } from 'utils/helpers/string.helpers';
import { renderCappingTypeColor } from '../dto';
import { Collapse } from 'components/common';
import { List } from 'components/list';
import { CustomStatus } from 'components/list/status';
import { CappingTypes } from 'constants/misc';
import { isArray } from 'lodash';
import NoDataAvailable from 'components/list/no-data';
import { Chip } from '@material-ui/core';

const propTypes = {
  list: PropTypes.array,
  onClickItem: PropTypes.func,
  onClickMenu: PropTypes.func,
  title: PropTypes.string
};

const DomainList = ({
  title = 'Domain',
  list = [],
  onClickMenu = () => null,
  onClickItem = () => null
}) => {
  const { t } = useTranslation();

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
        header: 'Domain group white list',
        accessor: 'domain_group_white_list',
        cell: row => {
          const dataList = row?.value;
          if (isArray(dataList)) {
            return dataList.map(
              (item, idx) =>
                (
                  <Chip
                    key={`pr-${idx}`}
                    variant="outlined"
                    size="small"
                    label={item.name}
                  />
                ) || ''
            );
          }
          return null;
        }
      },

      {
        header: 'Domain group black list',
        accessor: 'domain_group_black_list',
        cell: row => {
          const dataList = row?.value;
          if (isArray(dataList)) {
            return dataList.map(
              (item, idx) =>
                (
                  <Chip
                    key={`pr-${idx}`}
                    variant="outlined"
                    size="small"
                    label={item.name}
                  />
                ) || ''
            );
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
              statusProps.color = 'secondary';
              break;
          }
          return <CustomStatus {...statusProps} />;
        }
      }
    ];
  }, []);

  return (
    <Collapse initialOpen title={title} unMount={false}>
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

DomainList.propTypes = propTypes;

export default React.memo(DomainList);
