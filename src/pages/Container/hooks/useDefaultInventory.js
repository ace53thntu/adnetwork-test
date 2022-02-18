import {ProtocolOptions} from 'constants/misc';
import {useMemo} from 'react';
import {capitalize} from 'utils/helpers/string.helpers';
import {getInventoryFormats, getInventoryTypes} from '../constants';

export const useDefaultInventory = ({inventory}) => {
  return useMemo(() => {
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
        metadata,
        fill_rate,
        click_rate,
        position_uuid,
        position_name,
        deal_floor_price,
        allow_deal,
        market_type,
        price_engine,
        market_dsps = [],
        tags
      } = inventory;
      const destructureType = inventoryTypes.find(item => item.value === type);
      const destructurePosition =
        {value: position_uuid, label: position_name} || null;

      const destructureFormat = inventoryFormats.find(
        item => item.value === format
      );
      const marketDsps = market_dsps
        ? Array.from(market_dsps, item => ({
            value: item?.uuid,
            label: item?.name
          }))
        : [];
      let tagsParsed = tags?.map(tag => ({value: tag, name: capitalize(tag)}));
      const protocols =
        metadata?.protocols?.length > 0
          ? metadata?.protocols?.map(item => {
              const protocolFound = ProtocolOptions?.find(
                option => option.value === item
              );
              if (protocolFound) {
                return protocolFound;
              }
              return null;
            })
          : [];
      metadata.protocols = protocols;

      return {
        uuid,
        name,
        status,
        type: destructureType,
        format: destructureFormat,
        floor_price,
        deal_floor_price,
        metadata,
        fill_rate,
        click_rate,
        position_uuid: destructurePosition,
        allow_deal: allow_deal ? 'active' : 'inactive',
        market_type: market_type
          ? {value: market_type, label: capitalize(market_type)}
          : null,
        price_engine: price_engine
          ? {value: price_engine, label: capitalize(price_engine)}
          : null,
        market_dsps: marketDsps || [],
        tags: tagsParsed
      };
    }
    return {};
  }, [inventory]);
};
