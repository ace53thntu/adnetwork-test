//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import {FormProvider, useForm} from 'react-hook-form';
import {Form, Card, CardBody, CardHeader, Button} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import FormLoading from 'components/forms/FormLoading';
import {mappingApiToDealForm, mappingFormToApi} from '../dto';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {GET_INVENTORY_DEAL} from 'queries/inventory/constants';
import {useQueryClient} from 'react-query';
import {QueryStatuses} from 'constants/react-query';
import {schemaValidate} from '../validation';
import DealForm from '../deal.form';
import {useEditDeal, useGetDeal} from 'queries/deal';
import { ApiError } from 'components/common';

const propTypes = {
  toggle: PropTypes.func,
  modal: PropTypes.bool,
  dealId: PropTypes.string.isRequired,
  inventoryId: PropTypes.string.isRequired,
  excludeDates: PropTypes.array
};

export default function DealFormModal({
  toggle = () => null,
  modal = false,
  dealId = '',
  inventoryId = '',
  excludeDates = []
}) {
  const {data, status, isFetching} = useGetDeal({dealId, enabled: !!dealId});
  const defaultValues = mappingApiToDealForm(data);

  if (status === QueryStatuses.LOADING || isFetching) {
    return <FormLoading isLoading={isFetching} />;
  }

  return (
    <ModalContent
      defaultValues={defaultValues}
      toggle={toggle}
      inventoryId={inventoryId}
      excludeDates={excludeDates}
    />
  );
}

const ModalContent = ({
  defaultValues,
  toggle,
  inventoryId,
  excludeDates = []
}) => {
  const {t} = useTranslation();
  const client = useQueryClient();
  const {mutateAsync: editDeal} = useEditDeal();
  const isBid = false;
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t, isBid)
  });
  const {formState, handleSubmit} = methods;

  async function onSubmit(formData) {
    const submitData = mappingFormToApi({
      formData,
      isDeal: true,
      inventoryId
    });

    try {
      await editDeal({
        data: submitData,
        dealId: defaultValues?.uuid
      });
      await client.invalidateQueries([GET_INVENTORY_DEAL, inventoryId]);
      ShowToast.success('Edit deal successfully');
      toggle();
    } catch (error) {
      if (error) {
        ShowToast.error(<ApiError apiError={error}/>);
      } else {
        ShowToast.info('There are no changes');
      }
    }
  }

  return (
    <Card className="mb-2">
      <CardHeader className="justify-content-start">Edit deal</CardHeader>
      <CardBody>
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <FormProvider {...methods}>
            <Form
              id="dealForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <DealForm excludeDates={excludeDates} />
              <hr />
              <div className="mt-2 d-flex justify-content-end">
                <Button color="link" className="mr-2" onClick={toggle}>
                  {t('cancel')}
                </Button>
                <Button type="submit" form="dealForm" color="primary">
                  {t('save')}
                </Button>
              </div>
            </Form>
          </FormProvider>
        </BlockUi>
      </CardBody>
    </Card>
  );
};

DealFormModal.propTypes = propTypes;
