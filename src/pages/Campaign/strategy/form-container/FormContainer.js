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
import {apiToForm, formToApi, isConceptsChanged} from 'entities/Strategy';
import {useDispatch} from 'react-redux';
import {initStrategyInventoryListRedux} from 'store/reducers/campaign';
import {useRefreshAdvertiserTree} from 'pages/Campaign/hooks/useRefreshAdvertiserTree';
import ApiError from 'components/common/ApiError';
import {useQueryClient} from 'react-query';
import {GET_STRATEGY} from 'queries/strategy/constants';

const propTypes = {
  goTo: PropTypes.func,
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any,
  isSummary: PropTypes.bool,
  isConcept: PropTypes.bool
};

const FormContainer = ({
  goTo = () => null,
  isEdit = false,
  isView = false,
  currentStrategy = null,
  isSummary = false,
  children,
  isConcept = false,
  originalStrategy
}) => {
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
    resolver: strategySchema(
      isEdit,
      t,
      isConcept,
      currentStrategy?.video_filter
    )
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

  const redirectPageAfterSave = useCallback(
    ({
      _strategyId,
      _campaignId,
      _advertiserId,
      _isConcept = false,
      _isSummary = false
    }) => {
      if (_isConcept) {
        navigate(
          `/${RoutePaths.CAMPAIGN}/${_campaignId}/${RoutePaths.STRATEGY}/${_strategyId}/${RoutePaths.EDIT}?next_tab=summary&advertiser_id=${_advertiserId}`
        );
        return;
      }

      if (_isSummary) {
        navigate(
          `/${RoutePaths.CAMPAIGN}/${_campaignId}/${RoutePaths.STRATEGY}/${_strategyId}?next_tab=description&advertiser_id=${_advertiserId}`
        );
        return;
      }

      navigate(
        `/${RoutePaths.CAMPAIGN}/${_campaignId}/${RoutePaths.STRATEGY}/${_strategyId}/edit?next_tab=concept&advertiser_id=${_advertiserId}`
      );
    },
    [navigate]
  );

  const onSubmit = useCallback(
    async formData => {
      console.log('🚀 ~ file: FormContainer.js ~ line 55 ~ formData', formData);
      const req = formToApi({
        formData,
        isConcept,
        isSummary,
        currentStrategy,
        isEdit,
        originalStrategy
      });
      console.log('======== FORM DATA', req);

      if (isEdit) {
        if (!isDirty) {
          redirectPageAfterSave({
            _strategyId: currentStrategy?.uuid,
            _campaignId: currentStrategy?.campaign_uuid?.value,
            _advertiserId: currentStrategy?.advertiser_uuid,
            _isConcept: isConcept,
            _isSummary: isSummary
          });
          return;
        }

        //---> Check concepts is changed
        const conceptUuids = formData.concept_uuids?.filter(cont => cont) || [];
        if (
          isConcept &&
          !isConceptsChanged({
            newConcepts: conceptUuids,
            oldConcepts: currentStrategy.concept_uuids
          })
        ) {
          redirectPageAfterSave({
            _strategyId: currentStrategy?.uuid,
            _campaignId: currentStrategy?.campaign_uuid?.value,
            _advertiserId: currentStrategy?.advertiser_uuid,
            _isConcept: isConcept,
            _isSummary: isSummary
          });
          return;
        }

        try {
          const {data} = await editStrategy({straId: strategyId, data: req});

          await client.invalidateQueries([GET_STRATEGY, data?.uuid]);
          const defaultValueUpdated = apiToForm({strategyData: data});
          reset(defaultValueUpdated);
          ShowToast.success('Updated strategy successfully');
          dispatch(
            initStrategyInventoryListRedux({
              inventoryList: data?.inventories || [],
              inventoryTempList: data?.inventories || []
            })
          );

          redirectPageAfterSave({
            _strategyId: currentStrategy?.uuid,
            _campaignId: currentStrategy?.campaign_uuid?.value,
            _advertiserId: currentStrategy?.advertiser_uuid,
            _isConcept: isConcept,
            _isSummary: isSummary
          });
        } catch (error) {
          ShowToast.error(<ApiError apiError={error} />);
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
      dispatch,
      editStrategy,
      isConcept,
      isDirty,
      isEdit,
      isSummary,
      navigate,
      originalStrategy,
      redirectPageAfterSave,
      refresh,
      reset,
      strategyId
    ]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {children}
        </Form>
      </FormProvider>
    </div>
  );
};

FormContainer.propTypes = propTypes;

export default FormContainer;
