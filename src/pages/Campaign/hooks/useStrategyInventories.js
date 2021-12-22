import React from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useStrategyInventories = ({
  inventories = [],
  strategyInventories = []
}) => {
  return React.useMemo(() => {
    if (validArray({list: inventories})) {
      if (!strategyInventories) {
        return inventories;
      }

      return inventories.map(invItem => {
        let dealFloorPrice = 0;
        let isAdded = false;
        const inventoryFound = strategyInventories.find(
          strategyInvItem => strategyInvItem?.uuid === invItem?.uuid
        );
        if (inventoryFound) {
          dealFloorPrice = inventoryFound?.deal_floor_price;
          isAdded = true;
        }

        return {
          ...invItem,
          deal_floor_price: dealFloorPrice,
          is_added: isAdded
        };
      });
    }

    return [];
  }, [inventories, strategyInventories]);
};
