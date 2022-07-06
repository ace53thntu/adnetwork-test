import {useQueryString} from 'hooks';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import __merge from 'lodash/merge';
import {useCreateStrategy} from 'queries/strategy';
import moment from 'moment';
import {getContextFilter, getVideoFilter} from 'entities/Strategy';
import {StrategyTypes} from '../constants';
import {convertGuiToApi} from 'utils/handleCurrencyFields';
import {getTimeZoneOffset} from 'utils/metrics';
import {getListByType} from '../components/capping/dto';
import {BudgetTimeFrames, CappingTypes} from 'constants/misc';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ApiError} from 'components/common';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
// import {useRefreshAdvertiserTree} from './useRefreshAdvertiserTree';
// import {useDispatch} from 'react-redux';
// import {setSelectTreeDataRedux, useCommonSelector} from 'store/reducers/common';
// import {useQueryClient} from 'react-query';
// import {GET_STRATEGY} from 'queries/strategy/constants';

export function useSaveAsStrategy(currentStrategy, originalStrategy) {
  const query = useQueryString();
  const currentTab = query.get('next_tab');
  const {getValues} = useFormContext();
  const {mutateAsync: createStrategy} = useCreateStrategy();
  const navigate = useNavigate();
  // const {refresh} = useRefreshAdvertiserTree();
  // const dispatch = useDispatch();
  // const {selectTreeData} = useCommonSelector();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onHandleSaveAs = React.useCallback(async () => {
    const formValues = getValues();
    let mergedData = __merge(currentStrategy, formValues);

    if (mergedData?.name === originalStrategy?.name) {
      mergedData = {
        ...mergedData,
        name: `${mergedData.name}-${+new Date()}`
      };
    }

    const bodyRequest = formToApi({
      formData: mergedData,
      currentStrategy,
      originalStrategy,
      currentTab
    });
    setIsSubmitting(true);
    try {
      const {data} = await createStrategy(bodyRequest);
      ShowToast.success('Create strategy successfully');
      setIsSubmitting(false);

      // dispatch(setSelectTreeDataRedux(reValidateTree(selectTreeData, data)));

      // await client.invalidateQueries([GET_STRATEGY, data.uuid]);

      // await refresh(data?.advertiser_uuid, data?.campaign_uuid, data?.uuid);

      navigate(
        `/${RoutePaths.CAMPAIGN}/${data?.campaign_uuid}/${RoutePaths.STRATEGY}/${data?.uuid}/edit?next_tab=concept&advertiser_id=${data?.advertiser_uuid}`
      );
      window.location.reload();
    } catch (error) {
      setIsSubmitting(false);
      ShowToast.error(
        <ApiError apiError={error || 'Failed to create strategy'} />
      );
    }
  }, [
    createStrategy,
    currentStrategy,
    currentTab,
    getValues,
    navigate,
    originalStrategy
  ]);

  return {
    onHandleSaveAs,
    isSubmitting
  };
}

