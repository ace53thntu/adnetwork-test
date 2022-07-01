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
  console.log(
    '🚀 ~ file: StrategyInventory.js ~ line 25 ~ StrategyInventory ~ strategyInventories',
    strategyInventories
  );
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [activeInventory, setActiveInventory] = React.useState(null);

  const {errors, setValue, control, watch} = useFormContext();
  const strategyType = watch('strategy_type');
  const activePriceModel = watch('pricing_model');

  React.useEffect(() => {
    const inventoriesConverted = strategyInventories?.map(item => ({
      uuid: item?.uuid,
      cpm: item?.cpm,
      cpc: item?.cpc,
      cpa: item?.cpa,
      cpd: item?.cpd,
      cpl: item?.cpl,
      cpe: item?.cpe,
      cpv: item?.cpv,
      cpi: item?.cpi,
      cpvm: item?.cpvm
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
      },
      {
        header: activePriceModel?.label,
        accessor: activePriceModel?.value,
        cell: row => {
          const noStore = row?.original?.noStore;
          let priceModelValue = '';
          if (noStore) {
            priceModelValue = row?.value?.toString();
          } else {
            priceModelValue = HandleCurrencyFields.convertApiToGui({
              value: row?.value
            })?.toString();
          }

          return (
            <Badge color="info">
              {formatValue({
                value: priceModelValue,
                groupSeparator: ',',
                decimalSeparator: '.',
                prefix: '$'
              })}
            </Badge>
          );
        }
      }
    ];
  }, [activePriceModel?.label, activePriceModel?.value, strategyType?.value]);

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
        data={strategyInventories}
        columns={columns}
        actions={['Delete']}
        handleAction={(actionIndex, currentItem) =>
          onClickAction(actionIndex, currentItem)
        }
      />

      {strategyInventories?.map((inventoryItem, inventoryIndex) => {
        console.log(
          '🚀 ~ file: StrategyInventory.js ~ line 205 ~ {strategyInventories?.map ~ inventoryItem',
          inventoryItem
        );

        return (
          <div key={`pr-${inventoryItem?.uuid}`}>
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].uuid`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpm`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpc`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpa`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpd`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpl`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpe`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpv`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpi`}
              control={control}
            />
            <Controller
              render={({field}) => <input {...field} type="hidden" />}
              name={`inventories_bid[${inventoryIndex}].cpvm`}
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
