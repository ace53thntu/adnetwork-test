// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';
import {Controller, useFormContext} from 'react-hook-form';

// Internal Modules
import {removeInventoryStrategyRedux} from 'store/reducers/campaign';
import {List} from 'components/list';
import {useDispatch} from 'react-redux';
import {DialogConfirm} from 'components/common';
import ErrorMessage from 'components/forms/ErrorMessage';
import {formatValue} from 'react-currency-input-field';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';
import {StrategyTypes} from 'pages/Campaign/constants';

const propTypes = {
  strategyInventories: PropTypes.array,
  isView: PropTypes.bool
};

const StrategyInventory = ({strategyInventories = [], isView = false}) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [activeInventory, setActiveInventory] = React.useState(null);

  const {errors, setValue, control, watch} = useFormContext();
  const strategyType = watch('strategy_type');

  React.useEffect(() => {
    const inventoriesConverted = strategyInventories?.map(item => ({
      uuid: item?.uuid,
      price: item?.deal_floor_price
    }));

    setValue('inventories_bid', inventoriesConverted, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [setValue, strategyInventories]);

  const columns = React.useMemo(() => {
    const baseCols = [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Container name',
        accessor: 'container_name'
      },
      {
        header: 'Position',
        accessor: 'position_name'
      }
    ];
    if (strategyType?.value === StrategyTypes.PREMIUM) {
      return [
        ...baseCols,
        {
          header: 'Deal Floor Price',
          accessor: 'deal_floor_price',
          cell: row => {
            const noStore = row?.original?.noStore;
            let dealFloorPrice = '';
            if (noStore) {
              dealFloorPrice = row?.value?.toString();
            } else {
              dealFloorPrice = HandleCurrencyFields.convertApiToGui({
                value: row?.value
              })?.toString();
            }

            return (
              <Badge color="info">
                {formatValue({
                  value: dealFloorPrice,
                  groupSeparator: ',',
                  decimalSeparator: '.',
                  prefix: '$'
                })}
              </Badge>
            );
          }
        }
      ];
    }
    return [
      ...baseCols,
      {
        header: 'Floor Price',
        accessor: 'floor_price',
        cell: row => {
          const noStore = row?.original?.noStore;
          let dealFloorPrice = '';
          if (noStore) {
            dealFloorPrice = row?.value?.toString();
          } else {
            dealFloorPrice = HandleCurrencyFields.convertApiToGui({
              value: row?.value
            })?.toString();
          }

          return (
            <Badge color="info">
              {formatValue({
                value: dealFloorPrice,
                groupSeparator: ',',
                decimalSeparator: '.',
                prefix: '$'
              })}
            </Badge>
          );
        }
      }
    ];
  }, [strategyType?.value]);

  function onClickAction(actionIndex, currentItem) {
    setOpenDialog(true);
    setActiveInventory(currentItem);
  }

  function onCancelDelete() {
    setOpenDialog(false);
  }

  function onSubmitDelete() {
    dispatch(removeInventoryStrategyRedux(activeInventory?.uuid));
    setOpenDialog(false);
  }

  return (
    <>
      {errors?.inventories_bid && (
        <ErrorMessage message={errors?.inventories_bid?.message} />
      )}
      <List
        showAction={!isView}
        data={strategyInventories}
        columns={columns}
        actions={['Delete']}
        handleAction={(actionIndex, currentItem) =>
          onClickAction(actionIndex, currentItem)
        }
      />

      {strategyInventories?.map((inventoryItem, inventoryIndex) => {
        return (
          <div key={`pr-${inventoryItem?.uuid}`}>
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].uuid`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].price`}
              control={control}
            />
          </div>
        );
      })}
      <DialogConfirm
        open={openDialog}
        title="Are you sure remove this inventory"
        handleClose={onCancelDelete}
        handleAgree={onSubmitDelete}
      />
    </>
  );
};

StrategyInventory.propTypes = propTypes;

export default React.memo(StrategyInventory);
