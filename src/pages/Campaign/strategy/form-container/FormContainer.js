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
import {formToApi} from 'entities/Strategy';

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

  const {handleSubmit, errors} = methods;
  console.log('🚀 ~ file: FormContainer.js ~ line 49 ~ errors', errors);

  const onSubmit = useCallback(
    async formData => {
      const req = formToApi({formData, isConcept});
      console.log('======== FORM DATA', req);
      if (isEdit) {
        try {
          await editStrategy({straId: strategyId, data: req});
          ShowToast.success('Update success');
          goTo({nextTab: 'concept'});
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      } else {
        try {
          const {data} = await createStrategy(req);

          const strategyId = data?.uuid;
          ShowToast.success('Create success');
          navigate(
            `/${RoutePaths.CAMPAIGN}/${formData?.campaign_uuid?.value}/${RoutePaths.STRATEGY}/${strategyId}/edit?next_tab=concept&advertiser_id=${data?.advertiser_uuid}`
          );
        } catch (error) {
          ShowToast.error(error?.msg);
        }
      }
    },
    [
      createStrategy,
      editStrategy,
      goTo,
      isConcept,
      isEdit,
      navigate,
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
