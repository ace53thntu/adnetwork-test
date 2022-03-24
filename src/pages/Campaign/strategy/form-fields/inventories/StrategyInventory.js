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

const propTypes = {
  strategyInventories: PropTypes.array
};

const StrategyInventory = ({strategyInventories = []}) => {
  console.log(
    '🚀 ~ file: StrategyInventory.js ~ line 21 ~ StrategyInventory ~ strategyInventories',
    strategyInventories
  );
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [activeInventory, setActiveInventory] = React.useState(null);

  const {errors, setValue, control} = useFormContext();

  React.useEffect(() => {
    const inventoriesConverted = strategyInventories?.map(item => ({
      uuid: item.uuid,
      price: item.deal_floor_price
    }));

    setValue('inventories_bid', inventoriesConverted, {
      shouldValidate: true,
      shouldDirty: true
    });
  }, [setValue, strategyInventories]);

  const columns = React.useMemo(() => {
    return [
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
      },
      {
        header: 'Deal Price',
        accessor: 'deal_floor_price',
        cell: row => (
          <Badge color="info">
            {row?.value
              ? formatValue({
                  value: HandleCurrencyFields.convertApiToGui({
                    value: row?.value
                  })?.toString(),
                  groupSeparator: ',',
                  decimalSeparator: '.',
                  prefix: '$'
                })
              : ''}
          </Badge>
        )
      }
    ];
  }, []);

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
        showAction
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
