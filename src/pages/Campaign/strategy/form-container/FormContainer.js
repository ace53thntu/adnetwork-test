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
  isConcept = false
}) => {
  const {t} = useTranslation();
  const {strategyId} = useParams();
  const {mutateAsync: createStrategy} = useCreateStrategy();
  const {mutateAsync: editStrategy} = useEditStrategy();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      ...currentStrategy
    },
    resolver: strategySchema(isEdit, t, isConcept)
  });

  const {handleSubmit, reset} = methods;

  const onSubmit = useCallback(
    async formData => {
      console.log('🚀 ~ file: FormContainer.js ~ line 55 ~ formData', formData);
      const req = formToApi({formData, isConcept, isSummary, currentStrategy});
      console.log('======== FORM DATA', req);
      if (isEdit) {
        try {
          const {data} = await editStrategy({straId: strategyId, data: req});
          const defaultValueUpdated = apiToForm({strategyData: data});
          reset(defaultValueUpdated);
          ShowToast.success('Updated strategy successfully');
          if (isConcept) {
            navigate(
              `/${RoutePaths.CAMPAIGN}/${data?.campaign_uuid?.value}/${RoutePaths.STRATEGY}/${strategyId}/edit?next_tab=summary&advertiser_id=${data?.advertiser_uuid}`
            );
          } else {
            navigate(
              `/${RoutePaths.CAMPAIGN}/${data?.campaign_uuid?.value}/${RoutePaths.STRATEGY}/${strategyId}/edit?next_tab=concept&advertiser_id=${data?.advertiser_uuid}`
            );
          }
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      } else {
        try {
          const {data} = await createStrategy(req);

          const strategyId = data?.uuid;
          ShowToast.success('Created strategy successfully');
          navigate(
            `/${RoutePaths.CAMPAIGN}/${data?.campaign_uuid?.value}/${RoutePaths.STRATEGY}/${strategyId}/edit?next_tab=concept&advertiser_id=${data?.advertiser_uuid}`
          );
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      }
    },
    [
      createStrategy,
      currentStrategy,
      editStrategy,
      isConcept,
      isEdit,
      isSummary,
      navigate,
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
