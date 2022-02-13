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

const propTypes = {
  strategyInventories: PropTypes.array
};

const StrategyInventory = ({strategyInventories = []}) => {
  const dispatch = useDispatch();
  const {errors, setValue, control} = useFormContext();

  React.useEffect(() => {
    const inventoriesConverted = strategyInventories?.map(item => ({
      uuid: item.uuid
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
        header: 'Deal Floor Price',
        accessor: 'deal_floor_price',
        cell: row => (
          <Badge color="light" pill>
            {row?.value}
          </Badge>
        )
      }
    ];
  }, []);

  function onClickAction(actionIndex, currentItem) {
    dispatch(removeInventoryStrategyRedux(currentItem?.uuid));
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
          </div>
        );
      })}
      <DialogConfirm />
    </>
  );
};

StrategyInventory.propTypes = propTypes;

export default React.memo(StrategyInventory);
