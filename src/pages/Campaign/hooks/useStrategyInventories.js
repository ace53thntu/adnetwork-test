import React from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useStrategyInventories = ({
  inventories = [],
  strategyInventories = []
}) => {
  return React.useMemo(() => {
    if (validArray({list: inventories})) {
      return inventories.filter(invItem => {
        const inventoryFound = strategyInventories?.find(
          strategyInvItem => strategyInvItem?.uuid === invItem?.uuid
        );
        if (!inventoryFound) {
          return true;
        }

        return false;
      });
    }

    return [];
  }, [inventories, strategyInventories]);
};
