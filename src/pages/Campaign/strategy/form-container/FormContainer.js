//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {Form} from 'reactstrap';

//---> Internal Modules
import {RoutePaths} from 'constants/route-paths';
import {useCreateStrategy, useEditStrategy} from 'queries/strategy';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {strategySchema} from '../validation';
import {apiToForm, formToApi} from 'entities/Strategy';
import {useDispatch} from 'react-redux';
import {initStrategyInventoryListRedux} from 'store/reducers/campaign';
import {useRefreshAdvertiserTree} from 'pages/Campaign/hooks/useRefreshAdvertiserTree';
import ApiError from 'components/common/ApiError';
import {useQueryClient} from 'react-query';
import {GET_STRATEGY} from 'queries/strategy/constants';
import {useQueryString} from 'hooks';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

const propTypes = {
  goTo: PropTypes.func,
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any,
  isSummary: PropTypes.bool,
  isCapping: PropTypes.bool
};

const FormContainer = ({
  goTo = () => null,
  isEdit = false,
  isView = false,
  currentStrategy = null,
  isSummary = false,
  children,
  originalStrategy,
  isCapping = false,
  id
}) => {
  const query = useQueryString();
  const currentTab = query.get('next_tab');
  const client = useQueryClient();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {strategyId} = useParams();
  const {mutateAsync: createStrategy} = useCreateStrategy();
  const {mutateAsync: editStrategy} = useEditStrategy();
  const navigate = useNavigate();
  const {refresh} = useRefreshAdvertiserTree();

  const methods = useForm({
    defaultValues: {
      ...currentStrategy
    },
    resolver: strategySchema(isEdit, t, isCapping)
  });

  const {
    handleSubmit,
    reset,
    formState: {isDirty},
    watch
  } = methods;

  const strategyType = watch('strategy_type');
  const refStrategyType = React.useRef(null);

  //---> Reset inventory in strategy when strategy type changed
  React.useEffect(() => {
    if (strategyType?.value !== refStrategyType && !isEdit && !isView) {
      refStrategyType.current = strategyType?.value;
      dispatch(
        initStrategyInventoryListRedux({
          inventoryList: [],
          inventoryTempList: []
        })
      );
    }
  }, [dispatch, isEdit, isView, strategyType?.value]);

  const onSubmit = useCallback(
    async formData => {
      const req = formToApi({
        formData,
        isSummary,
        currentStrategy,
        isEdit,
        isCapping,
        originalStrategy,
        currentTab
      });

      if (isEdit) {
        if (!isDirty) {
          return;
        }

        try {
          const {data} = await editStrategy({straId: strategyId, data: req});

          await client.invalidateQueries([GET_STRATEGY, data?.uuid]);
          const defaultValueUpdated = apiToForm({strategyData: data});
          reset(defaultValueUpdated);
          ShowToast.success('Updated strategy successfully');
          const inventories = data?.inventories?.map((item, idx) => {
            const {
              name,
              container_name,
              position_name,
              position_uuid,
              floor_price
            } = item || {};

            let {cpm, cpc, cpa, cpd, cpl, cpe, cpv, cpi, cpvm} =
              data?.inventories_bid?.[item?.uuid] || {};
            // Price model
            cpm = HandleCurrencyFields.convertApiToGui({
              value: cpm
            });
            cpc = HandleCurrencyFields.convertApiToGui({
              value: cpc
            });
            cpa = HandleCurrencyFields.convertApiToGui({
              value: cpa
            });
            cpd = HandleCurrencyFields.convertApiToGui({
              value: cpd
            });
            cpl = HandleCurrencyFields.convertApiToGui({
              value: cpl
            });
            cpe = HandleCurrencyFields.convertApiToGui({
              value: cpe
            });
            cpv = HandleCurrencyFields.convertApiToGui({
              value: cpv
            });
            cpi = HandleCurrencyFields.convertApiToGui({
              value: cpi
            });
            cpvm = HandleCurrencyFields.convertApiToGui({
              value: cpvm
            });
            return {
              ...item,
              id: item?.uuid,
              name,
              container_name,
              position_name,
              position_uuid,
              floor_price,
              noStore: false,
              cpm,
              cpc,
              cpa,
              cpd,
              cpl,
              cpe,
              cpv,
              cpi,
              cpvm
            };
          });

          dispatch(
            initStrategyInventoryListRedux({
              inventoryList: inventories || [],
              inventoryTempList: inventories || []
            })
          );
        } catch (error) {
          if (error) {
            ShowToast.error(<ApiError apiError={error} />);
          } else {
            ShowToast.error('Fail to update strategy');
          }
        }
      } else {
        try {
          const {data} = await createStrategy(req);

          const strategyId = data?.uuid;
          await refresh(data?.advertiser_uuid, data?.campaign_uuid, data?.uuid);

          ShowToast.success('Created strategy successfully');
          navigate(
            `/${RoutePaths.CAMPAIGN}/${data?.campaign_uuid}/${RoutePaths.STRATEGY}/${strategyId}/edit?next_tab=concept&advertiser_id=${data?.advertiser_uuid}`
          );
        } catch (error) {
          ShowToast.error(<ApiError apiError={error} />);
        }
      }
    },
    [
      client,
      createStrategy,
      currentStrategy,
      currentTab,
      dispatch,
      editStrategy,
      isCapping,
      isDirty,
      isEdit,
      isSummary,
      navigate,
      originalStrategy,
      refresh,
      reset,
      strategyId
    ]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off" id={id}>
          {children}
        </Form>
      </FormProvider>
    </div>
  );
};

FormContainer.propTypes = propTypes;

export default FormContainer;
