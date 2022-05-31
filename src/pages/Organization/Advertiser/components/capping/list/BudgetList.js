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
import {BudgetTimeFrames, CappingTypes} from 'constants/misc';
import {isArray} from 'lodash';
import NoDataAvailable from 'components/list/no-data';
import {formatValue} from 'react-currency-input-field';
import {convertApiToGui} from 'utils/handleCurrencyFields';

const typeHasTimeFrame = [
  CappingTypes.BUDGET.value,
  CappingTypes.IMPRESSION.value,
  CappingTypes.USER.value
];

const propTypes = {
  list: PropTypes.array,
  onClickItem: PropTypes.func,
  onClickMenu: PropTypes.func,
  title: PropTypes.string,
  isManager: PropTypes.bool,
  type: PropTypes.string
};

const BudgetList = ({
  title = 'Budget',
  list = [],
  isManager = false,
  onClickMenu = () => null,
  onClickItem = () => null,
  type = ''
}) => {
  const {t} = useTranslation();
  const destructuredList = list?.map(item => {
    if (item?.target === 0 || !item.target) {
      return {...item, actions: [t('edit')]};
    }
    return {...item, actions: [t('edit'), t('delete')]};
  });

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
        header: 'Target',
        accessor: 'target',
        cell: row => {
          if (row?.value === 0 || !row?.value) {
            return null;
          }
          if (
            [CappingTypes.IMPRESSION.value, CappingTypes.USER.value].includes(
              row?.original?.type
            )
          ) {
            return (
              <Badge color="info" pill>
                {row?.value}
              </Badge>
            );
          }
          return (
            <Badge color="info" pill>
              {row?.value
                ? formatValue({
                    value: convertApiToGui({
                      value: row?.value
                    })?.toString(),
                    groupSeparator: ',',
                    decimalSeparator: '.',
                    prefix: '$'
                  })
                : ''}
            </Badge>
          );
        }
      },
      {
        header: 'Time frame',
        accessor: 'time_frame',
        cell: row => {
          return (
            <>
              {typeHasTimeFrame.includes(row.original?.type) &&
                row?.value === BudgetTimeFrames.DAILY && (
                  <Badge color="primary" pill>
                    {row?.value === BudgetTimeFrames.DAILY && 'Daily'}
                  </Badge>
                )}
              {(typeHasTimeFrame.includes(row.original?.type) && row?.value) ===
                BudgetTimeFrames.GLOBAL && (
                <Badge color="success" pill>
                  {row?.value === BudgetTimeFrames.GLOBAL && 'Global'}
                </Badge>
              )}
              {isManager && (
                <Badge color="primary" pill>
                  global
                </Badge>
              )}
            </>
          );
        }
      },

      {
        accessor: 'status',
        cell: row => {
          let status = row?.value;
          if (row?.original?.target === 0 || !row?.original?.target) {
            status = 'deleted';
          }
          let statusProps = {
            label: capitalize(status)
          };
          switch (status) {
            case 'active':
              statusProps.color = 'success';
              break;
            case 'deleted':
              statusProps.color = 'danger';
              break;
            default:
              statusProps.color = 'secondary';
              break;
          }
          return <CustomStatus {...statusProps} />;
        }
      }
    ];
  }, [isManager]);

  return (
    <Collapse title={title} initialOpen unMount={false}>
      {isArray(list) && list.length > 0 ? (
        <List
          data={destructuredList || []}
          columns={columns}
          showAction
          handleAction={onClickMenu}
          handleClickItem={onClickItem}
        />
      ) : (
        <NoDataAvailable />
      )}
    </Collapse>
  );
};

BudgetList.propTypes = propTypes;

export default React.memo(BudgetList);
