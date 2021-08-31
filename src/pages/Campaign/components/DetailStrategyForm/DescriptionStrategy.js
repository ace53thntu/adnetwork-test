//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Button, Container, Form} from 'reactstrap';
import {useParams} from 'react-router';

//---> Internal Modules
// import {useCreateStrategy, useEditStrategy} from 'core/queries/campaigns';
import InformationGroup from './InformationGroup';
import StatusGroup from './StatusGroup';
import AdsGroup from './AdsGroup';
import CostGroup from './CostGroup';
import KeywordGroup from './KeywordGroup';
import BillingStatusGroup from './BillingStatusGroup';
import EngineConfigurationGroup from './EngineGroup';
import BudgetGroup from './BudgetGroup';
import EngineConfigurationFirstPriceGroup from './EngineConfFirstPriceGroup';
import DomainGroup from './DomainGroup';
import DomainPlacementWlGroup from './DomainPlacementWlGroup';
import DomainPlacementBlackListGroup from './DomainPlacementBl';
import {useNavigate} from 'react-router-dom';
import {strategyFormValidation} from './strategy.validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import '../DetailCampaignForm/_main.scss';
import {validArray} from 'utils/helpers/dataStructure.helpers';

const DescriptionStrategy = ({
  goTo,
  isEdit,
  campaignId,
  setListErrors,
  gotoCampaignManagement,
  viewOnly,
  currentStrategy = null,
  listCampaignOptions,
  isSummary = false
}) => {
  const {t} = useTranslation();
  const {id: strategyId} = useParams();
  // const {mutateAsync: createStrategy} = useCreateStrategy();
  const createStrategy = useCallback(() => {
    return new Promise(resolve => {
      resolve('ok');
    });
  }, []);
  // const {mutateAsync: editStrategy} = useEditStrategy();
  const editStrategy = useCallback(() => {
    return new Promise(resolve => {
      resolve('ok');
    });
  }, []);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      ...currentStrategy
    },
    resolver: strategyFormValidation(isEdit)
  });

  const {handleSubmit} = methods;

  const getIdsOfListValue = (list = []) => {
    if (validArray({list})) {
      return list?.map(item => item.id || item.value);
    }

    return [];
  };

  const onSubmit = useCallback(
    async values => {
      console.log(
        '🚀 ~ file: DescriptionStrategy.js ~ line 117 ~ values',
        values
      );
      console.log('------', values?.engine_configuration?.bidding_method);
      // const data = await deleteStrategy(2);
      const req = {
        family_ids: values.family_ids
          ? getIdsOfListValue(values.family_ids)
          : [],
        campaign_id: values?.campaign_id?.value || null,
        name: values.name,
        active: values.active === 'active' ? true : false,
        week_parts_gmt: values.week_parts_gmt === 'active' ? true : false,
        only_unskippable: values.only_unskippable === 'active' ? true : false,
        only_skippable: values.only_skippable === 'active' ? true : false,
        skip_delay: parseInt(values.skip_delay) ?? 0,

        //---> Accepted fields.
        accepted_layouts: values.accepted_layouts
          ? getIdsOfListValue(values.accepted_layouts)
          : [],
        accepted_adunits: values.accepted_adunits
          ? getIdsOfListValue(values.accepted_adunits)
          : [],
        accepted_contexts: values.accepted_contexts
          ? getIdsOfListValue(values.accepted_contexts)
          : [],
        accepted_sub_contexts: values.accepted_sub_contexts
          ? getIdsOfListValue(values.accepted_sub_contexts)
          : [],
        accepted_placements: values.accepted_placements
          ? getIdsOfListValue(values.accepted_placements)
          : [],

        view_rate_prediction: parseInt(values.view_rate_prediction || 0),

        //---> Engine fields
        engine: values.engine ? values.engine.value : '',
        engine_configuration: {
          max: parseInt(values.engine_configuration.max, 10) ?? 0,
          num_impressions:
            parseInt(values.engine_configuration.num_impressions, 10) ?? 0,
          target: parseFloat(values.engine_configuration.target) ?? 0,
          cpx_min: parseFloat(values.engine_configuration.cpx_min) ?? 0,
          cpx_max: parseFloat(values.engine_configuration.cpx_max) ?? 0,
          value: parseFloat(values.engine_configuration.value) ?? 0,
          threshold: parseFloat(values.engine_configuration.threshold) ?? 0,
          discovery_bid_price:
            parseFloat(values.engine_configuration.discovery_bid_price) ?? 0,
          kpi: values?.engine_configuration?.kpi?.value,
          bidding_method: values?.engine_configuration?.bidding_method?.value
        },
        engine_first_price: values.engine_first_price
          ? values.engine_first_price.value
          : '',
        engine_configuration_first_price: {
          max: parseInt(values.engine_configuration_first_price.max, 10) ?? 0,
          num_impressions:
            parseInt(
              values.engine_configuration_first_price.num_impressions,
              10
            ) ?? 0,
          target:
            parseFloat(values.engine_configuration_first_price.target) ?? 0,
          cpx_min:
            parseFloat(values.engine_configuration_first_price.cpx_min) ?? 0,
          cpx_max:
            parseFloat(values.engine_configuration_first_price.cpx_max) ?? 0,
          value: parseFloat(values.engine_configuration_first_price.value) ?? 0,
          threshold:
            parseFloat(values.engine_configuration_first_price.threshold) ?? 0,
          discovery_bid_price:
            parseFloat(
              values.engine_configuration_first_price.discovery_bid_price
            ) ?? 0,
          kpi: values?.engine_configuration_first_price?.kpi?.value,
          bidding_method:
            values?.engine_configuration_first_price?.bidding_method?.value
        },
        domain_white_list_ids: values.domain_white_list_ids
          ? getIdsOfListValue(values.domain_white_list_ids)
          : [],
        domain_black_list_ids: values.domain_black_list_ids
          ? getIdsOfListValue(values.domain_black_list_ids)
          : [],
        position_ids: values.position_ids
          ? getIdsOfListValue(values.position_ids)
          : [],
        ip_range_list_ids: values.ip_range_list_ids
          ? getIdsOfListValue(values.ip_range_list_ids)
          : [],
        network_ids: values.network_ids
          ? getIdsOfListValue(values.network_ids)
          : [],
        deal_ids: values.deal_ids ? getIdsOfListValue(values.deal_ids) : [],
        cpi: parseInt(values.cpi) ?? 0,
        cpc: parseInt(values.cpc) ?? 0,
        cpcc: parseInt(values.cpcc) ?? 0,
        cpvc: parseInt(values.cpvc) ?? 0,
        cplpc: parseInt(values.cplpc) ?? 0,
        cplpv: parseInt(values.cplpv) ?? 0,
        compc: parseInt(values.compc) ?? 0,
        compv: parseInt(values.compv) ?? 0,
        media_cost: parseInt(values.media_cost) ?? 0,
        tracking_cost: parseInt(values.tracking_cost) ?? 0,
        use_campaign_billing:
          values.use_campaign_billing === 'active' ? true : false,
        keywords_white_list_ids: values.keywords_white_list_ids
          ? getIdsOfListValue(values.keywords_white_list_ids)
          : [],
        keywords_black_list_ids: values.keywords_black_list_ids
          ? getIdsOfListValue(values.keywords_black_list_ids)
          : [],
        ubiquity_exists: values.ubiquity_exists === 'active' ? true : false,
        budget: {
          global: parseInt(values.budget.global, 10) ?? 0,
          daily: parseInt(values.budget.daily, 10) ?? 0,
          smooth: values.budget.smooth === 'active' ? true : false
        }
      };
      console.log('======== FORM DATA', req);
      if (isEdit) {
        try {
          await editStrategy({strategyId, data: req});
          ShowToast.success('Update success');
          goTo({nextTab: 'audience'});
        } catch (error) {
          console.log(
            '🚀 ~ file: DescriptionStrategy.js ~ line 158 ~ error',
            error
          );
          ShowToast.error(error?.msg);
        }
      } else {
        try {
          const {data} = await createStrategy(req);

          const strategyId = data?.data?.id;
          ShowToast.success('Create success');
          // goTo({nextTab: 'audience'});
          navigate(
            `/campaigns/${campaignId}/strategy/${strategyId}/edit?next_tab=audience`
          );
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      }
    },
    [
      campaignId,
      createStrategy,
      editStrategy,
      goTo,
      isEdit,
      navigate,
      strategyId
    ]
  );

  return (
    <div>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Container fluid>
            {/* Information Group */}
            <InformationGroup
              listCampaignOptions={listCampaignOptions}
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
              isEdit={isEdit}
            />
            {/* Status Group */}
            <StatusGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Engine Configuration */}
            <EngineConfigurationGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Engine Configuration  First Price */}
            <EngineConfigurationFirstPriceGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Ads Group */}
            <AdsGroup viewOnly={viewOnly} currentStrategy={currentStrategy} />

            {/* Domain Group */}
            <DomainGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Domain placement white list Group */}
            <DomainPlacementWlGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Domain  placement black list Group */}
            <DomainPlacementBlackListGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Cost Group */}
            <CostGroup viewOnly={viewOnly} currentStrategy={currentStrategy} />

            {/* Keyword Group */}
            <KeywordGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Billing Status Group */}
            <BillingStatusGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />

            {/* Budget */}
            <BudgetGroup
              viewOnly={viewOnly}
              currentStrategy={currentStrategy}
            />
          </Container>
          {!viewOnly && !isSummary && (
            <div className="d-block text-right mr-15">
              <Button
                onClick={() => gotoCampaignManagement()}
                className="mb-2 mr-2 btn-icon"
                color="secondary"
              >
                <i className="pe-7s-refresh btn-icon-wrapper"> </i>
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                className="mb-2 mr-2 btn-icon"
                color="success"
              >
                <i className="pe-7s-upload btn-icon-wrapper"> </i>
                {t('saveAndNext')}
              </Button>
            </div>
          )}
        </Form>
      </FormProvider>
    </div>
  );
};

export default DescriptionStrategy;
