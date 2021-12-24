//---> External Modules
import PropTypes from 'prop-types';
//---> Internal Modules
import {useCreateStrategy, useEditStrategy} from 'queries/strategy';
//---> Build-in Modules
import React, {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'reactstrap';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {destructureFormData} from './dto';
import AdsGroup from './form-fields/AdsGroup';
import InformationGroup from './form-fields/InformationGroup';
import InventoryGroup from './form-fields/InventoryGroup';
import StatusGroup from './form-fields/StatusGroup';
import {strategySchema} from './validation';

const propTypes = {
  goTo: PropTypes.func,
  isEdit: PropTypes.bool,
  campaignId: PropTypes.string,
  gotoCampaignManagement: PropTypes.func,
  isView: PropTypes.bool,
  currentStrategy: PropTypes.any,
  isSummary: PropTypes.bool,
  positions: PropTypes.array
};

const StrategyForm = ({
  goTo,
  isEdit,
  campaignId,
  gotoCampaignManagement,
  isView,
  currentStrategy = null,
  isSummary = false,
  positions = []
}) => {
  const {t} = useTranslation();
  const {id: strategyId} = useParams();
  const {mutateAsync: createStrategy} = useCreateStrategy();
  const {mutateAsync: editStrategy} = useEditStrategy();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      ...currentStrategy
    },
    resolver: strategySchema(isEdit, t)
  });

  const {handleSubmit} = methods;

  const onSubmit = useCallback(
    async formData => {
      const req = destructureFormData({formData});
      console.log('======== FORM DATA', req);
      if (isEdit) {
        try {
          await editStrategy({straId: strategyId, data: req});
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

          const strategyId = data?.uuid;
          ShowToast.success('Create success');
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
          {/* Information Group */}
          <InformationGroup
            isView={isView}
            currentStrategy={currentStrategy}
            isEdit={isEdit}
            positions={positions}
          />
          {/* Status Group */}
          <StatusGroup viewOnly={isView} currentStrategy={currentStrategy} />

          {/* Ads Group */}
          <AdsGroup viewOnly={isView} currentStrategy={currentStrategy} />

          {/* Inventory Group */}
          {isEdit && <InventoryGroup />}

          {!isView && !isSummary && (
            <div className="d-block text-right mr-15">
              <Button
                onClick={() => gotoCampaignManagement?.()}
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
                <i className="pe-7s-upload btn-icon-wrapper"></i>
                {t('saveAndNext')}
              </Button>
            </div>
          )}
        </Form>
      </FormProvider>
    </div>
  );
};

StrategyForm.propTypes = propTypes;

export default StrategyForm;
