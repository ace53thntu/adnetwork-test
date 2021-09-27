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
        floor_price,
        merge,
        metadata,
        fill_rate,
        click_rate,
        position_id,
        tracker_template_uuid,
        deal_floor_price,
        enable_deal
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
        tracker_template_uuid: destructureTrackerTemplate,
        position_id: destructurePosition,
        enable_deal: enable_deal ? 'active' : 'inactive'
      };
    }
    return {};
  }, [inventory, positions, trackerTemplates]);
};
