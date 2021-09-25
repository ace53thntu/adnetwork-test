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
  console.log(
    '🚀 ~ file: useDefaultInventory.js ~ line 13 ~ inventory',
    inventory
  );
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
        floor_price,
        merge,
        metadata,
        fill_rate,
        click_rate,
        position_id,
        tracker_template_uuid,
        deal_floor_price
      } = inventory;
      const destructureType = inventoryTypes.find(item => item.value === type);
      const destructurePosition = positions.find(
        item => item.value === position_id
      );
      const destructureTrackerTemplate = trackerTemplates.find(
        item => item.value === tracker_template_uuid
      );
      const destructureFormat = inventoryFormats.find(
        item => item.value === format
      );
      console.log(
        '🚀 ~ file: useDefaultInventory.js ~ line 44 ~ returnuseMemo ~ metadata',
        metadata,
        metadata?.tags
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
        floor_price,
        deal_floor_price,
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
