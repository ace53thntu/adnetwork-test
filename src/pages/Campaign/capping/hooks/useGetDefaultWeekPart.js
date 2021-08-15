import {useMemo} from 'react';
import {WEEK_DAYS} from 'pages/Campaign/constants';

export const useGetDefaultWeekPart = weekPart => {
  return useMemo(() => {
    let week_days = [],
      start_hour = '',
      start_minute = '',
      end_hour = '',
      end_minute = '',
      is_gmt = 'inactive',
      week_parts_gmt = 'inactive';

    if (weekPart) {
      week_days = weekPart?.week_days;
      week_days = WEEK_DAYS.filter(
        item => week_days && week_days.includes(item.value)
      );
      start_hour = weekPart?.start_hour;
      start_minute = weekPart?.start_minute;
      end_hour = weekPart?.end_hour;
      end_minute = weekPart?.end_minute;
      is_gmt = weekPart?.is_gmt ? 'active' : 'inactive';
      week_parts_gmt = weekPart?.is_gmt ? 'active' : 'inactive';
    }

    return {
      week_days,
      start_hour,
      start_minute,
      end_hour,
      end_minute,
      week_parts_gmt,
      is_gmt
    };
  }, [weekPart]);
};
