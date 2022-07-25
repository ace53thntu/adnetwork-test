import React from 'react';
import moment from 'moment';

export const useDestructureDeliveryHistory = ({deliveryHistories = []}) => {
  return React.useMemo(() => {
    return deliveryHistories?.map(historyItem => {
      const {
        id,
        created_at,
        total_users,
        amount,
        offset,
        sender_code,
        vendor_code,
        status,
        note,
        group_id,
        batch_amount,
        batch_index
      } = historyItem;
      return {
        id,
        sent_date: created_at ? moment(created_at).format('DD/MM/YYYY') : '',
        total_users,
        amount,
        offset,
        sender_code,
        vendor_code,
        status,
        note,
        group_id,
        batch: `${batch_index + 1} / ${batch_amount}`
      };
    }, []);
  }, [deliveryHistories]);
};
