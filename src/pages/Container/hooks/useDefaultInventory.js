import {useMemo} from 'react';
import {
  getInventoryFormats,
  getInventoryTags,
  getInventoryTypes
} from '../constants';

export const useDefaultInventory = ({
  inventory,
  trackerTemplates = [],
  positions = []
}) => {
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
        click_rate,
        position_id,
        tracker_template_id
      } = inventory;
      console.log(
        '🚀 ~ file: useDefaultInventory.js ~ line 33 ~ returnuseMemo ~ position_id',
        position_id,
        positions
      );
      const destructureType = inventoryTypes.find(item => item.value === type);
      const destructurePosition = positions.find(
        item => item.value === position_id
      );
      console.log(
        '🚀 ~ file: useDefaultInventory.js ~ line 42 ~ returnuseMemo ~ destructurePosition',
        destructurePosition
      );
      const destructureTrackerTemplate = trackerTemplates.find(
        item => item.value === tracker_template_id
      );
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
        click_rate,
        tracker_template_id: destructureTrackerTemplate,
        position_id: destructurePosition
      };
    }
    return {};
  }, [inventory, positions, trackerTemplates]);
};
