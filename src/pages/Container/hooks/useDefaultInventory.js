import {useMemo} from 'react';
import {mappingInventoryApiToForm} from '../components/InventoryForm/dto';
import {getInventoryFormats, getInventoryTypes} from '../constants';

export const useDefaultInventory = ({inventory}) => {
  return useMemo(() => {
    const inventoryTypes = getInventoryTypes();
    const inventoryFormats = getInventoryFormats();

    if (inventory) {
      return mappingInventoryApiToForm({
        inventory,
        inventoryFormats,
        inventoryTypes
      });
    }
    return {};
  }, [inventory]);
};
