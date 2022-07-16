import {useQueryString} from 'hooks';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import __merge from 'lodash/merge';
import __isArray from 'lodash/isArray';
import {useCreateStrategy} from 'queries/strategy';
import moment from 'moment';
import {getContextFilter, getVideoFilter} from 'entities/Strategy';
import {StrategyTypes} from '../constants';
import {convertGuiToApi} from 'utils/handleCurrencyFields';
import {getListByType} from '../components/capping/dto';
import {BudgetTimeFrames, CappingTypes} from 'constants/misc';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {ApiError} from 'components/common';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {useCreateCapping} from 'queries/capping';

export function useSaveAsStrategy(currentStrategy, originalStrategy) {
  const query = useQueryString();
  const currentTab = query.get('next_tab');
  const {getValues, trigger} = useFormContext();
  const {mutateAsync: createStrategy} = useCreateStrategy();
  const {mutateAsync: createCapping} = useCreateCapping();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onHandleSaveAs = React.useCallback(async () => {
    const result = await trigger();

    if (!result) {
      return;
    }

    const formValues = getValues();
    let mergedData = __merge(currentStrategy, formValues);

    if (mergedData?.name === originalStrategy?.name) {
      mergedData = {
        ...mergedData,
        name: `${mergedData.name}-${+new Date()}`
      };
    }

    const {bodyRequest, cappings} = formToApi({
      formData: mergedData,
      currentStrategy,
      originalStrategy,
      currentTab
    });

    setIsSubmitting(true);
    try {
      const {data} = await createStrategy(bodyRequest);

      if (cappings.length) {
        let promises = [];
        promises = [...cappings].map(cap =>
          createCapping({
            ...cap,
            reference_uuid: data.uuid
          })
        );

        await Promise.all(promises);
      }

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
    createCapping,
    createStrategy,
    currentStrategy,
    currentTab,
    getValues,
    navigate,
    originalStrategy,
    trigger
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
    location_uuids,
    category,
    priority,
    cpm_max,
    video_filter,
    context_filter,
    pricing_model,
    concept_uuids,
    audience_uuids
  } = formData;

  const positionIds = position_uuids?.map(item => item?.value) || [];
  const startDate = dateTimeIsSameOrBeforeToday(start_time)
    ? null
    : moment(start_time).toISOString();
  // nếu end date trước hoặc bằng hiện tại \ start date thì cộng thêm 7 ngày.
  const endDate = dateIsSameOrBeforeADate(end_time, startDate || moment())
    ? moment().add(7, 'day').endOf('day').toISOString()
    : moment(end_time).endOf('day').toISOString();

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
    concept_uuids: concept_uuids?.filter(item => item) || [],
    audience_uuids: []
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

  let returnCappings = [];

  if (originalStrategy?.cappings?.length) {
    // get budget capping
    const cappingBudgets = getListByType({
      cappings: originalStrategy.cappings,
      type: CappingTypes.BUDGET.value
    });

    // get impression capping
    const cappingImpressions = getListByType({
      cappings: originalStrategy.cappings,
      type: CappingTypes.IMPRESSION.value
    });

    // get schedule capping
    const cappingSchedules = getListByType({
      cappings: originalStrategy.cappings,
      type: CappingTypes.SCHEDULE.value
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

    if (cappingSchedules?.length) {
      const {
        week_days,
        start_hour,
        start_minute,
        end_hour,
        end_minute,
        time_zone
      } = cappingSchedules[0];

      strategyReturn.schedule = {
        week_days,
        start_hour,
        start_minute,
        end_hour,
        end_minute,
        time_zone
      };
    }

    const cappingUserClick = originalStrategy.cappings.filter(cap =>
      [
        CappingTypes.USER.value,
        CappingTypes.USER_CLICK.value,
        CappingTypes.USER_VIEWABLE.value,
        CappingTypes.VIEWABLE.value,
        CappingTypes.CLICK.value,
        CappingTypes.DOMAIN.value,
        CappingTypes.KEYWORD.value
      ].includes(cap.type)
    );

    if (cappingUserClick.length) {
      cappingUserClick.forEach(cap => {
        let obj = {};
        if (cap.type === CappingTypes.USER.value && !cap.custom) {
          obj[CappingTypes.USER.api_key] = getDailyAndGlobal(cap);
        }
        if (cap.type === CappingTypes.USER.value && cap.custom) {
          obj = {
            custom: true,
            time_frame: cap.time_frame,
            target: cap.target
          };
        }
        if (cap.type === CappingTypes.USER_CLICK.value) {
          obj[CappingTypes.USER_CLICK.api_key] = getDailyAndGlobal(cap);
        }
        if (cap.type === CappingTypes.USER_VIEWABLE.value) {
          obj[CappingTypes.USER_VIEWABLE.api_key] = getDailyAndGlobal(cap);
        }
        if (cap.type === CappingTypes.VIEWABLE.value) {
          obj[CappingTypes.VIEWABLE.api_key] = getDailyAndGlobal(cap);
        }
        if (cap.type === CappingTypes.CLICK.value) {
          obj[CappingTypes.CLICK.api_key] = getDailyAndGlobal(cap);
        }
        if (cap.type === CappingTypes.DOMAIN.value) {
          obj.domain_group_white_list_uuid = cap.domain_group_white_list_uuid;
          obj.domain_group_black_list_uuid = cap.domain_group_black_list_uuid;
        }
        if (cap.type === CappingTypes.KEYWORD.value) {
          obj.keywords_list_white_uuid = cap.keywords_list_white_uuid;
          obj.keywords_list_black_uuid = cap.keywords_list_black_uuid;
        }

        returnCappings.push({
          reference_type: 'strategy', //only for strategy
          type: cap.type,
          status: 'active',
          ...obj
        });
      });
    }
  }

  const inventoriesBid = formData?.inventories_bid ?? [];

  strategyReturn.inventories_bid = inventoriesBid.map(
    ({id, ts, uuid, ...rest}) => {
      let other = {};

      Object.keys(rest).forEach(key => {
        const numbered = Number(rest[key]);
        const isCappingTab = currentTab === 'capping';
        if (!isNaN(numbered)) {
          other[key] = isCappingTab
            ? parseInt(parseFloat(numbered), 10)
            : parseInt(parseFloat(numbered) * 1000, 10);
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

  if (audience_uuids?.length && __isArray(audience_uuids)) {
    strategyReturn.audience_uuids = audience_uuids;
  }

  return {
    bodyRequest: strategyReturn,
    cappings: returnCappings
  };
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

function getDailyAndGlobal(capping) {
  if (capping?.time_frame > 0) {
    return {
      daily: capping.target,
      global: null
    };
  }

  return {
    daily: null,
    global: capping.target
  };
}

function dateTimeIsSameOrBeforeToday(date) {
  return (
    moment(date).isSame(moment(), 'day') ||
    moment(date).isBefore(moment(), 'day')
  );
}

function dateIsSameOrBeforeADate(currentDate, compareDate) {
  return (
    moment(currentDate).isSame(moment(compareDate), 'day') ||
    moment(currentDate).isBefore(moment(compareDate), 'day')
  );
}
