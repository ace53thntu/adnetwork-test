import {useMemo} from 'react';
import {
  getInventoryFormats,
  getInventoryTags,
  getInventoryTypes
} from '../constants';

export const useDefaultInventory = inventory => {
  return useMemo(() => {
    const inventoryTags = getInventoryTags();
    const inventoryTypes = getInventoryTypes();
    const inventoryFormats = getInventoryFormats();

    if (inventory) {
      const {
        uuid,
        name,
        status,
        type,
        format,
        minimum_price,
        merge,
        metadata,
        fill_rate,
        click_rate
      } = inventory;
      const destructureType = inventoryTypes.find(item => item.value === type);
      const destructureFormat = inventoryFormats.find(
        item => item.value === format
      );
      const destructureTags = metadata?.tags?.map(item => {
        const foundTag = inventoryTags.find(itemTag => itemTag.value === item);
        return foundTag;
      });
      metadata.tags = destructureTags;
      return {
        uuid,
        name,
        status,
        type: destructureType,
        format: destructureFormat,
        minimum_price,
        merge,
        metadata,
        fill_rate,
        click_rate
      };
    }
    return {};
  }, [inventory]);
};
