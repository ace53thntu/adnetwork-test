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
import InventoryBidForm from '../bid.form';
import {useEditBid, useGetBid} from 'queries/bid';
import {mappingApiToBidForm, mappingFormToApi} from '../dto';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {GET_INVENTORY_BID} from 'queries/inventory/constants';
import {useQueryClient} from 'react-query';
import {QueryStatuses} from 'constants/react-query';

const propTypes = {
  toggle: PropTypes.func,
  modal: PropTypes.bool,
  bidId: PropTypes.string.isRequired,
  inventoryId: PropTypes.string.isRequired
};

export default function BidFormModal({
  toggle = () => null,
  modal = false,
  bidId = '',
  inventoryId = ''
}) {
  const {data, status, isFetching} = useGetBid(bidId, !!bidId);
  const defaultValues = mappingApiToBidForm(data);

  if (status === QueryStatuses.LOADING || isFetching) {
    return <FormLoading isLoading={isFetching} />;
  }

  return (
    <ModalContent
      defaultValues={defaultValues}
      toggle={toggle}
      inventoryId={inventoryId}
    />
  );
}

const ModalContent = ({defaultValues, toggle, inventoryId}) => {
  const {t} = useTranslation();
  const client = useQueryClient();
  const {mutateAsync: editBid} = useEditBid();
  const methods = useForm({
    defaultValues
  });
  const {formState, handleSubmit} = methods;

  async function onSubmit(formData) {
    const submitData = mappingFormToApi({
      formData,
      isDeal: false,
      inventoryId
    });

    try {
      await editBid({
        data: submitData,
        bidId: defaultValues?.uuid
      });
      await client.invalidateQueries([GET_INVENTORY_BID, inventoryId]);
      ShowToast.success('Edit bid successfully');
      toggle();
    } catch (error) {
      ShowToast.error(error?.msg || 'Fail to bid inventory');
    }
  }

  return (
    <Card className="mb-2">
      <CardHeader className="justify-content-start">Edit bid</CardHeader>
      <CardBody>
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <FormProvider {...methods}>
            <Form
              id="bidForm"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <InventoryBidForm />
              <hr />
              <div className="mt-2 d-flex justify-content-end">
                <Button color="link" className="mr-2" onClick={toggle}>
                  {t('cancel')}
                </Button>
                <Button type="submit" form="bidForm" color="primary">
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

BidFormModal.propTypes = propTypes;
