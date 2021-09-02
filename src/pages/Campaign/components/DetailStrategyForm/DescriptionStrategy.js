//---> Build-in Modules
import React, {useCallback} from 'react';

//---> External Modules
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Button, Container, Form} from 'reactstrap';
import {useParams} from 'react-router';

//---> Internal Modules
import InformationGroup from './InformationGroup';
import StatusGroup from './StatusGroup';
import {useNavigate} from 'react-router-dom';
// import {strategyFormValidation} from './strategy.validation';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import '../DetailCampaignForm/_main.scss';
import AdsGroup from './AdsGroup';
import {useCreateStrategy, useEditStrategy} from 'queries/strategy';
import {destructureFormData} from './dto';

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
  console.log(
    '🚀 ~ file: DescriptionStrategy.js ~ line 32 ~ currentStrategy',
    currentStrategy
  );
  const {t} = useTranslation();
  const {id: strategyId} = useParams();
  const {mutateAsync: createStrategy} = useCreateStrategy();
  const {mutateAsync: editStrategy} = useEditStrategy();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      ...currentStrategy
    }
  });

  const {handleSubmit} = methods;

  const onSubmit = useCallback(
    async formData => {
      console.log(
        '🚀 ~ file: DescriptionStrategy.js ~ line 117 ~ formData',
        formData
      );
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

            {/* Ads Group */}
            <AdsGroup viewOnly={viewOnly} currentStrategy={currentStrategy} />
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
