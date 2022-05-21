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

const propTypes = {
  list: PropTypes.array,
  onClickItem: PropTypes.func,
  onClickMenu: PropTypes.func,
  title: PropTypes.string,
  isManager: PropTypes.bool
};

const BudgetList = ({
  title = 'Budget',
  list = [],
  isManager = false,
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
        header: 'Target',
        accessor: 'target',
        cell: row => {
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
          console.log('row?.value ===', row?.value);
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
              {[
                CappingTypes.BUDGET.value,
                CappingTypes.IMPRESSION.value
              ].includes(row.original?.type) &&
                row?.value === BudgetTimeFrames.DAILY && (
                  <Badge color="primary" pill>
                    {row?.value === BudgetTimeFrames.DAILY && 'Daily'}
                  </Badge>
                )}
              {([
                CappingTypes.BUDGET.value,
                CappingTypes.IMPRESSION.value
              ].includes(row.original?.type) && row?.value) ===
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
  }, [isManager]);

  const actions = !isManager ? [t('edit')] : [t('edit')];

  return (
    <Collapse title={title} initialOpen unMount={false}>
      {isArray(list) && list.length > 0 ? (
        <List
          data={list || []}
          columns={columns}
          showAction
          actions={actions}
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
