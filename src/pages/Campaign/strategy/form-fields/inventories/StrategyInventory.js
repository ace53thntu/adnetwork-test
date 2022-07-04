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
import {getUserRole, USER_ROLE} from 'pages/user-management/constants';

const propTypes = {
  strategyInventories: PropTypes.array,
  isView: PropTypes.bool
};

const StrategyInventory = ({strategyInventories = [], isView = false}) => {
  const role = getUserRole();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [activeInventory, setActiveInventory] = React.useState(null);

  const {errors, setValue, control, watch} = useFormContext();
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
    return [
      ...baseCols,
      {
        header: activePriceModel?.label,
        accessor: activePriceModel?.value,
        cell: row => {
          const noStore = row?.original?.noStore;
          let priceModelValue = '';
          if (noStore) {
            priceModelValue = row?.original?.[
              activePriceModel?.value
            ].toString();
          } else {
            priceModelValue = row?.original?.[
              activePriceModel?.value
            ].toString();
          }
          console.log(
            '----- 111',
            row?.original?.[activePriceModel?.value].toString()
          );

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
  }, [activePriceModel?.label, activePriceModel?.value]);

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

  const actions = [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)
    ? ['Edit', 'Delete']
    : ['Delete'];

  return (
    <>
      {errors?.inventories_bid && (
        <ErrorMessage message={errors?.inventories_bid?.message} />
      )}
      <List
        data={strategyInventories}
        columns={columns}
        actions={actions}
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
