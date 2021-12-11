import {useMemo} from 'react';
import {capitalize} from 'utils/helpers/string.helpers';
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
        enable_deal,
        market_type,
        price_engine,
        market_dsps = []
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
      const marketDsps = market_dsps
        ? Array.from(market_dsps, item => ({
            value: item?.uuid,
            label: item?.name
          }))
        : [];

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
        enable_deal: enable_deal ? 'active' : 'inactive',
        market_type: market_type
          ? {value: market_type, label: capitalize(market_type)}
          : null,
        price_engine: price_engine
          ? {value: price_engine, label: capitalize(price_engine)}
          : null,
        market_dsps: marketDsps || []
      };
    }
    return {};
  }, [inventory, positions, trackerTemplates]);
};
