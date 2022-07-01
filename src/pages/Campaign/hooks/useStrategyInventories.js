import React from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

export const useStrategyInventories = ({
  inventories = [],
  strategyInventories = []
}) => {
  console.log(
    '🚀 ~ file: useStrategyInventories.js ~ line 9 ~ strategyInventories',
    strategyInventories
  );
  return React.useMemo(() => {
    if (validArray({list: inventories})) {
      const inventoriesMapping = inventories.filter(invItem => {
        const inventoryFound = strategyInventories?.find(
          strategyInvItem => strategyInvItem?.uuid === invItem?.uuid
        );
        if (!inventoryFound) {
          return true;
        }

        return false;
      });

      return inventoriesMapping?.map(item => {
        let {cpm, cpc, cpa, cpd, cpl, cpe, cpv, cpi, cpvm} = item || {};
        // Price model
        cpm = HandleCurrencyFields.convertApiToGui({
          value: cpm
        });
        cpc = HandleCurrencyFields.convertApiToGui({
          value: cpc
        });
        cpa = HandleCurrencyFields.convertApiToGui({
          value: cpa
        });
        cpd = HandleCurrencyFields.convertApiToGui({
          value: cpd
        });
        cpl = HandleCurrencyFields.convertApiToGui({
          value: cpl
        });
        cpe = HandleCurrencyFields.convertApiToGui({
          value: cpe
        });
        cpv = HandleCurrencyFields.convertApiToGui({
          value: cpv
        });
        cpi = HandleCurrencyFields.convertApiToGui({
          value: cpi
        });
        cpvm = HandleCurrencyFields.convertApiToGui({
          value: cpvm
        });
        return {...item, cpm, cpc, cpa, cpd, cpl, cpe, cpv, cpi, cpvm};
      });
    }

    return [];
  }, [inventories, strategyInventories]);
};
