//---> Build-in Modules
import React, {useCallback, useEffect, useState} from 'react';

//---> External Modules
import {useForm, FormProvider} from 'react-hook-form';
import {ModalHeader, ModalBody} from 'reactstrap';

//---> Internal Modules
import {getInventoryFormats, getInventoryTypes} from '../../constants';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useEditInventory, useGetInventory} from 'queries/inventory';
import {useDefaultInventory} from 'pages/Container/hooks/useDefaultInventory';
import {mappingInventoryFormToApi, mappingTrackerFormToApi} from './dto';
import InventoryFormContent from './InventoryFormContent';
import {validationInventory} from './validation';
import {useCreateTracker, useEditTracker} from 'queries/tracker';
import {useTranslation} from 'react-i18next';

export default function UpdateInventory({
  toggle = () => {},
  inventoryId = null,
  pageId,
  isOpen = false
}) {
  const {data: inventory, isFetching} = useGetInventory(inventoryId);

  if (isFetching) {
    return (
      <>
        <ModalHeader>Inventory Information</ModalHeader>
        <ModalBody>
          <div>Loading...</div>
        </ModalBody>
      </>
    );
  }

  return <FormUpdate toggle={toggle} inventory={inventory} pageId={pageId} />;
}

function FormUpdate({toggle, inventory, pageId}) {
  const {t} = useTranslation();
  const inventoryTypes = getInventoryTypes();
  const inventoryFormats = getInventoryFormats();
  const defaultValues = useDefaultInventory({
    inventory
  });
  const methods = useForm({
    defaultValues,
    resolver: validationInventory(t),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const {handleSubmit, reset} = methods;
  const {mutateAsync: editInventory} = useEditInventory();
  const {mutateAsync: editTracker} = useEditTracker();
  const {mutateAsync: createTracker} = useCreateTracker();

  // local states
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onHandleSubmit = useCallback(
    async formData => {
      const requestBody = mappingInventoryFormToApi({pageId, formData});
      setIsLoading(true);
      try {
        await editInventory({
          inventoryId: defaultValues?.uuid,
          data: requestBody
        });
        console.log('formData?.tracker', formData?.tracker);
        if (formData?.tracker?.template_uuid) {
          const trackerForm = mappingTrackerFormToApi({
            tracker: formData?.tracker,
            inventoryId: inventory?.uuid
          });
          if (inventory?.tracker?.[0]?.uuid) {
            console.log('UPdate tracker');
            await editTracker({
              trackerId: inventory?.tracker?.[0]?.uuid,
              data: trackerForm
            });
          } else {
            console.log('Create tracker');

            await createTracker(trackerForm);
          }
        }
        ShowToast.success('Update Inventory successfully!', {
          closeOnClick: true
        });
        setIsLoading(false);

        toggle();
      } catch (err) {
        setIsLoading(false);
        ShowToast.error(err?.msg || 'Fail to update inventory', {
          closeOnClick: true
        });
      }
    },
    [
      createTracker,
      defaultValues?.uuid,
      editInventory,
      editTracker,
      inventory?.tracker,
      inventory?.uuid,
      pageId,
      toggle
    ]
  );

  const formProps = React.useMemo(
    () => ({
      isLoading,
      inventory,
      typeOptions: inventoryTypes,
      inventoryFormatOptions: inventoryFormats,
      toggle
    }),
    [inventory, inventoryFormats, inventoryTypes, isLoading, toggle]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          name="create-inventory"
          key="create-inventory"
          autoComplete="off"
        >
          <InventoryFormContent {...formProps} />
        </form>
      </FormProvider>
    </>
  );
}