const formToApi = ({
  formData,
  currentStrategy,
  originalStrategy,
  isSummary = false,
  isCapping = false,
  isEdit = false,
  currentTab = ''
}) => {
  const {
    campaign_uuid: campaign,
    name,
    start_time,
    end_time,
    position_uuids,
    status,
    strategy_type,
    click_commission,
    sources,
    schedule,
    location_uuids,
    category,
    priority,
    cpm_max,
    video_filter,
    context_filter,
    domain_groups_white,
    domain_groups_black,
    keywords_list_white,
    keywords_list_black,
    pricing_model,
    concept_uuids
  } = formData;

  const positionIds = position_uuids?.map(item => item?.value) || [];
  let startDate = moment(start_time).isSame(moment(), 'day')
    ? null
    : moment(start_time).toISOString();
  const endDate = moment(end_time).endOf('day').toISOString();

  // Set start time is null if start time < now
  if (
    moment(start_time).isBefore(moment(), 'day') ||
    (currentStrategy?.start_time &&
      moment(currentStrategy?.start_time).isSame(start_time, 'day'))
  ) {
    startDate = null;
  }

  //---> VIDEO FILTER
  const videoFilter = getVideoFilter({
    isEdit,
    formVideoFilter: video_filter,
    currentVideoFilter: originalStrategy?.video_filter
  });
  const contextFilter = getContextFilter({
    isEdit,
    contextFilterForm: context_filter,
    currentContextFilter: originalStrategy?.context_filter
  });

  let strategyReturn = {
    campaign_uuid: campaign?.value,
    name: name?.trim(),
    status,
    start_time: startDate,
    end_time: endDate,
    strategy_type: strategy_type ? strategy_type?.value : null,
    click_commission: parseFloat(click_commission) || null,
    category,
    priority: priority?.value || '',
    pricing_model: pricing_model?.value?.toUpperCase() || '',
    concept_uuids: concept_uuids?.filter(item => item) || []
  };

  if (currentTab !== 'description') {
    strategyReturn.video_filter = videoFilter;
    strategyReturn.context_filter = contextFilter;
    strategyReturn.position_uuids = positionIds;
    strategyReturn.category = category;
    strategyReturn.sources =
      sources?.length > 0 ? Array.from(sources, item => item.value) : [];
    if (location_uuids?.length) {
      strategyReturn.location_uuids = location_uuids?.map(item => item.value);
    } else {
      strategyReturn.location_uuids = [];
    }
    if (strategy_type?.value === StrategyTypes.NORMAL) {
      strategyReturn.cpm_max = convertGuiToApi({value: cpm_max}) || 0;
    }
    if (
      !strategyReturn?.context_filter ||
      Object.keys(strategyReturn?.context_filter).length === 0
    ) {
      delete strategyReturn?.context_filter;
    }
  } else {
    strategyReturn.video_filter = originalStrategy?.video_filter;
    strategyReturn.context_filter = originalStrategy?.context_filter;
    strategyReturn.position_uuids =
      originalStrategy?.positions?.map(item => item?.uuid) || [];
    strategyReturn.category = originalStrategy?.category;
    strategyReturn.sources = originalStrategy?.sources;
    strategyReturn.location_uuids =
      originalStrategy?.location?.map(item => item?.uuid) || [];
    strategyReturn.cpm_max = originalStrategy?.cpm_max;
  }

  if (originalStrategy?.cappings?.length) {
    const cappingBudgets = getListByType({
      cappings: originalStrategy.cappings,
      type: CappingTypes.BUDGET.value
    });
    const cappingImpressions = getListByType({
      cappings: originalStrategy.cappings,
      type: CappingTypes.IMPRESSION.value
    });

    const budgetDaily = cappingBudgets?.find(
      bg => bg.time_frame === BudgetTimeFrames.DAILY
    );
    const budgetGlobal = cappingBudgets?.find(
      bg => bg.time_frame === BudgetTimeFrames.GLOBAL
    );

    const impDaily = cappingImpressions?.find(
      bg => bg.time_frame === BudgetTimeFrames.DAILY
    );
    const impGlobal = cappingImpressions?.find(
      bg => bg.time_frame === BudgetTimeFrames.GLOBAL
    );

    strategyReturn.budget = {
      daily: budgetDaily?.target,
      global: budgetGlobal?.target
    };
    strategyReturn.impression = {
      daily: parseInt(impDaily?.target) || null,
      global: parseInt(impGlobal?.target) || null
    };
  }

  if (domain_groups_white && domain_groups_white?.length > 0) {
    strategyReturn.domain_groups_white = Array.from(
      domain_groups_white,
      domain => domain?.value
    );
  }

  if (domain_groups_black && domain_groups_black?.length > 0) {
    strategyReturn.domain_groups_black = Array.from(
      domain_groups_black,
      domain => domain?.value
    );
  }

  if (keywords_list_white && keywords_list_white?.length > 0) {
    strategyReturn.keywords_list_white = Array.from(
      keywords_list_white,
      domain => domain?.value
    );
  }

  if (keywords_list_black && keywords_list_black?.length > 0) {
    strategyReturn.keywords_list_black = Array.from(
      keywords_list_black,
      domain => domain?.value
    );
  }

  if (schedule?.week_days?.length > 0) {
    const scheduleStartHour = moment(schedule?.start_time).hours();
    const scheduleStartMinute = moment(schedule?.start_time).minutes();
    const scheduleEndHour = moment(schedule?.end_time).hours();
    const scheduleEndMinute = moment(schedule?.end_time).minutes();
    strategyReturn.schedule = {
      week_days:
        schedule?.week_days?.length > 0
          ? Array.from(schedule?.week_days, item => item?.value)
          : [],
      start_hour: parseInt(scheduleStartHour, 10),
      start_minute: parseInt(scheduleStartMinute, 10),
      end_hour: parseInt(scheduleEndHour, 10),
      end_minute: parseInt(scheduleEndMinute, 10),
      time_zone: `${getTimeZoneOffset()}`
    };
  }

  const inventoriesBid = formData?.inventories_bid ?? [];

  strategyReturn.inventories_bid = inventoriesBid.map(
    ({id, ts, uuid, ...rest}) => {
      let other = {};

      Object.keys(rest).forEach(key => {
        if (typeof rest[key] === 'number') {
          other[key] = parseInt(parseFloat(rest[key]) * 1000, 10);
        } else {
          other[key] = 0;
        }
      });

      return {
        ...other,
        uuid
      };
    }
  );

  return strategyReturn;
};

export const reValidateTree = (tree, item) => {
  const updatedTree = [...tree].map(advItem => {
    if (advItem?.uuid !== item?.advertiser_uuid) {
      return advItem;
    }

    const advChildren = [...advItem.children].map(cpItem => {
      if (cpItem?.uuid !== item?.campaign_uuid) {
        return cpItem;
      }

      return {
        ...cpItem,
        children: [...cpItem.children, item]
      };
    });

    return {
      ...advItem,
      children: advChildren
    };
  });

  return updatedTree;
};
