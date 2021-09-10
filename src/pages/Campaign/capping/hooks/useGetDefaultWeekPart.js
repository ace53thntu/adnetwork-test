import {useMemo} from 'react';
import {WEEK_DAYS} from 'pages/Campaign/constants';

export const useGetDefaultWeekPart = weekPart => {
  return useMemo(() => {
    let week_day = null,
      start_hour = '',
      start_minute = '',
      end_hour = '',
      end_minute = '',
      is_gmt = 'inactive',
      week_parts_gmt = 'inactive';

    if (weekPart) {
      week_day = weekPart?.week_day || '';
      week_day = week_day.split(',') || [];
      week_day = WEEK_DAYS.filter(
        item => week_day && week_day.includes(item.value.toString())
      );

      start_hour = weekPart?.start_hour;
      start_minute = weekPart?.start_minute;
      end_hour = weekPart?.end_hour;
      end_minute = weekPart?.end_minute;
      is_gmt = weekPart?.is_gmt ? 'active' : 'inactive';
      week_parts_gmt = weekPart?.is_gmt ? 'active' : 'inactive';
    }

    return {
      week_day,
      start_hour,
      start_minute,
      end_hour,
      end_minute,
      week_parts_gmt,
      is_gmt
    };
  }, [weekPart]);
};
